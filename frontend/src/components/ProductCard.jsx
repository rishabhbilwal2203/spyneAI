

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
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

  return (
    <div
      key={product._id}
      className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
    >
      <div className="relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block transition-transform duration-300 ease-in-out group-hover:scale-110"
          src={product.images[currentImageIndex]}
        />
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 focus:outline-none"
          onClick={handlePrevImage}
        >
          <ChevronLeftIcon size={20} />
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 focus:outline-none"
          onClick={handleNextImage}
        >
          <ChevronRightIcon size={20} />
        </button>
      </div>
      <div className="mt-4" onClick={onClick}>
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          {product.tags[0]}
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          {product.title}
        </h2>
        <p className="mt-1">{product.description.slice(0, 200)}...</p>
      </div>
    </div>
  );
};

export default ProductCard;