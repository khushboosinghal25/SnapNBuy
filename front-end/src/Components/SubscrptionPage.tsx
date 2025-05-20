import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCoupons } from '../context/CouponsContext';
import { CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface Coupon {
  code: string;
  discountAmount: number;
}

const SubscriptionPage: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUserCoupons, coupons } = useCoupons();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(userData.subscriptionTier === 'Premium');
  const userId = userData.id;

  const handleSubscribe = async (subscriptionData: any) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5190/api/Subscription/subscribe', subscriptionData);
      
      console.log(response.data.coupons);
      setUserCoupons(response.data.coupons.$values);

      setIsSubscribed(true);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...userData,
          subscriptionTier: 'Premium',
        })
      );
      navigate('/cart');
    } catch (err) {
      setError('Failed to subscribe. Please check your payment details and try again.');
      console.error('Error during subscription:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Your Subscription Status</h2>
      
      {isSubscribed ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-2xl font-semibold mb-4">Congratulations, you're a Premium Member!</h3>
          <p className="text-gray-600 mb-6">Enjoy the following coupons and discounts:</p>
          
          <div className="grid gap-4 max-w-md mx-auto">
            {coupons.map((coupon: Coupon, index: number) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 flex justify-between items-center"
              >
                <span className="font-mono font-bold text-primary">{coupon.code}</span>
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {coupon.discountAmount}% off
                </span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/cart')} 
            className="mt-8 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Go to Cart
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary/5 p-6 border-b border-primary/10">
            <h3 className="text-xl font-semibold text-center">Subscribe to Premium</h3>
          </div>
          
          <div className="p-6">
            <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-700">
                Get exclusive discounts, free shipping, and early access to new products.
              </p>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const subscriptionData = { userId, tier: 'Premium' };
                handleSubscribe(subscriptionData);
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="4242 4242 4242 4242" 
                    required
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      required
                      className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">CVC</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    required
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Subscribe Now - $9.99/month'
                  )}
                </button>
              </div>
            </form>
            
            {error && (
              <div className="mt-4 bg-red-50 border-l-4 border-red-400 p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            <p className="mt-6 text-xs text-center text-gray-500">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
              You can cancel your subscription at any time.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
