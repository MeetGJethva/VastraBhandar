import { ShoppingCart } from 'lucide-react';
import { RatingStars } from './RatingStars';

export const ProductCard = ({ product, onAddToCart }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden
                    transition-colors duration-200">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {product.description}
        </p>
        <RatingStars rating={product.rating} />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
          ₹{product.price}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 
                       hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                       transition-colors"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );