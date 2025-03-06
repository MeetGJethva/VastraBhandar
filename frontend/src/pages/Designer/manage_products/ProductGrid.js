import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ 
  products, 
  onEdit, 
  onDeleteConfirm, 
  confirmDeleteId, 
  onDelete 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          onEdit={onEdit}
          onDeleteConfirm={onDeleteConfirm}
          isConfirmingDelete={confirmDeleteId === product.productId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductGrid;