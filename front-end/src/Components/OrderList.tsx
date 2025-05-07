"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { ShoppingBag, Package, AlertCircle, Loader2 } from "lucide-react"

interface Product {
  name: string
  price: number
  imageUrl: string
  productId: number
}

interface OrderItem {
  productId: number
  product: Product
  // Adding some typical order-related fields
  orderDate?: string
  status?: string
  quantity?: number
}

const OrderList: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderItems = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get("http://localhost:5190/api/Order")

        const orderData = response.data.$values || []
        const formattedOrderItems = orderData.map((item: any) => ({
          productId: item.id,
          product: {
            productId: item.id,
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl,
          },
          // Adding mock data for order-specific fields
          // In a real app, these would come from your API
          orderDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
          status: ["Delivered", "Shipped", "Processing", "Pending"][Math.floor(Math.random() * 4)],
          quantity: Math.floor(Math.random() * 3) + 1,
        }))

        setOrderItems(formattedOrderItems)
      } catch (error) {
        console.error("Error fetching order items: ", error)
        setError("Failed to load your orders. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderItems()
  }, [])

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      ) : orderItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {orderItems.map((orderItem) => (
              <li key={orderItem.productId} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {orderItem.product.imageUrl ? (
                      <img
                        src={orderItem.product.imageUrl || "/placeholder.svg"}
                        alt={orderItem.product.name}
                        className="w-24 h-24 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-md border border-gray-200">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 flex flex-col sm:flex-row justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium text-gray-900">{orderItem.product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Qty: {orderItem.quantity}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${(orderItem.product.price * (orderItem.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Order Date: {orderItem.orderDate ? formatDate(orderItem.orderDate) : "N/A"}
                      </div>
                    </div>

                    <div className="mt-2 sm:mt-0 flex flex-col items-start sm:items-end gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(orderItem.status || "")}`}
                      >
                        {orderItem.status}
                      </span>
                      <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-12 w-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderList

