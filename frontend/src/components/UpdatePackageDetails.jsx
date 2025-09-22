import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";

const UpdatePackageDetails = ({ isOpen, onClose, packageData, onSave }) => {
  const [formData, setFormData] = useState({
    name: packageData?.name || "",
    category: packageData?.category || "",
    price: packageData?.price || "",
    hall: packageData?.hall || "",
    capacity: packageData?.capacity || "",
    includes: packageData?.includes || "",
    status: packageData?.status || "",
    image: packageData?.image || "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for preview
      const imageURL = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: imageURL
      }));
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="relative bg-white rounded-xl shadow-lg w-[500px] h-[700px] p-8 border-6 border-secondary flex flex-col z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <img
            src={closeIcon}
            alt="Close Icon"
            className="w-6 h-6"
          />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Update Package Details
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-5 text-lg flex-1">
          {/* Package Name */}
          <div className="flex justify-between">
            <span className="font-semibold">Package Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Category */}
          <div className="flex justify-between">
            <span className="font-semibold">Category:</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Event Package">Event Package</option>
              <option value="Wedding Package">Wedding Package</option>
              <option value="Corporate Package">Corporate Package</option>
              <option value="Birthday Package">Birthday Package</option>
            </select>
          </div>
          
          {/* Price */}
          <div className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., $1000"
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Hall */}
          <div className="flex justify-between">
            <span className="font-semibold">Hall:</span>
            <input
              type="text"
              name="hall"
              value={formData.hall}
              onChange={handleInputChange}
              placeholder="e.g., Grand Ballroom"
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Capacity */}
          <div className="flex justify-between">
            <span className="font-semibold">Capacity:</span>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              placeholder="e.g., 100"
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Includes */}
          <div className="flex justify-between">
            <span className="font-semibold">Includes:</span>
            <textarea
              name="includes"
              value={formData.includes}
              onChange={handleInputChange}
              placeholder="e.g., Decoration, Catering, Music"
              className="border rounded px-2 py-1 w-48 h-16 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Status */}
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>
          
          {/* Image Upload */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">Image:</span>
            <div className="w-48">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="package-image-upload"
              />
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Package Preview"
                    className="w-full h-16 object-cover rounded"
                  />
                  <label
                    htmlFor="package-image-upload"
                    className="absolute inset-0 bg-white bg-opacity-50 text-black text-xs flex items-center justify-center rounded cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  >
                    Change Image
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="package-image-upload"
                  className="block border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 text-center text-sm"
                >
                  Choose Image
                </label>
              )}
            </div>
          </div>
        </div>
        
        {/* Save and Cancel Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-lg hover:bg-primary/80 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePackageDetails;