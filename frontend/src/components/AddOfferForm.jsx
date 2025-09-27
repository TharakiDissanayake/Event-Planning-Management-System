import React, { useState, useRef } from "react";

const AddOfferForm = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    offerName: "",
    discountPercentage: "",
    startDate: "",
    endDate: "",
    packageCategory: [],
    eventCategory: [],
    offerDescription: "",
    offerStatus: true,
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
      offerName: "",
      discountPercentage: "",
      startDate: "",
      endDate: "",
      packageCategory: [],
      eventCategory: [],
      offerDescription: "",
      offerStatus: true,
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
              { value: "PLATINUM", label: "Platinum" },
              { value: "GOLD", label: "Gold" },
              { value: "SILVER", label: "Silver" }
            ].map((packageType) => (
              <label key={packageType.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="packageCategory"
                  value={packageType.value}
                  checked={formData.packageCategory.includes(packageType.value)}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-sm text-gray-700">{packageType.label}</span>
              </label>
            ))}
            {formData.packageCategory.length === 0 && (
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

        {/* Status Dropdown */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <label className="text-lg font-semibold text-gray-700">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOfferForm;
