import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "@/components/loadingSpinner";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${BACKEND_URL}/api/v1/user/whoami`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setUserId(response.data.id);
    } catch (error) {
      console.error("Cannot fetch the user id!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  if (loading) {
    return <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 z-10">
    <LoadingSpinner className="" />
  </div>; }

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
