'use client';
import React, {useState} from "react";
import Link from "next/link";import {User,ShoppingCart} from "lucide-react";


export default function Navbar() {
  return (
    <header className = "bg-purple-300 border-b border-gray-700"> 
      <div className="max-w-8xl mx-auto p-4 flex items-center justify-between">
        {/* placeholder for api calls */}
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/file.png" alt="logo" className="w-12 h-12 rounded-full object-cover"/> {/*logo image -- set img size and stuff accordingly*/}
          <span className="font-semibold text-lg bor text-purple-800 ">Pro-Cat Shoppers Guide Issms</span>
        </Link>
        <div className="flex items-center gap-6">
         <Link href = "/cart"> 
          <button className="p-2 rounded-full hover:bg-purple-100 transition">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
          </button></Link>
          <Link href = "/userpopup">
          <button className="p-2 rounded-full hover:bg-purple-100 transition">
            <User className="w-5 h-5 text-purple-600" />
          </button></Link>
        </div> 
      </div>
    </header>
  );
}