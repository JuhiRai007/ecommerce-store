import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Loader from "../components/Loader";
import { FaShoppingCart } from "react-icons/fa";
import { formatIndianRupee } from "../utils/formatCurrency";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success("Added to cart!");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-12">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.title}
        className="h-96 object-contain mx-auto border border-gray-200 px-4 py-2 rounded-md"
        loading="lazy"
      />
      <div className="flex flex-col max-w-2xl">
        <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
        <p className="mb-4 text-md text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold mb-6">
          {formatIndianRupee(product.price)}
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white py-3 px-6 rounded flex items-center gap-2 hover:bg-blue-700 max-w-max"
          aria-label={`Add ${product.title} to cart`}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}
