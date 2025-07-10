import React from 'react';
import { NavLink } from 'react-router';
import { Heart, MessageCircle, User, Flame } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-md border-t border-purple-900/50 px-4 py-3 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <NavLink
          to="/app/feed"
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-400 hover:text-purple-400'
            }`
          }
        >
          <Flame size={20} />
          <span className="text-xs font-medium">Discover</span>
        </NavLink>
        
        <NavLink
          to="/app/connections"
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-400 hover:text-purple-400'
            }`
          }
        >
          <MessageCircle size={20} />
          <span className="text-xs font-medium">Chat</span>
        </NavLink>
        
        <NavLink
          to="/app/requests"
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-400 hover:text-purple-400'
            }`
          }
        >
          <Heart size={20} />
          <span className="text-xs font-medium">Likes</span>
        </NavLink>
        
        <NavLink
          to="/app/profile"
          className={({ isActive }) =>
            `flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-400 hover:text-purple-400'
            }`
          }
        >
          <User size={20} />
          <span className="text-xs font-medium">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;