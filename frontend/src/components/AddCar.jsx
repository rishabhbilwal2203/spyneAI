

import React, { useState, useEffect } from 'react';
import { Input, Upload, Button, Tag, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const AddCar = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [fileList, setFileList] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If token exists, navigate to the home page
      navigate('/login');
    }
  }, [navigate]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleTagChange = (e) => {
    const newTags = e.target.value.split(',').map(tag => tag.trim());
    setTags(newTags);
  };

  const handleImageUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async () => {
    if (!title || !description || tags.length === 0 || fileList.length === 0) {
      message.error('Please fill in all fields and upload images.');
      return;
    }

    // Prepare the form data to send to the API
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags); // Store tags as a JSON string
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj); // Attach files to the form data
    });

    

    try {
      // Call the API to submit the data
      console.log(formData);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessary for file uploads
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        message.success('Form submitted successfully!');
        // Optionally, reset the form fields after successful submission
        setTitle('');
        setDescription('');
        setTags([]);
        setFileList([]);
      } else {
        message.error('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      message.error('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="p-8 border rounded-lg shadow-xl max-w-4xl mx-auto bg-white">
      <Title level={2} className="text-center mb-6 text-gray-800">Upload Car</Title>

      {/* Title Field */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">Title</label>
        <Input
          placeholder="Enter car title"
          value={title}
          onChange={handleTitleChange}
          maxLength={50}
          className="mt-2 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <div className="text-right text-sm text-gray-500">{title.length}/50</div>
      </div>

      {/* Description Field */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">Description</label>
        <Input.TextArea
          placeholder="Enter car description"
          value={description}
          onChange={handleDescriptionChange}
          maxLength={500}
          rows={4}
          className="mt-2 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <div className="text-right text-sm text-gray-500">{description.length}/500</div>
      </div>

      {/* Tags Field */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">Tags</label>
        <Input
          placeholder="Enter tags (comma separated)"
          value={tags.join(', ')}
          onChange={handleTagChange}
          className="mt-2 rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <div className="flex flex-wrap mt-2 gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} color="blue" className="text-sm">{tag}</Tag>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium">Upload Photos</label>
        <Upload
          multiple
          listType="picture-card"
          fileList={fileList}
          onChange={handleImageUploadChange}
          beforeUpload={() => false} // Prevent auto upload
          className="w-full mt-11"
        >
          <div className="text-center p-4 border border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300">
            <UploadOutlined className="text-2xl text-blue-500" />
            <div className="mt-2 text-sm">Upload a file</div>
            <small className="text-gray-500">Drag and drop files here</small>
          </div>
        </Upload>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button type="primary" onClick={handleSubmit} className="w-32 h-12 mt-8 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-md">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddCar;




