import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";

const UpdateOfferDetails = ({ isOpen, onClose, offerData, onSave }) => {
  const [formData, setFormData] = useState({
    name: offerData?.name || "",
    category: offerData?.category || "",
    discount: offerData?.discount || "",
    description: offerData?.description || "",
    startDate: offerData?.startDate || "",
    endDate: offerData?.endDate || "",
    status: offerData?.status || "",
    image: offerData?.image || "",
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
          Update Offer Details
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-5 text-lg flex-1">
          {/* Offer Name */}
          <div className="flex justify-between">
            <span className="font-semibold">Offer Name:</span>
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
              <option value="Event Offer">Event Offer</option>
              <option value="Package Offer">Package Offer</option>
              <option value="Seasonal Offer">Seasonal Offer</option>
              <option value="Limited Time Offer">Limited Time Offer</option>
            </select>
          </div>
          
          {/* Discount */}
          <div className="flex justify-between">
            <span className="font-semibold">Discount:</span>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="e.g., 10% or $50"
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Description
          <div className="flex justify-between">
            <span className="font-semibold">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Offer description..."
              className="border rounded px-2 py-1 w-48 h-16 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div> */}
          
          {/* Start Date */}
          <div className="flex justify-between">
            <span className="font-semibold">Start Date:</span>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* End Date */}
          <div className="flex justify-between">
            <span className="font-semibold">End Date:</span>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
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
              <option value="Expired">Expired</option>
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
                id="offer-image-upload"
              />
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Offer Preview"
                    className="w-full h-16 object-cover rounded"
                  />
                  <label
                    htmlFor="offer-image-upload"
                    className="absolute inset-0 bg-white bg-opacity-50 text-black text-xs flex items-center justify-center rounded cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  >
                    Change Image
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="offer-image-upload"
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

export default UpdateOfferDetails;