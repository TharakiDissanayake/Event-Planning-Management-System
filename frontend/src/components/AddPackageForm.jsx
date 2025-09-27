import React, { useState, useRef, useEffect } from "react";
import { packageService } from "../services/packageService";
import { useAuth } from "../contexts/AuthContext";
import useFormPersistence from "../hooks/useFormPersistence";

const AddPackageForm = () => {
  const { user } = useAuth();
  const { saveFormData, restoreFormData, clearFormData } = useFormPersistence();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    packageName: "",
    packageCategory: "",
    capacity: "",
    includes: "",
    eventCategory: [], // Changed to array for multiple selections
    packagePrice: "",
    packageStatus: true, // Default to active
  });

  // Restore saved form data on mount
  useEffect(() => {
    const savedData = restoreFormData('packageForm');
    if (savedData) {
      setFormData(savedData);
      setMessage({ 
        type: 'info', 
        text: 'Your previous form data has been restored.' 
      });
    }
  }, [restoreFormData]);

  // Auto-save form data when it changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.packageName || formData.packageCategory || formData.capacity) {
        saveFormData('packageForm', formData);
      }
    }, 2000); // Save after 2 seconds of no changes

    return () => clearTimeout(timer);
  }, [formData, saveFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;
    
    // Handle boolean conversion for packageStatus
    if (name === "packageStatus") {
      processedValue = value === "true";
    }
    // Handle number conversion for capacity and price
    else if (name === "capacity" || name === "packagePrice") {
      processedValue = value === "" ? "" : parseInt(value);
    }
    // Handle checkbox array for eventCategory
    else if (name === "eventCategory" && type === "checkbox") {
      if (checked) {
        // Add to array if checked
        processedValue = [...formData.eventCategory, value];
      } else {
        // Remove from array if unchecked
        processedValue = formData.eventCategory.filter(item => item !== value);
      }
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });

    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validation: Ensure at least one event category is selected
    if (formData.eventCategory.length === 0) {
      setMessage({ 
        type: 'error', 
        text: 'Please select at least one event type.' 
      });
      setLoading(false);
      return;
    }

    try {
      // Prepare data for API
      const packageData = {
        packageName: formData.packageName,
        packageCategory: formData.packageCategory,
        capacity: parseInt(formData.capacity),
        includes: formData.includes,
        eventCategories: formData.eventCategory, // Send full array of selected categories
        packagePrice: parseInt(formData.packagePrice),
        packageStatus: formData.packageStatus
      };

      const response = await packageService.createPackage(packageData);
      setMessage({ 
        type: 'success', 
        text: 'Package created successfully!' 
      });
      
      // Clear saved form data on successful submission
      clearFormData('packageForm');
      
      // Reset form after successful submission
      handleCancel();
    } catch (error) {
      console.error('Error creating package:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || error.data || 'Failed to create package. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      packageName: "",
      packageCategory: "",
      capacity: "",
      includes: "",
      eventCategory: [], // Reset to empty array
      packagePrice: "",
      packageStatus: true,
    });
    setMessage({ type: '', text: '' });

    // Reset the file input using ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white shadow-md p-8 w-[1200px]">
      <h2 className="text-3xl font-bold text-center mb-8">Package Details</h2>

      {/* Success/Error Message */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-md text-center ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-300' 
            : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Name */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">
            Package Name:
          </label>
          <input
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        {/* Package Category Dropdown */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Package Category:</label>
          <select
            name="packageCategory"
            value={formData.packageCategory}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="">Select Category</option>
            <option value="PLATINAM">Platinum</option>
            <option value="GOLD">Gold</option>
            <option value="SILVER">Silver</option>
          </select>
        </div>

        {/* Capacity */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            min="1"
            required
          />
        </div>

        {/* Includes */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Includes:</label>
          <textarea
            name="includes"
            value={formData.includes}
            onChange={handleChange}
            rows="3"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            required
          />
        </div>

        {/* Event Type Checkboxes */}
        <div className="grid grid-cols-2 gap-4">
          <label className="text-lg font-semibold text-gray-700">Event Types:</label>
          <div className="space-y-2">
            {[
              { value: "WEDDING", label: "Wedding" },
              { value: "ENGAGEMENT_PARTY", label: "Engagement Party" },
              { value: "BIRTHDAY_PARTY", label: "Birthday Party" },
              { value: "ANNEVASARY_CELEBRATION", label: "Anniversary Celebration" },
              { value: "CORPARATE_MEETING", label: "Corporate Meeting" },
              { value: "CONFERENCE_SEMINAR", label: "Conference/Seminar" }
            ].map((eventType) => (
              <label key={eventType.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="eventCategory"
                  value={eventType.value}
                  checked={formData.eventCategory.includes(eventType.value)}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{eventType.label}</span>
              </label>
            ))}
            {formData.eventCategory.length === 0 && (
              <p className="text-sm text-red-500 mt-1">Please select at least one event type</p>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Price:</label>
          <input
            type="number"
            name="packagePrice"
            value={formData.packagePrice}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            min="0"
            required
          />
        </div>

        {/* Status Dropdown */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Status:</label>
          <select
            name="packageStatus"
            value={formData.packageStatus.toString()}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackageForm;
