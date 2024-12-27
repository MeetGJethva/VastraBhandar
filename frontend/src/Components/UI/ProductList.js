import { ProductCard } from "./ProductCard";

export const ProductList = ({ products, onAddToCart }) => (
  <div className="ml-[30%] w-[70%] p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  </div>
);
