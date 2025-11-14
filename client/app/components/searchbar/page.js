'use client';
import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // send query back to parent
    };

    return (
        <div className="flex justify-center my-4 ">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search products..."
                className="w-full max-w-md px-4 py-2 rounded-lg border border-purple-700 focus:outline-none focus:ring-2  focus:ring-purple-500 focus:border-transparent text-gray-500 hover:text-gray-400"
            />
        </div>
    );
}
