import React from "react";
import { Routes, Route } from "react-router-dom";
import Properties from "../pages/Properties";
import Testimonials from "../pages/Testimonials";
import Messages from "../pages/Messages";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Properties />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
};

export default AppRouter;