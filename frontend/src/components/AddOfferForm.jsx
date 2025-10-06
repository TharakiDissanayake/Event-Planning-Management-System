import React, { useState, useRef } from "react";
import { offerService } from "../services/offerService";

const AddOfferForm = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    offerName: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
    packageCategories: [],
    eventCategories: [],
    offerDescription: "",
    offerStatus: true, // true for active, false for inactive
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      if (name === "packageCategories" || name === "eventCategories") {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      let imageUrl = null;

      // Upload image first if selected
      if (selectedImage) {
        const uploadResponse = await offerService.uploadImage(selectedImage);
        if (uploadResponse.url) {
          imageUrl = uploadResponse.url;
        } else {
          setSubmitMessage("Failed to upload image. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare data for API call matching backend DTO structure
      const offerData = {
        offerName: formData.offerName,
        offerDiscount: parseInt(formData.discountPercentage),
        startDate: formData.startDate,
        endDate: formData.endDate,
        packageCategories: formData.packageCategories,
        eventCategories: formData.eventCategories,
        offerDescription: formData.offerDescription,
        offerImage: imageUrl,
        offerStatus: formData.offerStatus
      };

      const response = await offerService.saveOffer(offerData);
      
      if (response.code === 201) {
        setSubmitMessage("Offer created successfully!");
        handleCancel(); // Reset form after successful submission
      } else {
        setSubmitMessage("Failed to create offer. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting offer:", error);
      setSubmitMessage("Error creating offer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      offerName: "",
      discountPercentage: "",
      startDate: "",
      endDate: "",
      packageCategories: [],
      eventCategories: [],
      offerDescription: "",
      offerStatus: true,
    });
    setSubmitMessage("");
    setSelectedImage(null);
    setImagePreview(null);

    // Reset the file input using ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white shadow-md p-8 w-[1200px]">
      <h2 className="text-3xl font-bold text-center mb-8">Offer Details</h2>

      {submitMessage && (
        <div className={`mb-4 p-3 rounded-md text-center ${
          submitMessage.includes("successfully") 
            ? "bg-green-100 text-green-700 border border-green-400" 
            : "bg-red-100 text-red-700 border border-red-400"
        }`}>
          {submitMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Name */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">
            Offer Name:
          </label>
          <input
            type="text"
            name="offerName"
            value={formData.offerName}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        {/* Discount Percentage */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Discount Percentage:</label>
          <input
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

         {/* Start Date */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        {/* End Date */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
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

         {/*Event Category */}
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
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">
            Description:
          </label>
          <textarea
            name="offerDescription"
            value={formData.offerDescription}
            onChange={handleChange}
            rows="3"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        {/* Image Upload */}
        <div className="grid grid-cols-2 gap-4 items-start">
          <label className="text-lg font-semibold text-gray-700">
            Offer Image (Optional):
          </label>
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            {imagePreview && (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, GIF (Max size: 10MB)
            </p>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Status:</label>
          <select
            name="offerStatus"
            value={formData.offerStatus}
            onChange={(e) => setFormData({...formData, offerStatus: e.target.value === "true"})}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOfferForm;
