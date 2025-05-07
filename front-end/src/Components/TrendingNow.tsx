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
  
  interface TrendingNowProps {
    trendingProducts: Product[];
  }
const TrendingNow:React.FC<TrendingNowProps>=({trendingProducts}) => {
  return (
    <div>
       <section className='trending-now'>
        <ProductList products={trendingProducts}/>
       </section>
    </div>
  )
}

export default TrendingNow;
