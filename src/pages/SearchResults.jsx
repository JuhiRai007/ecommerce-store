// src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const { addToCart } = useCart();
  const query = useQuery().get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((all) =>
        setResults(
          all.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
          )
        )
      )
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Results for "{query}"</h1>
      {loading ? (
        <Loader />
      ) : results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
