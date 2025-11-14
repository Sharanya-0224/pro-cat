'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, ShoppingCart,Home } from "lucide-react";
import { auth } from "../../../utils/api";

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (err) {
          console.error('Failed to parse user data:', err);
        }
      }
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    try {
      auth.logout(); // Clears token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
      }
      setUser(null);
      setIsUserMenuOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-purple-300 border-b border-gray-700">
      <div className="max-w-8xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 px-25">
          <img src="/images/file.png" alt="logo" className="w-12 h-12 rounded-full object-cover" />
          <span className="font-semibold text-lg  text-purple-800">Pro-Cat</span>
        </Link>
        <div className="relative flex items-center gap-6 user-menu-container">
          <Link href="/home">
            <button className="p-2 rounded-full hover:bg-purple-100 transition" title="Home">
              <Home className="w-5 h-5 text-purple-600" />
            </button>
          </Link>
          <Link href="/cart">
            <button className="p-2 rounded-full hover:bg-purple-100 transition" title="Cart">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </button>
          </Link>
          <button
            className="p-2 rounded-full hover:bg-purple-100 transition"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            title="User Menu"
          >
            <User className="w-5 h-5 text-purple-600" />
          </button>
          
          {/* User menu popup */}
          {isUserMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-purple-200 border border-gray-200 rounded-lg shadow-lg p-4 z-50">
              {user ? (
                <>
                  {(user.name || user.username) && (
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Name:</strong> {user.name || user.username}
                    </p>
                  )}
                  {user.email && (
                    <p className="text-sm text-gray-700 mb-4">
                      <strong>Email:</strong> {user.email}
                    </p>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-gray-700 mb-4">Not logged in</p>
                  <Link href="/login">
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition">
                      Login
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}