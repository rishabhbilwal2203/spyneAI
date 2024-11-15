import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  
  // Fetch products from the API
  useEffect(() => {
    
      // Check if the token is in localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        // If token exists, navigate to the home page
        navigate('/login');
      }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProducts(response.data.cars); // Assuming the API returns an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, [navigate]);
  
  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
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
          {filteredProducts.map((product) => (
            // <div 
            //   key={product._id} 
            //   className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer"
            //   onClick={() => navigate(`/product/${product._id}`, { state: { product } })} // Pass product as state
            // >
            //   <a className="block relative h-48 rounded overflow-hidden">
            //     <img
            //       alt="ecommerce"
            //       className="object-cover object-center w-full h-full block"
            //       src={product.images[0]}
            //     />
            //   </a>
            //   <div className="mt-4">
            //     <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            //       {product.tags[0]}
            //     </h3>
            //     <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
            //     <p className="mt-1">{product.description}</p>
            //   </div>
            // </div>
            <ProductCard key={product._id} product={product} onClick={() => navigate(`/product/${product._id}`, { state: { product } })} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;

