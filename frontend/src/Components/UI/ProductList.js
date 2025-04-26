import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductList = React.memo(
  ({ products, onAddToCart, lastProductRef, Loading }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products &&
        products.map((product, index) => {
          if (index === products.length - 1) {
            return (
              <div key={product.productId} ref={lastProductRef}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            );
          }
          return (
            <ProductCard
              key={product.productId}
              product={product}
              onAddToCart={onAddToCart}
            />
          );
        })}
      {(!Loading && products && products.length === 0) && (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
            No products available
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Check back soon or try adjusting your filters
          </p>
        </div>
      )}
    </div>
  )
);
