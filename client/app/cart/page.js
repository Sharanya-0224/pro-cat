'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/page";
import ProCard from "../components/product-card/page";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = "6725f7c1b13d2d4a88e6a9f2"; // same as above for testing
        const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };
    fetchCart();
  }, []);

  return (
    <div data-theme="dark">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-y-20 gap-x-28 py-14 px-36 place-items-centre">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ProCard
              key={item.productId._id}
              image={item.productId.image}
              title={item.productId.title}
              description={item.productId.description}
              cost={`₹${item.productId.cost}`}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            Your cart is empty.
          </p>
        )}
      </div>
    </div>
  );
}
