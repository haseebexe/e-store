import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, subTotal, loading, addToCart, updateCart, deleteCart } =  useCart();


   const updateCartHandler = async  (action, id) => {
    await updateCart(action, id);
  }
  const handleDeleteCart = async (id) => {
    await deleteCart(id);
  }

  return (
    <div>
      {cart.length === 0 ? (
        <>
          {" "}
          <p>
            Your cart is empty <ShoppingCart />
          </p>
          <div>
            {" "}
            <Button className="mt-6">Shop Now</Button>{" "}
          </div>
        </>
      ) : (
        cart.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center space-x-4">
              <Link to={`/product/${item.product._id}`}>
                <img
                  src={item.product.images[0].url}
                  alt={item.product.title}
                  className="w-16 h-16 object-cover"
                />
              </Link>
              <div>
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-lg font-bold">
                  Rs{" "}
                  {(item.product.price * item.quantity)
                    .toLocaleString("en-PK")}
                </p>
              </div>
              <Button onClick={() => updateCartHandler("dec", item._id)}>
                -
              </Button>
              <span>{item.quantity}</span>
              <Button onClick={() => updateCartHandler("inc", item._id)}>
                +
              </Button>
              <Button variant="ghost" onClick={() => handleDeleteCart(item._id)}>
                <TrashIcon />
               
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
