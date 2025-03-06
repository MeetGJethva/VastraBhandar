export function fetchCustomizerProducts(){
    return [{
        id: 1,
        name: "T-Shirt",
        thumbnail: "/api/placeholder/100/100",
        baseImage: "/api/placeholder/400/500",
        price: 29.99,
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Gray", "Navy"]
      },
      {
        id: 2,
        name: "Hoodie",
        thumbnail: "/api/placeholder/100/100",
        baseImage: "/api/placeholder/400/500",
        price: 49.99,
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Gray", "Navy"]
      },
      {
        id: 3,
        name: "Kids T-Shirt",
        thumbnail: "/api/placeholder/100/100",
        baseImage: "/api/placeholder/400/500",
        price: 24.99,
        sizes: ["XS", "S", "M", "L"],
        colors: ["White", "Black", "Gray", "Navy"]
      }];
}