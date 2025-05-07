import type React from "react"
import ProductCard from "./ProductCard"

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

interface ProductListProps {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300 mb-4"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or check back later.
        </p>
      </div>
    )
  }

  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.productId} className="product-card-wrapper">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

       </div>
    </section>
  )
}

export default ProductList

