import { ProductCard } from "./ProductCard";

export const ProductList = ({ products, onAddToCart }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {products &&
      products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
  </div>
);
