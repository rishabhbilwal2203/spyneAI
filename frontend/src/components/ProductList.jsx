import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.cars); // Assuming the API returns an array of cars
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [navigate]);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-col items-center mb-10">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-1/3 md:w-1/2 p-4 border border-gray-300 rounded mb-4"
          />
        </div>
        <div className="flex flex-wrap -m-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => navigate(`/product/${product._id}`, { state: { product } })}
              />
            ))
          ) : (
            <div className="text-center w-full py-10">
              <p className="text-gray-500 text-lg">No cars available. Why not add one?</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductList;

