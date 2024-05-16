import React, { useState } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        {!isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <>
            <Header />
            <AppRouter
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
            <Footer />
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;