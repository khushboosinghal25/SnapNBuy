import type React from "react"
import { Link } from "react-router-dom"

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">


      <main>
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Landing Page for <span className="text-blue-600">Products.</span>
                </h1>
                <p className="text-gray-600 md:text-xl max-w-[600px]">
                  Quality in a product or service is not what the supplier puts in. It is what the customer gets out and
                  is willing to pay for.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4"><Link to="/shop">
                  <button className="group flex items-center justify-center h-12 px-6 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                  
                    Explore Products
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button></Link>
                  
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-blue-100 to-white rounded-full flex items-center justify-center">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/social-media-2068/64/_shopping-512.png"
                    alt="Shopping Cart"
                    className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] object-contain animate-bounce-slow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Background decorations */}
          <div className="absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-100 blur-[100px]" />
          <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] rounded-full bg-blue-100 blur-[100px]" />
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-12">
              {/* Product Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                  <div className="h-[250px] flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg overflow-hidden">
                    <img
                      src="https://www.boat-lifestyle.com/cdn/shop/files/Artboard1_beacb070-dbc2-48e7-b50c-caf593482428.png?v=1708000375"
                      alt="Product 1"
                      className="h-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">Premium Headphones</h3>
                    <p className="text-gray-500 text-sm mt-1">Immersive sound experience</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                  <div className="h-[250px] flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg overflow-hidden">
                    <img
                      src="https://wallpapers.com/images/hd/android-wireless-charging-png-80-smze8eiu8fq49nyl.png"
                      alt="Product 3"
                      className="h-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">Wireless Charger</h3>
                    <p className="text-gray-500 text-sm mt-1">Fast and convenient charging</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                  <div className="h-[250px] flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg overflow-hidden">
                    <img
                      src="https://th.bing.com/th/id/R.d88fba714d703a2dd63d86f2d155acb0?rik=%2f6lrY7GuFxHQLQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ftv-hd-png-km0255uhd-0-png-km0255uhd-1-png-1200.png&ehk=KaPoTFpWXYJo7OmaUEsSkxB4eDIQDcPIYJArJ4AegBg%3d&risl=&pid=ImgRaw&r=0"
                      alt="Product 2"
                      className="h-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">Smart TV</h3>
                    <p className="text-gray-500 text-sm mt-1">Crystal clear 4K display</p>
                  </div>
                </div>
              </div>

              {/* About Text */}
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">About Our Products</h2>
                <p className="text-gray-600 md:text-lg">
                  Our products are designed with quality and functionality in mind. From cutting-edge technology to
                  everyday essentials, we ensure that each item is crafted to meet the needs of our customers. Whether
                  you're looking for the latest tech gadgets or practical lifestyle accessories, we have something for
                  everyone. Our focus is on providing innovative solutions that fit seamlessly into your daily life.
                </p>
                <Link to={"/shop"}>
                <button className="mt-4 h-12 px-6 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors">
                  View All Products
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Our Products</h2>
              <p className="text-gray-600 md:text-lg mt-2 max-w-2xl mx-auto">
                We pride ourselves on delivering exceptional quality and value with every product
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
                <p className="text-gray-500 text-sm">
                  All our products are made with the highest quality materials for durability and performance.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Innovative Design</h3>
                <p className="text-gray-500 text-sm">
                  Our products feature cutting-edge designs that combine aesthetics with functionality.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Customer Satisfaction</h3>
                <p className="text-gray-500 text-sm">
                  We prioritize customer satisfaction with excellent service and support.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Warranty Included</h3>
                <p className="text-gray-500 text-sm">
                  All products come with a comprehensive warranty for your peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Experience Our Products?</h2>
              <p className="text-gray-600 md:text-lg">
                Join thousands of satisfied customers who have transformed their lives with our innovative products.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link to="/shop">
                <button className="group flex items-center justify-center h-12 px-6 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Shop Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
                </Link>
               
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
   
    </div>
  )
}

export default Home

