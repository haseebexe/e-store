import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${server}/api/order/all`, {
          headers: {
            token: Cookies.get("token"),
          },
        });

        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  if (loading) {
    return <Loading />;
  }

 if (orders.length === 0) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-10 text-center max-w-md w-full space-y-4">

        {/* Icon */}
        <div className="text-5xl">📦</div>

        <h1 className="text-2xl font-semibold">
          No Orders Yet
        </h1>

        <p className="text-gray-500 text-sm">
          Looks like you haven’t placed any orders yet.
          Start shopping to see your orders here.
        </p>

        <Button
          className="w-full mt-2"
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </Button>

      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-10 px-4">
  <div className="max-w-5xl mx-auto space-y-8">

    {/* HEADER */}
    <div className="text-center">
      <h1 className="text-3xl font-bold">Your Orders</h1>
      <p className="text-gray-500 text-sm">
        Manage and track your purchases
      </p>
    </div>

    {/* EMPTY STATE */}
    {orders.length === 0 ? (
      <div className="bg-white dark:bg-gray-900 p-10 rounded-xl shadow text-center">
        <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
        <p className="text-gray-500 mb-4">
          You haven’t placed any orders yet.
        </p>
        <Button onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      </div>
    ) : (
      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 hover:shadow-lg transition-all"
          >

            {/* TOP ROW */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

              <div>
                <h2 className="font-semibold text-lg">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">

                {/* STATUS */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {order.status}
                </span>

                {/* PAYMENT METHOD */}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    order.method === "cod"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {order.method === "cod" ? "Cash on Delivery" : "Online Payment"}
                </span>

              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm text-gray-600">

              <div className="space-y-1">
                <p>
                  <strong>Items:</strong> {order.items.length}
                </p>
                <p>
                  <strong>Total:</strong> Rs {order.subTotal.toLocaleString()}
                </p>
              </div>

              <div className="space-y-1">
                <p>
                  <strong>Phone:</strong> {order.phone}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
              </div>

            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-5">

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
              <Button
                size="sm"
                onClick={() => navigate(`/order/${order._id}`)}
              >
                View Details
              </Button>

            </div>

          </div>
        ))}
      </div>
    )}
  </div>
</div>
  );
};

export default Orders;