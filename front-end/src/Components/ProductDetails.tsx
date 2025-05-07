"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

// Review Interface
interface Review {
  reviewId: number
  reviewText: string
  rating: number
  createdAt: string
}

// Product Interface
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
  reviews: Review[]
}

const ProductDetail: React.FC = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [review, setReview] = useState("")
  const [rating, setRating] = useState(0)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5190/api/Product/${id}/reviews`)
        const data = response.data
        if (data.reviews && Array.isArray(data.reviews.$values)) {
          setProduct({
            ...data,
            reviews: data.reviews.$values,
          })
        } else {
          setProduct(data)
        }
        console.log("Product Data:", data)
      } catch (error) {
        console.error("Error fetching product details:", error)
      }
    }

    if (id) {
      fetchProductDetails()
    }
  }, [id])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!product) return

    const reviewData = {
      ProductId: product.productId,
      ReviewText: review,
      Rating: rating,
    }

    try {
      await axios.post(`http://localhost:5190/api/Product/${product.productId}/reviews`, reviewData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      alert("Review added successfully!")
      setReview("")
      setRating(0)
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Failed to submit review")
    }
  }

  const toggleWishlist = async (productId: number) => {
    if (!product) return
    const selectedProduct = {
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
    }
    try {
      await axios.post("http://localhost:5190/api/Wishlist", selectedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      setWishlist((prevWishlist) =>
        prevWishlist.includes(productId) ? prevWishlist.filter((id) => id !== productId) : [...prevWishlist, productId],
      )
      alert("Successfully added to WishList!")
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      alert("Failed to add product to wishlist.")
    }
  }

  const addToCart = async (productId: number) => {
    if (!product) return
    const selectedProduct = {
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
    }
    try {
      await axios.post("http://localhost:5190/api/Order", selectedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      setCart((prevCart) =>
        prevCart.includes(productId) ? prevCart.filter((id) => id !== productId) : [...prevCart, productId],
      )
      alert("Order placed!")
    } catch (error) {
      console.error("Error adding to cart:", error)
      alert("Failed to add product to cart.")
    }
  }

  if (!product) return <div className="flex justify-center items-center h-screen">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-2xl ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}>
                ★
              </span>
            ))}
            <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
          <p className="text-gray-600">Category: {product.category}</p>
          <p className="text-gray-600">Stock Quantity: {product.stockQuantity}</p>
          <p className="text-sm text-gray-500">Created: {new Date(product.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Updated: {new Date(product.updatedAt).toLocaleDateString()}</p>

          <div className="flex space-x-4">
            <button
              onClick={() => toggleWishlist(product.productId)}
              className={`px-4 py-2 rounded-full ${
                wishlist.includes(product.productId)
                  ? "bg-gray-300 text-gray-600"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } transition duration-300`}
              disabled={wishlist.includes(product.productId)}
            >
              {wishlist.includes(product.productId) ? "In Wishlist" : "Add to Wishlist"}
            </button>
            <button
              onClick={() => addToCart(product.productId)}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating (1-5):</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Review:</label>
              <textarea
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <ul className="space-y-6">
              {product.reviews.map((review) => (
                <li key={review.reviewId} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">({review.rating})</span>
                  </div>
                  <p className="text-gray-700 mb-2">{review.reviewText}</p>
                  <p className="text-sm text-gray-500">
                    Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

