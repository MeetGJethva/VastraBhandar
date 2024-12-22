import { Star } from 'lucide-react';

export const RatingStars = ({ rating }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < Math.floor(rating) 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">{rating}</span>
    </div>
  );