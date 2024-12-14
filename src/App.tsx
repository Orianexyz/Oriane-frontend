import "./globals.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "@/router/router";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
