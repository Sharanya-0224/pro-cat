'use client'
import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../components/navbar/page";
import ProCard from "../components/product-card/page";
import FilterPanel from "../components/filterpanel/page";
import SearchBar from "../components/searchbar/page";
import getActiveUserId from "../../utils/user";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: "", price: 2000 });
  const [searchQuery, setSearchQuery] = useState('');
  const [addingStates, setAddingStates] = useState({});
  const userId = getActiveUserId();

  const handleAddingChange = (productId, isAdding) => {
    setAddingStates(prev => ({
      ...prev,
      [productId]: isAdding
    }));
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/home");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
     
    return products.filter((product) => {
      const matchCategory =
        !filters.category || product.category === filters.category;
      const matchPrice = product.cost <= filters.price;
      const matchSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchPrice && matchSearch;
    });
  }, [products, filters]);

  return (
    <div data-theme="dark">
      <header>
        <Navbar />
        <div className="flex gap-14 p-3 justify-center">
          <SearchBar onSearch={setSearchQuery}/>
          <FilterPanel onFilter={setFilters} />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-y-20 gap-x-28 py-14 px-36 place-items-centre">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProCard
              key={product._id}
              _id={product._id}
              userId={userId}
              image={product.image}
              title={product.title}
              description={product.description}
              cost={`₹${product.cost}`}
              isAdding={addingStates[product._id] || false}
              onAddingChange={(isAdding) => handleAddingChange(product._id, isAdding)}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
