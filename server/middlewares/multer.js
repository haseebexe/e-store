import multer from 'multer'

const storage = multer.memoryStorage();

const uploadFiles = multer({ storage }).array('files', 20);

export default uploadFiles;