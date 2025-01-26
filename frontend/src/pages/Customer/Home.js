import { CategoryCard } from '../../Components/UI/CategoryCard';
import { getCategories } from '../../services/customer/customerservices';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

const HomePage = () => {
  const categories = getCategories();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query string to get current category
  const currentCategoryId = new URLSearchParams(location.search).get('category');

  // Find the current category from the categories list
  const currentCategory = useMemo(
    () => categories.find((category) => category.id === currentCategoryId),
    [currentCategoryId, categories]
  );

  const handleCategoryClick = (category) => {
    if (category.hasSubcategories) {
      navigate(`/?category=${category.id}`);
    } else if (category.href) {
      window.location.href = category.href; // Redirect for categories without subcategories
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/products?category=${subcategory.id}`); // Redirect to subcategory page
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
            {currentCategory ? currentCategory.title : "Customized Clothing"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {!currentCategory &&
              categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category.title}
                  image={category.image}
                  backgroundColor={category.backgroundColor}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}

            {currentCategory &&
              currentCategory.subcategories.map((subcategory, index) => (
                <CategoryCard
                  key={index}
                  title={subcategory.title}
                  backgroundColor="bg-gray-200"
                  onClick={() => handleSubcategoryClick(subcategory)}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
