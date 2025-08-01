import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { formatIndianRupee } from "../utils/formatCurrency";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleDecrement = (id, qty) => {
    if (qty === 1) {
      removeFromCart(id);
    } else if (qty > 1) {
      updateQuantity(id, qty - 1);
    }
  };

  const handleIncrement = (id, qty) => {
    updateQuantity(id, qty + 1);
  };

  const handleInputChange = (id, value) => {
    const qty = Number(value);
    if (isNaN(qty) || qty < 1) return;
    updateQuantity(id, qty);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 space-y-6 px-4 text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="w-48 h-48 opacity-70"
          aria-hidden="true"
        />
        <h2 className="text-3xl font-semibold text-gray-700">Your Cart is Empty</h2>
        <p className="text-gray-600 max-w-md">
          Looks like you haven't added any items to your cart yet. Explore our products and start shopping!
        </p>
        <Link
          to="/"
          className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 text-white font-semibold py-3 px-8 rounded transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cartItems.map(({ id, title, price, quantity, image }) => (
            <div
              key={id}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              role="listitem"
            >
              <img
                src={image}
                alt={title}
                className="h-28 w-28 object-contain rounded-md flex-shrink-0"
              />

              <div className="flex flex-col sm:ml-6 mt-4 sm:mt-0 flex-grow w-full">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{title}</h2>
                <p className="text-blue-600 font-bold text-xl mt-1">{formatIndianRupee(price)}</p>

                <div className="mt-auto flex items-center space-x-3 mt-5">
                  <label htmlFor={`qty-${id}`} className="sr-only">
                    Quantity for {title}
                  </label>

                  <button
                    type="button"
                    onClick={() => handleDecrement(id, quantity)}
                    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label={`Decrease quantity of ${title}`}
                  >
                    <FaMinus />
                  </button>

                  <input
                    id={`qty-${id}`}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    className="w-16 border border-gray-300 rounded-md text-center py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-live="polite"
                  />

                  <button
                    type="button"
                    onClick={() => handleIncrement(id, quantity)}
                    className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label={`Increase quantity of ${title}`}
                  >
                    <FaPlus />
                  </button>

                  <button
                    onClick={() => removeFromCart(id)}
                    className="ml-auto p-2 rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label={`Remove ${title} from cart`}
                    title="Remove item"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-white rounded-lg shadow-md p-8 flex flex-col justify-between sticky top-20 h-fit">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h3>
            <div className="flex justify-between mb-4 text-gray-700 text-lg">
              <span>Items ({cartItems.length})</span>
              <span>{formatIndianRupee(totalPrice)}</span>
            </div>
            <hr />
            <div className="flex justify-between mt-6 font-extrabold text-2xl text-gray-900">
              <span>Total</span>
              <span>{formatIndianRupee(totalPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                       text-white py-3 rounded-lg font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-blue-400"
            aria-label="Proceed to checkout"
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
