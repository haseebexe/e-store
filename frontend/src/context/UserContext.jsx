import { server } from "@/main";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user] = useState([]);
  const [loading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isAuth] = useState(false);

  async function loginUser(email, navigate) {
    if (!email?.trim()) {
      toast.error("Email is required");
      return;
    }

    setBtnLoading(true);

    try {
      const response = await axios.post(`${server}/api/user/login`, {
        email: email.trim(),
      });

      toast.success(response.data.message);
      localStorage.setItem("email", email.trim());
      // navigate("/verify");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Login failed",
      );
    } finally {
      setBtnLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        isAuth,
        loginUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
