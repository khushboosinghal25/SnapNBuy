import React from 'react'
import ProductList from './ProductList'

interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    rating: number;
    stockQuantity: number;
    createdAt: string;
    updatedAt: string;
  }
  
  interface FeaturedProductsProps {
    featuredProducts: Product[];
  }
const FeaturedProducts:React.FC<FeaturedProductsProps>=({featuredProducts}) => {
  return (
    <div>
       <section className='featured-products'>
        <ProductList products={featuredProducts}/>
       </section>
    </div>
  )
}

export default FeaturedProducts
