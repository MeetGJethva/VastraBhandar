import { CategoryCard } from "../../Components/UI/CategoryCard";
import { getCategories } from "../../services/customer/category_services";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const categories = getCategories();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.name?.replaceAll(" ", "-")}`); // Redirect to subcategory page
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
            Customized Clothing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories &&
              categories.map((category, index) => (
                <CategoryCard
                  key={index}
                  title={category.name}
                  image={category.image}
                  backgroundColor={category.backgroundColor}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
