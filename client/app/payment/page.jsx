"use client";  // This must be the very first line.

import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';  // Using Next.js routing.
import getActiveUserId from '../../utils/user';



export default function PaymentPage() {
  // All hooks must be inside the function body, like this:
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();  // Hook call is now inside the component.
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const singlePrice = searchParams.get('price');

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        if (mode === 'cart') {
          // Fetch cart and calculate total
          const userId = getActiveUserId();
          const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
          const data = await res.json();
          const items = Array.isArray(data) ? data : data.products || [];
          
          const total = items.reduce((sum, item) => {
            const product = item.productId || item;
            const price = parseFloat(String(product?.cost || 0).replace(/[^0-9.]/g, ''));
            return sum + price;
          }, 0);
          
          setTotalPrice(total);
        } else if (singlePrice) {
          // Single item
          const price = parseFloat(singlePrice.replace(/[^0-9.]/g, ''));
          setTotalPrice(price);
        }
      } catch (err) {
        console.error('Failed to fetch payment data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTotal();
  }, [mode, singlePrice]);

  const handleBackToHome = () => {
    router.push('/home');
  };

  const handleCompletePayment = async () => {
    try {
      const userId = getActiveUserId();
      // Delete the user's cart document from MongoDB
      await fetch(`http://localhost:5000/api/cart/${userId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
    // Simulate payment success
    alert('Payment successful!');
    router.push('/home');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-purple-300 rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Payments Page
        </h1>
        
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <img
                src="/images/qrcode.png"
                alt="Payment QR Code"
                className="w-48 h-48"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600 text-sm mb-2">Total Amount</p>
          <p className="text-4xl font-bold text-violet-600">
            {loading ? 'Loading...' : `₹${totalPrice.toFixed(2)}`}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCompletePayment}
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Complete Payment
          </button>
          <button
            onClick={handleBackToHome}
            className="flex-1 bg-neutral-400 hover:bg-neutral-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <ArrowLeft size={20} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}