import React, { useState, useEffect, useCallback } from 'react';
import FeaturedProducts from '../Components/FeaturedProducts';
import TrendingNow from '../Components/TrendingNow';
import ProductList from '../Components/ProductList';
import axios from 'axios';
import { Product } from '../types/Products';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    rating: 0,
    priceRange: [0, 5000],
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const API_URL = 'http://localhost:5190/api/Product/';

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;

        if (Array.isArray(data.$values)) {
          setProducts(data.$values);
          setFeaturedProducts(data.$values.filter((product: Product) => product.rating >= 4.0));
          setTrendingProducts(data.$values.filter((product: Product) => product.rating >= 4.2));
        } else {
          console.error("Expected 'products' to be an array, but got:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters to the products
  const applyFilters = useCallback(() => {
    let filtered = [...products];

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((product: Product) =>
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product: Product) => product.rating >= filters.rating);
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product: Product) =>
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters]);

  // Reapply filters when dependencies change (search, filters)
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle search query input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'priceRange') {
      const priceValue = value.split(',').map((val) => parseInt(val, 10));
      setFilters((prev) => ({ ...prev, priceRange: priceValue }));
    } else if (name === 'rating') {
      setFilters((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Shop Our Products</h1>
          
          <div className="relative w-full md:w-96">
            <div className="relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              <input
                type="text"
                placeholder="Search for a product..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Filters - Desktop */}
        <div className="hidden md:flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Category:</span>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-[180px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="h-6 border-l border-gray-300 mx-2"></div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Rating:</span>
            <select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
              className="w-[180px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>All Ratings</option>
              <option value={3}>3 Stars & Up</option>
              <option value={4}>4 Stars & Up</option>
              <option value={4.5}>4.5 Stars & Up</option>
            </select>
          </div>

          <div className="h-6 border-l border-gray-300 mx-2"></div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price:</span>
            <select
              name="priceRange"
              value={filters.priceRange.join(',')}
              onChange={handleFilterChange}
              className="w-[180px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="0,1000">All Prices</option>
              <option value="0,50">$0 - $50</option>
              <option value="51,100">$51 - $100</option>
              <option value="101,200">$101 - $200</option>
              <option value="200,1000">$200+</option>
            </select>
          </div>
        </div>

        {/* Filters - Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleFilterMenu}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
              />
            </svg>
            <span>Filters</span>
          </button>
          
          {isFilterMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center sm:items-center p-4">
              <div className="bg-white rounded-t-lg sm:rounded-lg w-full max-w-md max-h-[80vh] overflow-auto">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Filter Products</h3>
                    <button 
                      onClick={toggleFilterMenu}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M6 18L18 6M6 6l12 12" 
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Narrow down your product search with these filters.
                  </p>
                </div>
                
                <div className="p-4 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Category</h3>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Categories</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Minimum Rating</h3>
                    <select
                      name="rating"
                      value={filters.rating}
                      onChange={handleFilterChange}
                      className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={0}>All Ratings</option>
                      <option value={3}>3 Stars & Up</option>
                      <option value={4}>4 Stars & Up</option>
                      <option value={4.5}>4.5 Stars & Up</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <select
                      name="priceRange"
                      value={filters.priceRange.join(',')}
                      onChange={handleFilterChange}
                      className="w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="0,1000">All Prices</option>
                      <option value="0,50">$0 - $50</option>
                      <option value="51,100">$51 - $100</option>
                      <option value="101,200">$101 - $200</option>
                      <option value="200,1000">$200+</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={toggleFilterMenu}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Results */}
        <div className="space-y-8">
          {/* Main Product List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Products</h2>
              <p className="text-sm text-gray-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            <ProductList products={Array.isArray(filteredProducts) ? filteredProducts : []} />
          </div>

          {/* Featured Products Section */}
          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
            <FeaturedProducts featuredProducts={Array.isArray(featuredProducts) ? featuredProducts : []} />
          </div>

          {/* Trending Now Section */}
          <div className="pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
            <TrendingNow trendingProducts={Array.isArray(trendingProducts) ? trendingProducts : []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
