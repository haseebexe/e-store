import HomePage from "@/components/admin/HomePage";
import InfoPage from "@/components/admin/InfoPage";
import OrdersPage from "@/components/admin/OrdersPage";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/context/UserContext";
import { Home, Info, MenuIcon, ShoppingBag, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useUserData();

if (user.role !== "admin") {
  navigate("/");
  return null;
}
  const renderPageContent = () => {
    switch (selectedPage) {
      case "home":
        return <HomePage />;
      case "orders":
        return <OrdersPage />;
      case "info":
        return <InfoPage />;
      default:
        return <HomePage />;
    }
  };

  const navItem = (key, label, Icon) => (
    <button
      onClick={() => {
        setSelectedPage(key);
        setSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${
          selectedPage === key
            ? "bg-primary text-white shadow-md"
            : "hover:bg-muted/50 text-muted-foreground"
        }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 h-full w-64
        bg-background/80 backdrop-blur-xl border-r shadow-lg
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold tracking-tight">
              Admin Panel
            </h1>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X />
            </button>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            {navItem("home", "Dashboard", Home)}
            {navItem("orders", "Orders", ShoppingBag)}
            {navItem("info", "Info", Info)}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 text-xs text-muted-foreground">
            © 2026 Admin Panel
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="w-5 h-5" />
          </Button>

          <h2 className="text-lg font-semibold tracking-tight">
            {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
          </h2>

          <div className="text-sm text-muted-foreground hidden sm:block">
            Welcome, Admin
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="bg-background rounded-2xl shadow-sm border p-4 sm:p-6">
            {renderPageContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;