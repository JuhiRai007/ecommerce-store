import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch dynamic categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch {
        setCategories([]);
        toast.error("Couldn't load categories. Try again later.");
      }
    };
    fetchCategories();
  }, []);

  // Search handler navigates to search page, closes mobile menu
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSearchLoading(true);
    setTimeout(() => {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearchLoading(false);
      setMobileMenuOpen(false);
    }, 200);
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const onNavLinkClick = () => setMobileMenuOpen(false);

  // Cart item count total
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MyStore
          </Link>
        </div>

        {/* Desktop: search bar in center*/}
        <div className="hidden md:flex flex-grow max-w-lg px-8">
          <form
            onSubmit={handleSearch}
            className="relative w-full"
            role="search"
            aria-label="Search for products"
          >
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 pl-10 pr-12 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={searchLoading}
              aria-label="Search products"
            />
            <FaSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
              size={18}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              disabled={searchLoading}
              aria-label="Submit search"
            >
              {searchLoading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                "Search"
              )}
            </button>
          </form>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center space-x-6 flex-shrink-0">
          {/* Categories */}
          <div className="flex gap-6">
            {categories.map((category) => (
              <NavLink
                key={category}
                to={`/category/${category}`}
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
                }
                onClick={onNavLinkClick}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </NavLink>
            ))}
          </div>

          {/* Cart */}
          <NavLink
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
            aria-label="View cart"
            onClick={onNavLinkClick}
          >
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* User info */}
          {user ? (
            <div className="flex items-center gap-4 cursor-pointer">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-blue-700"
              >
                <FaUserCircle size={22} />
                <span>{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="ml-2 text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md hover:underline"
                aria-label="Logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="hover:bg-blue-600 font-semibold bg-blue-500 text-white rounded-md px-3 py-1"
              aria-label="Login page"
              onClick={onNavLinkClick}
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile: hamburger icon and cart */}
        <div className="flex items-center lg:hidden space-x-4">
          {/* Cart icon */}
          <NavLink
            to="/cart"
            className="relative text-gray-700 hover:text-blue-600"
            aria-label="View cart"
            onClick={onNavLinkClick}
          >
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Hamburger toggle */}
          <button
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-200">
          <div className="px-4 py-6 flex flex-col space-y-6">
            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="relative"
              role="search"
              aria-label="Search for products"
            >
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 pl-10 pr-12 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={searchLoading}
                aria-label="Search products"
              />
              <FaSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={18}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                disabled={searchLoading}
                aria-label="Submit search"
              >
                {searchLoading ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                ) : (
                  "Search"
                )}
              </button>
            </form>

            {/* Categories */}
            <div className="flex flex-col space-y-3 border-t border-gray-300 pt-4">
              {categories.map((category) => (
                <NavLink
                  key={category}
                  to={`/category/${category}`}
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-600"
                  }
                  onClick={onNavLinkClick}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              ))}
            </div>

            {/* User section */}
            <div className="border-t border-gray-300 pt-4">
              {user ? (
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/profile"
                    className="hover:text-blue-600 flex items-center gap-2"
                    onClick={onNavLinkClick}
                  >
                    <FaUserCircle size={22} />
                    <span>{user.username}</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md hover:underline text-left"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="hover:bg-blue-600 font-semibold bg-blue-500 text-white rounded-md px-3 py-1 text-center"
                  aria-label="Login page"
                  onClick={onNavLinkClick}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
