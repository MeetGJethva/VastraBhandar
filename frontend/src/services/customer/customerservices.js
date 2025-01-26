export const getCategories = function () {
  return [
    {
      id: "mens-clothing",
      title: "Men's Clothing",
      image: "/api/placeholder/400/400",
      backgroundColor: "bg-orange-200",
      hasSubcategories: true,
      subcategories: [
        { id: "mens-shirts", title: "Men's Shirts" },
        { id: "mens-jeans", title: "Men's Jeans" },
        { id: "mens-shoes", title: "Men's Shoes" },
      ],
    },
    {
      id: "womens-clothing",
      title: "Women's Clothing",
      image: "/api/placeholder/400/400",
      backgroundColor: "bg-blue-200",
      hasSubcategories: true,
      subcategories: [
        { id: "womens-dresses", title: "Women's Dresses" },
        { id: "womens-tops", title: "Women's Tops" },
        { id: "womens-shoes", title: "Women's Shoes" },
      ],
    },
    {
      id: "kids-clothing",
      title: "Kid's Clothing",
      image: "/api/placeholder/400/400",
      backgroundColor: "bg-green-200",
      hasSubcategories: true,
      subcategories: [
        { id: "kids-shirts", title: "Kids' Shirts" },
        { id: "kids-pants", title: "Kids' Pants" },
        { id: "kids-shoes", title: "Kids' Shoes" },
      ],
    },
    {
      title: "Custom Men T-Shirts",
      image: "/api/placeholder/400/400",
      backgroundColor: "bg-gray-200",
      href: "/products?category=custom-men-tshirts",
      hasSubcategories: false,
    },
  ];
};
