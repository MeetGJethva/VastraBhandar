import { Filters } from '../../Components/filters/Filters';
import { ProductList } from '../../Components/UI/ProductList';
import { useProducts } from '../../hooks/useProducts';

export const ProductPage = () => {
  const { products, loading, error, filters, setFilters } = useProducts();

  const handleAddToCart = (product) => {
    // Implement cart functionality
    console.log('Adding to cart:', product);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex">
        <Filters filters={filters} onFilterChange={setFilters} />
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default ProductPage;