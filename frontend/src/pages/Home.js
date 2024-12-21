// pages/HomePage.js
import { CategoryCard } from '../Components/UI/CategoryCard';

const categories = [
    {
      title: "Men's Clothing",
      image: "/api/placeholder/400/400",
      backgroundColor: "bg-orange-200",
      href: "/category/mens-clothing"
    },
    {
      title: "Women's Clothing",
      image: "/api/placeholder/400/400",
      backgroundColor: "bg-blue-200",
      href: "/category/womens-clothing"
    },
    {
      title: "Kid's Clothing",
      image: "/api/placeholder/400/400",
      backgroundColor: "bg-green-200",
      href: "/category/kids-clothing"
    },
    {
      title: "Custom Men T-Shirts",
      image: "/api/placeholder/400/400",
      backgroundColor: "bg-gray-200",
      href: "/category/custom-men-tshirts"
    }
  ];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <section className="py-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
            Customized Clothing
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                image={category.image}
                backgroundColor={category.backgroundColor}
                href={category.href}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;