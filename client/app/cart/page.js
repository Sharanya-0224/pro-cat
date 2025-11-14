'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import ProCard from "../components/product-card/page";
import getActiveUserId from "../../utils/user";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const userId = getActiveUserId();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.products || [];
        setCartItems(items);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, [userId]);

  const removeFromCart = async (productId) => {
    if (!productId) return;
    try {
      setRemovingId(productId);
      const res = await fetch(`http://localhost:5000/api/cart/${userId}/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.products || [];
      setCartItems(items);
    } catch (err) {
      console.error("Failed to remove item:", err);
    } finally {
      setRemovingId(null);
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`http://localhost:5000/api/cart/${userId}`, {
        method: "DELETE",
      });
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  return (
    <div data-theme="dark">
      <Navbar />
      <div className="flex justify-between items-center px-36 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-100">Your Cart</h1>
        {cartItems.length > 0 && (
          <Link href="/payment?mode=cart">
            <button 
              className="px-6 py-2 text-sm font-semibold text-white bg-purple-600 border border-purple-500 rounded-lg hover:bg-purple-700 transition">
              Buy All
            </button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-y-20 gap-x-28 py-14 px-36 place-items-centre">
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            const product = item.productId || item;
            const productId = product?._id || item._id;
            const price = typeof product?.cost === "number" ? `₹${product.cost}` : product?.cost;
            const actionLabel = removingId === productId ? "Removing..." : "Remove";
            return (
              <ProCard
                key={productId}
                _id={productId}
                userId={userId}
                image={product?.image}
                title={product?.title}
                description={product?.description}
                cost={price}
                actionLabel={actionLabel}
                onAction={() => removeFromCart(productId)}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
}
