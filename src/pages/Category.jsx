import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${categoryName}`
        );
        if (!res.ok) throw new Error("Failed to fetch category products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Added to cart!");
  };

  if (loading) return <Loader />;
  if (error)
    return <p className="text-red-500 text-center mt-12 text-lg">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl mb-6 capitalize">{categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
            />
          ))
        )}
      </div>
    </div>
  );
}
