import { useNavigate, useSearchParams } from 'react-router-dom';

export const useQueryFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();

  // Get filters from URL or use defaults
  const filters = {
    sortBy: searchParams.get('sort') || 'name',
    priceRange: searchParams.get('price') || 'all',
    rating: searchParams.get('rating') || 'all'
  };

  // Update URL when filters change
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();
    
    // Only add parameters that aren't default values
    if (newFilters.sortBy !== 'name') params.set('sort', newFilters.sortBy);
    if (newFilters.priceRange !== 'all') params.set('price', newFilters.priceRange);
    if (newFilters.rating !== 'all') params.set('rating', newFilters.rating);

    // Update URL without page reload
    setSearchParams(params);
  };

  return [filters, updateFilters];
};