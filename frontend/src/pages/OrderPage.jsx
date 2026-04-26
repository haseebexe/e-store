import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/context/UserContext";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUserData();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${server}/api/order/${id}`, {
          headers: {
            token: Cookies.get("token"),
          },
        });
        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-500 mb-4">
          Order not found
        </h1>
        <Button onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4">

    { user._id === order.user._id || user.role === "admin" ? <>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              Order #{order._id.slice(-6).toUpperCase()}
            </h1>
           <span className="text-xs text-gray-400">
  Placed at:{" "}
  {new Date(order.createdAt).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}{" "}
  at{" "}
  {new Date(order.createdAt).toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
  })}
</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* STATUS */}
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {order.status}
            </span>

            {/* PAYMENT */}
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                order.method === "cod"
                  ? "bg-gray-200 text-gray-700"
                  : "bg-purple-100 text-purple-600"
              }`}
            >
              {order.method === "cod"
                ? "Cash on Delivery"
                : "Online Payment"}
            </span>

            <Button size="sm" onClick={() => window.print()}>
              Print
            </Button>
          </div>
        </div>

        {/* SUMMARY + SHIPPING */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* SUMMARY */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-3">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            <p>
              <strong>Total Items:</strong> {order.items.length}
            </p>

            <p>
              <strong>Subtotal:</strong> Rs{" "}
              {order.subTotal.toLocaleString()}
            </p>

            <p>
              <strong>Paid At:</strong>{" "}
              {order.paidAt
                ? new Date(order.paidAt).toLocaleString()
                : "Cash on Delivery"}
            </p>
          </div>

          {/* SHIPPING */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-3">
            <h2 className="text-lg font-semibold">Shipping Details</h2>

            <p>
              <strong>Phone:</strong> {order.phone}
            </p>

            <p>
              <strong>Address:</strong> {order.address}
            </p>

            <p>
              <strong>Email:</strong> {order.user?.email}
            </p>
          </div>
        </div>

     <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow">
  <h2 className="text-lg font-semibold mb-5">Order Items</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {order.items.map((item, i) => (
      <div
        key={i}
        className="border rounded-xl p-3 bg-gray-50 dark:bg-gray-800 hover:shadow-md transition"
      >
        {/* IMAGE */}
        <img
          src={item.product.images[0]?.url}
          alt={item.product.title}
          className="w-full h-28 object-cover rounded-lg mb-3"
        />

        {/* TITLE */}
        <h3 className="text-sm font-medium line-clamp-2">
          {item.product.title}
        </h3>

        {/* CATEGORY */}
        <p className="text-xs text-gray-500">
          {item.product.category}
        </p>

        {/* QUANTITY */}
        <p className="text-xs mt-1">
          Qty: {item.quantity}
        </p>

        {/* PRICE */}
        <p className="text-sm font-semibold mt-2">
          Rs{" "}
          {(item.product.price * item.quantity).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
</div>

      </div>
    </> : <>
      <p>You are not authorized to view this order.</p>
    </> }

    </div>
  );
};

export default OrderPage;