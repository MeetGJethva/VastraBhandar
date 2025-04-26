import { useContext, useEffect, useState } from "react";
import { CategoryCard } from "../../Components/UI/CategoryCard";
import { getCategories } from "../../services/customer/category_services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth_context";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Sparkles, Shirt, ShoppingBag, Palette } from "lucide-react";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category?.name}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories(user);
      setCategories(fetchedCategories);
    };
    if (!loading) fetchCategories();
  }, [user, loading]);

  // Hero section animation style
  const heroAnimationStyle = {
    backgroundImage: "url('data:image/svg+xml;charset=utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22%3E%3Cpath fill=%22%234f46e5%22 fill-opacity=%220.1%22 d=%22M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,181.3C672,181,768,235,864,250.7C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%22%3E%3C/path%3E%3C/svg%3E')",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    height: "calc(100vh - 64px)", // Adjust based on your navbar height
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div 
        className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
        style={heroAnimationStyle}
      >
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="inline-block mb-6 bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
            <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Express Your Style With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              Custom Designs
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create clothing that's uniquely you. Browse our categories and start customizing today!
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/products')}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition duration-200 transform hover:scale-105"
            >
              Shop Now
            </button>
            <button 
              onClick={() => navigate('/customize')}
              className="px-6 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 text-gray-800 dark:text-gray-200 font-medium transition duration-200 transform hover:scale-105"
            >
              Start Designing
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Shirt className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Customized Clothing
              </h2>
            </div>
            
            <button 
              onClick={() => navigate('/products')}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
            >
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : categories && categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="transform transition duration-300 hover:scale-105 hover:-rotate-1"
                >
                  <CategoryCard
                    title={category.name}
                    image={category.image}
                    backgroundColor={category.backgroundColor}
                    onClick={() => handleCategoryClick(category)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">No categories available</h3>
              <p className="text-gray-500 dark:text-gray-400">Check back soon for our latest collections!</p>
            </div>
          )}
        </section>

        {/* Features section */}
        <section className="py-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 flex items-center">
            <Palette className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            Why Choose Our Custom Clothing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👕",
                title: "Premium Materials",
                description: "High-quality fabrics that feel great and last longer"
              },
              {
                icon: "🎨",
                title: "Custom Designs",
                description: "Upload your own art or use our design tools to create something unique"
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                description: "Your custom creations shipped directly to your door"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;