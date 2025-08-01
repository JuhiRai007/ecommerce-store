import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </main>
      <ToastContainer position="top-right" autoClose={4000} />
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; 2025 My E-Commerce Store
      </footer>
    </div>
  );
}
