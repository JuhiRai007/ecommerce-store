import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaHome,
  FaCreditCard,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) errs.name = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.address1.trim()) errs.address1 = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.state.trim()) errs.state = "State is required";
    if (!/^\d{5}(-\d{4})?$/.test(form.zipCode))
      errs.zipCode = "Zip code must be valid (e.g., 12345)";
    if (!/^\+?[0-9]{7,15}$/.test(form.phone))
      errs.phone = "Valid phone number is required";

    if (form.paymentMethod === "card") {
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s+/g, "")))
        errs.cardNumber = "Card number must be 16 digits";
      if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(form.expiry))
        errs.expiry = "Expiry date must be MM/YY";
      if (!/^\d{3}$/.test(form.cvv)) errs.cvv = "CVV must be 3 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (method) => {
    setForm({ ...form, paymentMethod: method });
    if (method === "cod") {
      setErrors((prevErrors) => {
        const { cardNumber, expiry, cvv, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      clearCart();
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto mt-24 p-8 bg-green-100 rounded-lg text-center shadow-md">
        <h2 className="text-3xl font-semibold text-green-700 mb-4">
          Thank you for your order!
        </h2>
        <p className="text-green-800 text-lg mb-2">
          Your order has been received and is being processed.
        </p>
        <p className="text-green-700 font-semibold mb-1">
          Payment method:{" "}
          {form.paymentMethod === "card"
            ? "Credit/Debit Card"
            : "Cash on Delivery"}
        </p>
        <p className="text-green-700">
          We will contact you at{" "}
          <span className="font-medium">{form.phone}</span> or via email{" "}
          <span className="font-medium">{form.email}</span> for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Checkout</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-10">
        {/* Shipping Information */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b-2 pb-2 border-blue-600 text-blue-700">
            Shipping Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="flex flex-col text-gray-700 font-medium mb-1">
                Full Name
                <div className="relative">
                  <FaUser className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
              </label>
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 ml-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex flex-col text-gray-700 font-medium mb-1">
                Email
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
              </label>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="flex flex-col text-gray-700 font-medium mb-1">
                Phone Number
                <div className="relative">
                  <FaPhone className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1234567890"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
              </label>
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1 ml-1">{errors.phone}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="flex flex-col text-gray-700 font-medium mb-1">
                City
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
              </label>
              {errors.city && (
                <p className="text-red-600 text-sm mt-1 ml-1">{errors.city}</p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="flex flex-col text-gray-700 font-medium mb-1">
                State
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
              </label>
              {errors.state && (
                <p className="text-red-600 text-sm mt-1 ml-1">{errors.state}</p>
              )}
            </div>

            {/* Zip Code */}
            <div>
              <label className="flex flex-col text-gray-700 font-medium mb-1">
                Zip Code
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="zipCode"
                    value={form.zipCode}
                    onChange={handleChange}
                    placeholder="12345"
                    maxLength={10}
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.zipCode ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
              </label>
              {errors.zipCode && (
                <p className="text-red-600 text-sm mt-1 ml-1">{errors.zipCode}</p>
              )}
            </div>

            {/* Address Line 1 */}
            <div className="md:col-span-2">
              <label className="flex flex-col text-gray-700 font-medium mb-1">
                Address Line 1
                <div className="relative">
                  <FaHome className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="address1"
                    value={form.address1}
                    onChange={handleChange}
                    placeholder="1234 Main St"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.address1 ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
              </label>
              {errors.address1 && (
                <p className="text-red-600 text-sm mt-1 ml-1">{errors.address1}</p>
              )}
            </div>

            {/* Address Line 2 */}
            <div className="md:col-span-2">
              <label className="flex flex-col text-gray-700 font-medium mb-1">
                Address Line 2 (Optional)
                <div className="relative">
                  <FaHome className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="address2"
                    value={form.address2}
                    onChange={handleChange}
                    placeholder="Apartment, studio, or floor"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold border-b-2 pb-2 border-blue-600 text-blue-700">
            Payment Method
          </h2>

          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => handlePaymentChange("card")}
              className={`flex-1 border rounded-lg py-3 flex items-center justify-center gap-3 cursor-pointer ${
                form.paymentMethod === "card"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-700"
              } hover:bg-blue-500 hover:text-white transition`}
              aria-pressed={form.paymentMethod === "card"}
            >
              <FaCreditCard size={20} /> Credit/Debit Card
            </button>

            <button
              type="button"
              onClick={() => handlePaymentChange("cod")}
              className={`flex-1 border rounded-lg py-3 flex items-center justify-center gap-3 cursor-pointer ${
                form.paymentMethod === "cod"
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 text-gray-700"
              } hover:bg-green-500 hover:text-white transition`}
              aria-pressed={form.paymentMethod === "cod"}
            >
              <FaMoneyBillWave size={20} /> Cash on Delivery
            </button>
          </div>

          {form.paymentMethod === "card" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <label className="flex flex-col text-gray-700 font-medium">
                Card Number
                <div className="relative">
                  <FaCreditCard className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    maxLength="19"
                    placeholder="1234 5678 9012 3456"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
                {errors.cardNumber && (
                  <p className="text-red-600 text-sm mt-1 ml-1">{errors.cardNumber}</p>
                )}
              </label>

              <label className="flex flex-col text-gray-700 font-medium">
                Expiry (MM/YY)
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="text"
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.expiry ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
                {errors.expiry && (
                  <p className="text-red-600 text-sm mt-1 ml-1">{errors.expiry}</p>
                )}
              </label>

              <label className="flex flex-col text-gray-700 font-medium">
                CVV
                <div className="relative">
                  <FaLock className="absolute left-3 top-4 text-blue-500" />
                  <input
                    type="password"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    maxLength="3"
                    placeholder="123"
                    className={`w-full pl-10 pr-3 py-3 border rounded-md transition ${
                      errors.cvv ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                </div>
                {errors.cvv && (
                  <p className="text-red-600 text-sm mt-1 ml-1">{errors.cvv}</p>
                )}
              </label>
            </div>
          )}
        </section>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg text-xl font-semibold shadow-lg transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
