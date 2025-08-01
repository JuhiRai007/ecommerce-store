import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  if (loading) return <Loader />;
  if (error)
    return <p className="text-red-500 text-center mt-12 text-lg">{error}</p>;

  return (
    <>
      <section className="mb-8">
        <div className="relative bg-blue-600 rounded p-12 text-white overflow-hidden">
          <h1 className="text-4xl font-bold max-w-xl leading-tight">
            Discover Amazing Products at Unbeatable Prices
          </h1>
          <p className="mt-4 max-w-lg">
            Shop from a wide selection of categories and enjoy fast shipping.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 12).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}
