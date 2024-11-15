import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {}; // Access product from state

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!product) {
    return <p>Product not found!</p>;
  }

  const handleDelete = async () => {
    try {
      // Call the API to delete the product
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/cars/delete/${product._id}`);
      
      // Navigate back to the product list page
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete the product. Please try again.');
    }
  };

  const handleEdit = () => {
    // Navigate to the edit-car page, passing the product data in the state
    navigate(`/edit-car/${product._id}`, { state: { product } });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="relative lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          {/* Image Section */}
          <img
            className="object-cover object-center rounded"
            alt={product.title}
            src={product.images[currentImageIndex]}
          />
          
          {/* Previous Image Button */}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 focus:outline-none"
            onClick={handlePrevImage}
          >
            <ChevronLeftIcon size={20} />
          </button>
          
          {/* Next Image Button */}
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 focus:outline-none"
            onClick={handleNextImage}
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>

        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {product.title}
          </h1>
          <p className="mb-8 leading-relaxed">{product.description}</p>
          <div className="flex space-x-2">
            {product.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-sm border rounded">
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons Section */}
          <div className="flex justify-center my-8">
            <button
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              onClick={handleEdit} // Navigate to the edit-car page with the product in state
            >
              Edit
            </button>
            <button
              className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
              onClick={handleDelete} // Call handleDelete on click
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
