import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";

const UpdatePackageDetails = ({ isOpen, onClose, packageData, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    name: packageData?.name || "",
    category: packageData?.category || "",
    price: packageData?.price || "",
    capacity: packageData?.capacity || "",
    includes: packageData?.includes || "",
    status: packageData?.status || "Active",
    eventCategories: packageData?.eventCategories || [],
    image: packageData?.image || "",
    newImageFile: null, // Track new image file
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
        image: imageURL,
        newImageFile: file // Store the actual file for upload
      }));
    }
  };

  const handleEventCategoryChange = (category) => {
    setFormData(prev => {
      const currentCategories = prev.eventCategories || [];
      const isSelected = currentCategories.includes(category);
      
      if (isSelected) {
        // Remove category
        return {
          ...prev,
          eventCategories: currentCategories.filter(cat => cat !== category)
        };
      } else {
        // Add category
        return {
          ...prev,
          eventCategories: [...currentCategories, category]
        };
      }
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="relative bg-white rounded-xl shadow-lg w-[500px] max-h-[90vh] p-8 border-6 border-secondary flex flex-col z-10 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 z-20 disabled:opacity-50"
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
        <div className="flex flex-col gap-5 text-lg">
          {/* Package Name */}
          <div className="flex justify-between">
            <span className="font-semibold">Package Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className="border rounded px-2 py-1 w-48 bg-gray-100 disabled:opacity-50"
              readOnly
            />
          </div>
          
          {/* Category */}
          <div className="flex justify-between">
            <span className="font-semibold">Category:</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={isLoading}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="PLATINAM">Platinum Package</option>
              <option value="GOLD">Gold Package</option>
              <option value="SILVER">Silver Package</option>
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
              disabled={isLoading}
              placeholder="e.g., $1000"
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
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
              disabled={isLoading}
              placeholder="e.g., 100"
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>
          
          {/* Includes */}
          <div className="flex justify-between">
            <span className="font-semibold">Includes:</span>
            <textarea
              name="includes"
              value={formData.includes}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="e.g., Decoration, Catering, Music"
              className="border rounded px-2 py-1 w-48 h-16 resize-none focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>
          
          {/* Status */}
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              disabled={isLoading}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Event Categories */}
          <div className="flex justify-between">
            <span className="font-semibold">Event Categories:</span>
            <div className="w-48 max-h-32 overflow-y-auto border rounded p-2">
              {[
                'WEDDING',
                'ENGAGEMENT_PARTY', 
                'BIRTHDAY_PARTY',
                'ANNEVASARY_CELEBRATION',
                'CORPARATE_MEETING',
                'CONFERENCE_SEMINAR'
              ].map((category) => (
                <label key={category} className="flex items-center mb-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.eventCategories?.includes(category) || false}
                    onChange={() => handleEventCategoryChange(category)}
                    disabled={isLoading}
                    className="mr-2"
                  />
                  <span className="text-sm">
                    {category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">Image:</span>
            <div className="w-48">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
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
                    className={`absolute inset-0 bg-white bg-opacity-50 text-black text-xs flex items-center justify-center rounded cursor-pointer opacity-0 hover:opacity-100 transition-opacity ${
                      isLoading ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  >
                    {isLoading ? 'Uploading...' : 'Change Image'}
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="package-image-upload"
                  className={`block border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 text-center text-sm ${
                    isLoading ? 'cursor-not-allowed opacity-50 bg-gray-100' : ''
                  }`}
                >
                  {isLoading ? 'Loading...' : 'Choose Image'}
                </label>
              )}
            </div>
          </div>
        </div>
        
        {/* Save and Cancel Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-lg hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Updating...
              </div>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePackageDetails;