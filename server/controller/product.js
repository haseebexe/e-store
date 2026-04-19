import { Product } from "../models/Product.js";
import bufferGenerator from "../utils/bufferGenerator.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from "cloudinary";


export const createProduct = TryCatch(async(req, res) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'You are not admin'})
    

    const { title, description,  price, category, stock } =  req.body;

    const files = req.files;

    if (!files || files.length === 0)  return res.status(400).json({ message: "No files to upload" })
    

    const imageUploadPromises = files.map( async(file) => {
        const fileBuffer = bufferGenerator(file);

        const result = await cloudinary.v2.uploader.upload(fileBuffer.content)

        return {
            id: result.public_id,
            url: result.secure_url,
        }
    })

    const uploadedImage =  await Promise.all(imageUploadPromises)

    const product = await Product.create({
        title,
        description,
        price,
        category,
        images: uploadedImage,
        stock,
    })

    res.status(201).json({ message: "Product created successfully", product })


})