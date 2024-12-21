import { Link } from 'react-router-dom';

export const CategoryCard = ({ title, image, backgroundColor, href }) => {
  return (
    <Link 
      to={href}
      className="block group relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
      aria-label={`View ${title} category`}
    >
      <div className={`aspect-square ${backgroundColor}`}>
        <img
          src={image}
          alt=""  // Decorative image as title is in overlay
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-0 w-full text-center py-2 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 transition-all duration-300 group-hover:bg-opacity-95 group-hover:dark:bg-opacity-95">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-orange-500 dark:group-hover:text-orange-400">
          {title}
        </h3>
      </div>
    </Link>
  );
};