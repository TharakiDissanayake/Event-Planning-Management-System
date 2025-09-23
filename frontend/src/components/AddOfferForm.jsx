import React, { useState, useRef } from "react";

const AddOfferForm = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    discount: "",
    description: "",
    startdate: "",
    enddate: "",
    status: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      category: "",
      discount: "",
      description: "",
      startdate: "",
      enddate: "",
      status: "",
      image: null,
    });

    // Reset the file input using ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white shadow-md p-8 w-[1200px]">
      <h2 className="text-3xl font-bold text-center mb-8">Offer Details</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Name */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">
            Offer Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Category Dropdown */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Category</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="corporate">Corporate</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Discount:</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Description */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        {/* Start Date */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Start Date:</label>
          <input
            type="date"
            name="startdate"
            value={formData.startdate}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* End Date */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">End Date:</label>
          <input
            type="date"
            name="enddate"
            value={formData.enddate}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Status Dropdown */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Image:</label>
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition"
          >
            Save Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOfferForm;
