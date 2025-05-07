"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useCoupons } from "../context/CouponsContext"
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"
import { Link } from "react-router-dom"

interface Product {
  name: string
  price: number
  imageUrl: string
  rating: number
  productId: number
}

interface CartItem {
  cartItemId: number
  productId: number
  quantity: number
  product: Product
}

interface Coupon {
  code: string
  discountAmount: number
}

const Cart: React.FC = () => {
  const { coupons } = useCoupons()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [discountedTotal, setDiscountedTotal] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Effect for setting cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:5190/api/Cart")
        setCartItems(response.data.$values)
      } catch (error) {
        console.error("Error fetching cart items: ", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCartItems()

    // Retrieve the discount and coupons from localStorage on page load
    const storedTotal = localStorage.getItem("discountedTotal")

    if (storedTotal) {
      setDiscountedTotal(Number.parseFloat(storedTotal))
    }
  }, [])

  const handleRemoveFromCart = async (cartItemId: number) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.cartItemId !== cartItemId)
    setCartItems(updatedCartItems)

    try {
      await axios.delete(`http://localhost:5190/api/Cart/${cartItemId}`)
    } catch (error) {
      console.error("Error removing item from cart:", error)
    }
  }

  const handleUpdateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(cartItemId)
      return
    }

    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.cartItemId === cartItemId ? { ...cartItem, quantity: newQuantity } : cartItem,
    )
    setCartItems(updatedCartItems)

    try {
      const productId = cartItems.find((cartItem) => cartItem.cartItemId === cartItemId)?.productId
      await axios.patch(`http://localhost:5190/api/Cart/${cartItemId}`, {
      cartItemId: cartItemId,
      productId: productId,
      quantity: newQuantity,
      })
    } catch (error) {
      console.error("Error updating quantity on server:", error)
    }
  }

  // Calculate total price with or without discount
  const calculateTotal = () => {
    let total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    if (coupons.length > 0) {
      const discount = coupons.reduce((sum: number, coupon: Coupon) => sum + coupon.discountAmount, 0)
      total -= (total * discount) / 100

      console.log("Discount applied:", discount)

      // Save the discounted total and coupons to localStorage
      localStorage.setItem("discountedTotal", total.toFixed(2))
      localStorage.setItem("coupons", JSON.stringify(coupons))
    }

    return total.toFixed(2)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Cart</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : cartItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((cartItem) => (
              <li key={cartItem.cartItemId} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    {cartItem.product.imageUrl ? (
                      <img
                        src={cartItem.product.imageUrl || "/placeholder.svg"}
                        alt={cartItem.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{cartItem.product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">Price: ${cartItem.product.price}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 text-center w-10">{cartItem.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-medium text-gray-900">
                        ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(cartItem.cartItemId)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                      aria-label="Remove item"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Total</h3>
              <p className="text-2xl font-bold text-primary">
                ${discountedTotal ? discountedTotal.toFixed(2) : calculateTotal()}
              </p>
            </div>

            {coupons.length > 0 && <div className="mt-2 text-sm text-green-600">Discount applied</div>}

            <div className="mt-6">
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-md">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/shop">
          <button className="inline-flex items-center px-4 py-2 border border-primary text-primary bg-white hover:bg-primary/5 font-medium rounded-md transition-colors">
            Continue Shopping
          </button></Link>
        </div>
      )}
    </div>
  )
}

export default Cart

