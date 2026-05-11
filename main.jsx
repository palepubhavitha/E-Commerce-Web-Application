import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import "./App.css";

import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./contexts/CartContext.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <CartProvider>

          <App />

        </CartProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);