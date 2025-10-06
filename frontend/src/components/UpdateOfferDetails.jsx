import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";
import Swal from "sweetalert2";

const UpdateOfferDetails = ({ isOpen, onClose, offerData, onSave }) => {
  // Pure string-based date formatter for YYYY-MM-DD or YYYY/MM/DD
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    // If format is 'YYYY-MM-DD HH:mm:ss.SSSSSS', extract the date part
    const dateOnlyMatch = dateStr.match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateOnlyMatch) {
      return dateOnlyMatch[1];
    }
    // Accept YYYY-MM-DD or YYYY/MM/DD
    const match = dateStr.match(/^(\d{4})[-\/](\d{2})[-\/](\d{2})$/);
    if (match) {
      // Always return as YYYY-MM-DD
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    // If not matched, try to extract numbers manually
    const nums = dateStr.match(/\d+/g);
    if (nums && nums.length >= 3) {
      // MM/DD/YYYY format
      if (nums[2].length === 4 && nums[0].length <= 2 && nums[1].length <= 2) {
        return `${nums[2]}-${nums[0].padStart(2, '0')}-${nums[1].padStart(2, '0')}`;
      }
      // If string starts with year (4 digits), use that order
      if (nums[0].length === 4) {
        return `${nums[0]}-${nums[1].padStart(2, '0')}-${nums[2].padStart(2, '0')}`;
      }
      // Otherwise, fallback to year at the end (e.g. DD-MM-YYYY)
      if (nums[2].length === 4) {
        return `${nums[2]}-${nums[1].padStart(2, '0')}-${nums[0].padStart(2, '0')}`;
      }
    }
    return "";
  };

  const [formData, setFormData] = useState({
  name: offerData?.name || "",
  category: offerData?.category || "",
  discount: offerData?.discount || "",
  description: offerData?.description || "",
  startDate: formatDate(offerData?.startDate),
  endDate: formatDate(offerData?.endDate),
  status: offerData?.status || "",
  image: offerData?.image || "",
  packageCategories: offerData?.packageCategories || [],
  eventCategories: offerData?.eventCategories || [],
  newImageFile: null,
  });

  // Update formData when offerData changes
  React.useEffect(() => {
  console.log('Raw endDate value:', offerData?.endDate);
    setFormData({
      name: offerData?.name || "",
      category: offerData?.category || "",
      discount: offerData?.discount || "",
      description: offerData?.description || "",
      startDate: formatDate(offerData?.startDate),
      endDate: formatDate(offerData?.endDate),
      status: offerData?.status || "",
      image: offerData?.image || "",
      packageCategories: offerData?.packageCategories || [],
      eventCategories: offerData?.eventCategories || [],
      imageFile: null,
    });
  }, [offerData]);

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
      const imageURL = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: imageURL,
        newImageFile: file // Store the actual file for upload
      }));
    }
  };
  // Checkbox change handler for categories
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
      const arr = Array.isArray(prev[name]) ? prev[name] : [];
      if (checked) {
        return { ...prev, [name]: [...arr, value] };
      } else {
        return { ...prev, [name]: arr.filter((v) => v !== value) };
      }
    });
  };

  // Handle save: prepare data for update and pass to parent
  const handleSave = () => {
    const payload = {
      name: formData.name,
      discount: formData.discount,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      packageCategories: formData.packageCategories,
      eventCategories: formData.eventCategories,
      status: formData.status,
      image: formData.image,
      imageFile: formData.newImageFile // Pass the file for upload in parent component
    };
    
    // Validate required fields
    if (!payload.name || !payload.discount || !payload.description || 
        !payload.startDate || !payload.endDate || !payload.status) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields',
        confirmButtonColor: '#6d28d9',
      });
      return;
    }
    
    // Validate at least one category selected
    if (payload.packageCategories.length === 0 || payload.eventCategories.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please select at least one package category and one event category',
        confirmButtonColor: '#6d28d9',
      });
      return;
    }
    
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="relative bg-white rounded-xl shadow-lg w-[500px] max-h-[90vh] p-8 border-6 border-secondary flex flex-col z-10 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 z-20"
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

          {/* Package Category */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-lg font-semibold text-gray-700">Package Category:</label>
            <div className="space-y-2">
              {[
                { value: "PLATINAM", label: "Platinum" },
                { value: "GOLD", label: "Gold" },
                { value: "SILVER", label: "Silver" }
              ].map((packageType) => (
                <label key={packageType.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="packageCategories"
                    value={packageType.value}
                    checked={formData.packageCategories.includes(packageType.value)}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700">{packageType.label}</span>
                </label>
              ))}
              {formData.packageCategories.length === 0 && (
                <p className="text-sm text-red-500 mt-1">Please select at least one package type</p>
              )}
            </div>
          </div>

          {/* Event Category */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-lg font-semibold text-gray-700">Event Category:</label>
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
                    name="eventCategories"
                    value={eventType.value}
                    checked={formData.eventCategories.includes(eventType.value)}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-sm text-gray-700">{eventType.label}</span>
                </label>
              ))}
              {formData.eventCategories.length === 0 && (
                <p className="text-sm text-red-500 mt-1">Please select at least one event type</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex justify-between">
            <span className="font-semibold">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Offer description..."
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
              <option value="Expired">Expired</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>

          {/* Image Upload
          <div className="flex flex-col gap-2">
            <span className="font-semibold">Image:</span>
            <div className="flex gap-4 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="offer-image-upload"
                className="block"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Offer Preview"
                  className="w-24 h-16 object-cover rounded border"
                />
              )}
            </div>
          </div> */}

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