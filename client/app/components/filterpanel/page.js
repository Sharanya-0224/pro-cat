'use client'
import React, { useState, useMemo } from "react";

export default function FilterPanel({ onFilter }) {
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(2000)

    function applyFilters() {
        onFilter({ category, price })
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md border border-purple-700  hover:bg-purple-400 transition"
            >
                <option value="">All Categories</option>
                <option value="Devices">Devices</option>
                <option value="Decors">Decors</option>
                <option value="Accessories">Accessories</option>
            </select>

            <div className="flex items-center gap-2 text-gray-300">
                <label htmlFor="price">Max Price:</label>
                <input
                    id="price"
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="accent-purple-500"
                />
                <span>₹{price}</span>
            </div>

            <button
                onClick={applyFilters}
                className="px-4 py-2 bg-purple-600 text-black rounded-md font-semibold hover:bg-purple-400 transition"
            >
                Apply
            </button>
        </div>
    )
}
