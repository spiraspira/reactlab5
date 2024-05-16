import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Properties from "../pages/Properties";
import Testimonials from "../pages/Testimonials";
import Messages from "../pages/Messages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [tokenSession, setTokenSession] = useState(sessionStorage.getItem("token"));
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
            setTokenSession(sessionStorage.getItem("token"));
            navigate("/");
        };

        window.addEventListener("storage", handleStorageChange);
    }, [navigate]);

    if (token || tokenSession) {
        return (
            <Routes>
            <Route path="/" element={<Properties />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/login" element={<Navigate to={"/"} />} />
            <Route path="/register" element={<Navigate to={"/"} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
    }

    if (!token || !tokenSession) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route key="*" path="*" element={<Navigate to={"/login"} />} />
            </Routes>
        );
    }
};

export default AppRouter;