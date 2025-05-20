"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { Heart, Trash2, ShoppingCart, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"

interface Product {
  name: string
  price: number
  imageUrl: string
  productId: number
}

interface WishlistItem {
  productId: number
  product: Product
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get("http://localhost:5190/api/Wishlist")
        const data = response.data.$values || []

        const formattedItems: WishlistItem[] = data.map((item: any) => ({
          productId: item.id,
          product: {
            productId: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
          },
        }))

        setWishlistItems(formattedItems)
      } catch (err) {
        console.error("Fetch wishlist error:", err)
        setError("Unable to load your wishlist. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchWishlistItems()
  }, [])

  const handleRemoveFromWish = async (wishlistItemId: number) => {
    try {
      await axios.delete(`http://localhost:5190/api/Wishlist/${wishlistItemId}`)
      setWishlistItems(prev => prev.filter(item => item.productId !== wishlistItemId))
    } catch (err) {
      console.error("Remove error:", err)
      setError("Failed to remove item. Please try again.")
      setTimeout(() => setError(null), 3000)
    }
  }

  const handleAddToCart = async (product: Product) => {
    try {
      console.log("Adding to cart:", product)
      // await axios.post('http://localhost:5190/api/Cart', { productId: product.productId, quantity: 1 });
    } catch (err) {
      console.error("Add to cart error:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>
        <div className="flex justify-center">
          <div className="animate-spin h-12 w-12 rounded-full border-t-2 border-b-2 border-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Wishlist</h2>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(({ productId, product }) => (
            <div key={productId} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    No image available
                  </div>
                )}
                <button
                  onClick={() => handleRemoveFromWish(productId)}
                  className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full text-red-500 hover:text-red-600"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-lg mb-2 line-clamp-2 h-14">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 bg-primary/10 hover:bg-primary/20 rounded-full text-primary"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save items you love and revisit them anytime.</p>
          <Link
            to="/shop"
            className="inline-flex items-center px-4 py-2 border border-primary text-primary bg-white hover:bg-primary/5 rounded-md"
          >
            Discover Products
          </Link>
        </div>
      )}
    </div>
  )
}

export default Wishlist
