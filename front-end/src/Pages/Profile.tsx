import React, { useState, useRef, useEffect } from 'react';
import { FaUserCircle, FaSignOutAlt, FaRegCalendarAlt, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  name: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const userData = JSON.parse(localStorage.getItem('userData') || '{}') as User;

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Get initials or first letter for avatar
  const getInitials = () => {
    if (userData && userData.name) {
      const nameParts = userData.name.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return userData.name.charAt(0).toUpperCase();
    }
    if (userData && userData.username) {
      return userData.username.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // If no user data, show login button
  if (!userData || !userData.username) {
    return (
      <button 
        onClick={() => navigate('/login')}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        aria-label="Login"
      >
        <FaUserCircle className="text-xl" />
      </button>
    );
  }

  return (
    <div className="relative" ref={profileRef}>
      {/* Profile Button/Avatar */}
      <button 
        onClick={toggleProfile}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        aria-label="Open profile menu"
        aria-expanded={isProfileOpen}
      >
        {getInitials()}
      </button>

      {/* Profile Dropdown */}
      <div 
        className={`absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 origin-top-right z-50 ${
          isProfileOpen 
            ? 'transform scale-100 opacity-100' 
            : 'transform scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header with background */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 font-bold text-lg shadow-sm">
              {getInitials()}
            </div>
            <div>
              <h3 className="font-medium text-lg">{userData.name || 'User'}</h3>
              <p className="text-sm text-blue-100">{userData.username}</p>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="p-4 bg-white">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-blue-500" />
              <span className="text-sm">{userData.username}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaRegCalendarAlt className="text-blue-500" />
              <span className="text-sm">Joined: {userData.name || 'N/A'}</span>
            </div>
          </div>
          
          {/* Divider */}
          <div className="my-3 border-t border-gray-200"></div>
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
