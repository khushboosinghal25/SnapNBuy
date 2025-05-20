import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import ProfilePage from "../Pages/Profile";
import axios from 'axios';
import { useCoupons } from '../context/CouponsContext';

const Header: React.FC = () => {
  const navigate = useNavigate();

  // State for premium status and user email
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { setUserCoupons, coupons } = useCoupons();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userId = userData.id;

  // Fetch user data and update premium status and subscription tier
  useEffect(() => {
    const currentEmail = userData?.email;
    setUserEmail(currentEmail);
    setIsPremium(userData?.subscriptionTier == 'Premium'); // Set the premium status correctly
    console.log(userData);
  }, []); 
  
  // Navigate to subscription page
  const handlePremiumClick = () => {
    navigate("/subscribe");
  };

  // Update premium status in localStorage after subscription
  const handleSubscriptionUpdate = () => {
    const updatedUser = { ...userData, isPremium: true };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsPremium(true);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            SnapNBuy
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Products</Link>
          <Link to="/orderHistory" className="nav-link">Order History</Link>
          <Link to="/wishlist" className="nav-link flex items-center gap-1">
            <FaHeart className="text-xs" />
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors md:ml-2">
            <FaShoppingCart className="w-5 h-5" />
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/shop">
            <button className="hidden md:flex h-10 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow">
              Shop Now
            </button>
          </Link>

          {/* Go Premium Button */}
          {!isPremium ? (
            <button
              onClick={handlePremiumClick}
              className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-md text-sm font-medium hover:from-amber-600 hover:to-amber-700 transition-all shadow-sm hover:shadow"
            >
              <span className="text-amber-200">✦</span>
              <span>Go Premium</span>
            </button>
          ) : (
            <span className="text-green-500 font-medium">Premium</span>
          )}

          {/* Profile Component */}
          <div className="ml-2">
            <ProfilePage />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
