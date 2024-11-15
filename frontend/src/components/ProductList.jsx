// import React, { useState } from 'react';

// const cars = [
//   { id: 1, category: "CATEGORY", name: "The Catalyzer", price: "$16.00", image: "https://dummyimage.com/420x260" },
//   { id: 2, category: "CATEGORY", name: "Shooting Stars", price: "$21.15", image: "https://dummyimage.com/421x261" },
//   { id: 3, category: "CATEGORY", name: "Neptune", price: "$12.00", image: "https://dummyimage.com/422x262" },
//   { id: 4, category: "CATEGORY", name: "The 400 Blows", price: "$18.40", image: "https://dummyimage.com/423x263" },
//   { id: 5, category: "CATEGORY", name: "The Catalyzer", price: "$16.00", image: "https://dummyimage.com/424x264" },
//   { id: 6, category: "CATEGORY", name: "Shooting Stars", price: "$21.15", image: "https://dummyimage.com/425x265" },
//   { id: 7, category: "CATEGORY", name: "Neptune", price: "$12.00", image: "https://dummyimage.com/427x267" },
//   { id: 8, category: "CATEGORY", name: "The 400 Blows", price: "$18.40", image: "https://dummyimage.com/428x268" },
// ];

// const products = [
//   {
//       _id: "6736ff178299da9a59c1d0a4",
//       title: "title",
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quas eos ullam illum aperiam officiis minus animi doloribus accusamus. Obcaecati aliquam pariatur quaerat ad distinctio odit necessitatibus expedita minima consectetur. Repellat deleniti at quia. Labore architecto ipsum placeat in velit perferendis ullam officiis vero saepe laborum cum, iure odit iste.',
//       tags: [
//           "car,company,hello"
//       ],
//       images: [
//           "https://res.cloudinary.com/dwdz6ucxl/image/upload/v1731658939/Cars/dclhusqlrhullnacf6jw.png",
//           "https://res.cloudinary.com/dwdz6ucxl/image/upload/v1731658938/Cars/hv2nctxv6schwnwosv7h.jpg"
//       ]
//   }
// ]

// const ProductList = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // Filter products based on the search term
//   const filteredProducts = products.filter(product =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <section className="text-gray-600 body-font">
//       <div className="container px-5 py-5 mx-auto">
//         <div className="flex flex-col items-center mb-10">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full lg:w-1/3 md:w-1/2 p-4 border border-gray-300 rounded mb-4"
//           />
//         </div>
//         <div className="flex flex-wrap -m-4">
//           {filteredProducts.map((product) => (
//             <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
//               <a className="block relative h-48 rounded overflow-hidden">
//                 <img
//                   alt="ecommerce"
//                   className="object-cover object-center w-full h-full block"
//                   src={product.images[0]}
//                 />
//               </a>
//               <div className="mt-4">
//                 <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.tags[0].split(",")[0]}</h3>
//                 <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
//                 <p className="mt-1">{product.description.split(' ').slice(0, 10).join(' ')}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch products from the API using axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars/`); // Replace with your API URL
        console.log(response.data.cars)
        setProducts(response.data.cars); // Assuming the API returns an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-1/3 md:w-1/2 p-4 border border-gray-300 rounded mb-4"
          />
        </div>
        <div className="flex flex-wrap -m-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={product.images[0]}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {product.tags[0]}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                <p className="mt-1">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
