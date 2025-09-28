import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";
import UpdateOfferDetails from "./UpdateOfferDetails";

const OfferDetaiPopup = ({ isOpen, onClose, offerData, role }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  if (!isOpen) return null;

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = () => {
    setIsEditMode(false);
  };

  const handleSave = (updatedData) => {
    // Handle save logic here
    console.log("Updated offer data:", updatedData);
    setIsEditMode(false);
    // You can add API call here to save the data
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      // Handle delete logic here
      console.log("Deleting offer:", offerData);
      // Add API call here to delete the offer
      alert("Offer deleted successfully!");
      onClose(); // Close the popup after deletion
    }
  };

  // If in edit mode, show the update component
  if (isEditMode) {
    return (
      <UpdateOfferDetails
        isOpen={isEditMode}
        onClose={handleCloseEdit}
        offerData={offerData}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
        <h2 className="text-3xl font-bold text-center mb-6">
          Offer Details
        </h2>

        {/* Details */}
        <div className="flex flex-col gap-7 text-lg">
          <div className="flex justify-between">
            <span className="font-semibold">Offer Name:</span>
            <span className="border rounded px-2 py-1 w-48">{offerData?.name || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Discount:</span>
            <span className="border rounded px-2 py-1 w-48">{offerData?.discount || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Start Date:</span>
            <span className="border rounded px-2 py-1 w-48">{offerData?.startDate || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">End Date:</span>
            <span className="border rounded px-2 py-1 w-48">{offerData?.endDate || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Package Categories:</span>
            <div className="w-48">
              {offerData?.packageCategories && Array.isArray(offerData.packageCategories) && offerData.packageCategories.length > 0 ? (
                <div className="flex flex-wrap gap-1 justify-end">
                  {offerData.packageCategories.map((category, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="border rounded px-2 py-1 w-full text-center text-gray-500">No Categories</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Event Categories:</span>
            <div className="w-48">
              {offerData?.eventCategories && Array.isArray(offerData.eventCategories) && offerData.eventCategories.length > 0 ? (
                <div className="flex flex-wrap gap-1 justify-end">
                  {offerData.eventCategories.map((category, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="border rounded px-2 py-1 w-full text-center text-gray-500">No Categories</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Description:</span>
            <div className="w-48">
              <span className="border rounded px-2 py-1 w-full block text-sm max-h-20 overflow-y-auto">
                {offerData?.description || "No description available"}
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <div className="w-48 flex justify-end">
              {offerData?.status ? (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  offerData.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {offerData.status}
                </span>
              ) : (
                <span className="border rounded px-2 py-1 w-full text-center">-</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Image:</span>
            {offerData?.image ? (
              <img
                src={offerData.image}
                alt="Offer"
                className="w-32 h-24 object-cover rounded border"
                onError={(e) => {
                  console.log('Offer popup image failed to load:', offerData.image);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : (
              <span className="border rounded px-2 py-1 w-48 text-center text-gray-500">No Image</span>
            )}
            {offerData?.image && (
              <span className="border rounded px-2 py-1 w-48 text-center text-gray-500" style={{display: 'none'}}>Image not available</span>
            )}
          </div>
        </div>
        
        {/* Delete and Edit Buttons - Only for Admin */}
        {role === "admin" && (
          <div className="flex justify-between mt-8 gap-4">
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              onClick={handleEditClick}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold text-lg hover:bg-primary/80 transition"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferDetaiPopup;
