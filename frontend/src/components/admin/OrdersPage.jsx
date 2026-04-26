import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Loading from "../Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${server}/api/order/admin/all`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await axios.post(
        `${server}/api/order/${orderId}`,
        { status },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.user.email.toLowerCase().includes(search.toLowerCase()) ||
      order._id.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Manage Orders
        </h1>

        <Input
          placeholder="Search by email or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80"
        />
      </div>

      {/* Content Card */}
      <div className="bg-background border rounded-2xl shadow-sm">
        {loading ? (
          <div className="p-10">
            <Loading />
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead>Order ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order._id}
                    className="hover:bg-muted/30 transition"
                  >
                    <TableCell className="font-medium">
                      <Link
                        to={`/order/${order._id}`}
                        className="text-primary hover:underline"
                      >
                        #{order._id.slice(-6)}
                      </Link>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {order.user.email}
                    </TableCell>

                    <TableCell className="font-semibold">
                      Rs. {order.subTotal}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {moment(order.createdAt).format("DD MMM YYYY")}
                    </TableCell>

                    <TableCell className="text-right">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className="px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-10 text-center text-muted-foreground">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;