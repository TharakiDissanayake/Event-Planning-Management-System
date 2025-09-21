import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";

const UpdateEventDetails = ({ isOpen, onClose, eventData, onSave }) => {
  const [formData, setFormData] = useState({
    eventType: eventData?.eventType || "",
    eventDate: eventData?.eventDate || "",
    status: eventData?.status || "",
    image: eventData?.image || "",
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for preview
      const imageURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageURL,
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
          <img src={closeIcon} alt="Close Icon" className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12">
          Update Event Details
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-7 text-lg flex-1">
          {/* Read-only fields */}
          <div className="flex justify-between">
            <span className="font-semibold">Identity Number:</span>
            <span className="border rounded px-2 py-1 w-48 bg-gray-100">
              {eventData?.customerId || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Customer Name:</span>
            <span className="border rounded px-2 py-1 w-48 bg-gray-100">
              {eventData?.customerName || "-"}
            </span>
          </div>

          {/* Editable fields */}
          <div className="flex justify-between">
            <span className="font-semibold">Event Type:</span>
            <input
              type="text"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Event Date:</span>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
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
                id="image-upload"
              />
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.image}
                    alt="Event Preview"
                    className="w-full h-16 object-cover rounded"
                  />
                  <label
                    htmlFor="image-upload"
                    className="absolute inset-0 bg-white bg-opacity-50 text-black text-xs flex items-center justify-center rounded cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  >
                    Change Image
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="block border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 text-center text-sm"
                >
                  Choose Image
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex gap-4 mt-8">
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

export default UpdateEventDetails;