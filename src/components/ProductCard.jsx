import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatIndianRupee } from "../utils/formatCurrency";

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      className="rounded bg-white shadow p-4 flex flex-col hover:scale-105 transition-transform"
      whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
    >
      <Link to={`/product/${product.id}`} aria-label={`Details of ${product.title}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 w-auto mx-auto object-contain"
          loading="lazy"
        />
        <h2 className="font-semibold my-2 line-clamp-2 underline">{product.title}</h2>
      </Link>
      <p className="text-blue-600 font-bold">{formatIndianRupee(product.price)}</p>
      <div>
        
      </div>
     <button
  className="mt-auto w-full bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
  onClick={() => onAdd(product)}
  aria-label={`Add ${product.title} to cart`}
>
  <FaShoppingCart /> Add to Cart
</button>
    </motion.div>
  );
}
