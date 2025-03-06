export const ProductSelector = ({ products, selectedProduct, onSelect }) => {
    return (
      <div className="w-24 h-[500px] overflow-y-auto border-r border-gray-200 dark:border-gray-700 mr-4">
        <div className="space-y-4 p-2">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelect(product)}
              className={`cursor-pointer rounded-lg p-2 transition-all ${
                selectedProduct.id === product.id
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-md mb-2"
              />
              <p className="text-xs text-center font-medium dark:text-gray-200">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };