// import React from 'react';
// 
// 

// // Interface for Product
// interface Product {
//   productId: number;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   imageUrl: string;
//   rating: number;
//   stockQuantity: number;
//   createdAt: string;
//   updatedAt: string;
// }

// // Props for ProductCard
// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const navigate = useNavigate();

//   // Function to render star ratings
//   const renderStars = (rating: number) => {
//     const fullStars = Math.floor(rating);
//     const halfStars = rating % 1 !== 0;

//     let stars = [];
//     for (let i = 0; i < fullStars; i++) {
//       stars.push('★');
//     }
//     if (halfStars) {
//       stars.push('☆');
//     }
//     return stars.join('');
//   };

//   // Add product to the cart
//   const addToCart = async (product: Product) => {
//     try {
//       // Fetch existing cart items
//       const existingCartItemResponse = await axios.get('http://localhost:5190/api/Cart');
      
//       // Log response to see the structure of data
//       console.log("Cart response data:", existingCartItemResponse.data);
  
//       // Extract cart items from response by accessing `$values` array
//       const cartItems = existingCartItemResponse.data.$values || [];
  
//       // Check if the item is already in the cart
//       const existingCartItem = cartItems.find((item: any) => item.productId === product.productId);
  
//       if (existingCartItem) {
//         alert('Product already added to the cart. You can go there and increase the quantity.');
//       } else {
       
//         const cartItem = {
//           productId: product.productId,
//           quantity: 1,
//         };
  
        
//         await axios.post('http://localhost:5190/api/Cart', cartItem);
//         alert('Product added to cart');
//       }
//     } catch (error: any) {
     
//       if (error.response) {
//         console.error("Error response:", error.response.data);
//         alert(`Failed to add/update product in cart: ${error.response.data}`);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//         alert('No response received from server');
//       } else {
//         console.error("Error:", error.message);
//         alert('Error adding/updating product to cart');
//       }
//     }
//   };
  

//   // Navigate to product details page when clicked
 

//   return (
//     <div className="product-card" onClick={handleClick}>
//       <img src={product.imageUrl} alt={product.name} className="product-image" />
//       <h3 className="product-name">{product.name}</h3>
//       <p className="product-price">${product.price}</p>
//       <div className="product-rating">
//         {renderStars(product.rating)}
//       </div>
//       <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductCard;
import type React from "react"
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface Product {
  productId: number
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  rating: number
  stockQuantity: number
  createdAt: string
  updatedAt: string
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.productId}`); // Navigate to product detail page
  };
  const addToCart = async (product: Product) => {
    try {
      // Fetch existing cart items
      const existingCartItemResponse = await axios.get('http://localhost:5190/api/Cart');
      
      // Log response to see the structure of data
      console.log("Cart response data:", existingCartItemResponse.data);
  
      // Extract cart items from response by accessing `$values` array
      const cartItems = existingCartItemResponse.data.$values || [];
  
      // Check if the item is already in the cart
      const existingCartItem = cartItems.find((item: any) => item.productId === product.productId);
  
      if (existingCartItem) {
        alert('Product already added to the cart. You can go there and increase the quantity.');
      } else {
       
        const cartItem = {
          productId: product.productId,
          quantity: 1,
        };
  
        
        await axios.post('http://localhost:5190/api/Cart', cartItem);
        alert('Product added to cart');
      }
    } catch (error: any) {
     
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`Failed to add/update product in cart: ${error.response.data}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert('No response received from server');
      } else {
        console.error("Error:", error.message);
        alert('Error adding/updating product to cart');
      }
    }
  };
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md"  >
      {/* Sale or New tag */}
      {product.stockQuantity < 5 && product.stockQuantity > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
          Low Stock
        </div>
      )}

      {/* Wishlist button */}
    
    <div onClick={handleClick}>
      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-1 text-xs text-gray-500 uppercase tracking-wider">{product.category}</div>
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
        </div>
        </div>
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-2">
          <div className="font-bold text-gray-900">${product.price.toFixed(2)}</div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-full transition-colors" onClick={() => addToCart(product)}>
            <FaShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

