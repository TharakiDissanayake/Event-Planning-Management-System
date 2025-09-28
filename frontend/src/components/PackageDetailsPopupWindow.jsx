import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";
import UpdatePackageDetails from "./UpdatePackageDetails";

const PackageDetailsPopupWindow = ({ isOpen, onClose, packageData, role }) => {
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
    console.log("Updated package data:", updatedData);
    setIsEditMode(false);
    // You can add API call here to save the data
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      // Handle delete logic here
      console.log("Deleting package:", packageData);
      // Add API call here to delete the package
      alert("Package deleted successfully!");
      onClose(); // Close the popup after deletion
    }
  };

  // If in edit mode, show the update component
  if (isEditMode) {
    return (
      <UpdatePackageDetails
        isOpen={isEditMode}
        onClose={handleCloseEdit}
        packageData={packageData}
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
        <h2 className="text-3xl font-bold text-center mb-8">
          Package Details
        </h2>

        {/* Details */}
        <div className="flex flex-col gap-7 text-lg">
          <div className="flex justify-between">
            <span className="font-semibold">Package Name:</span>
            <span className="border rounded px-2 py-1 w-48">{packageData?.name || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Category:</span>
            <span className="border rounded px-2 py-1 w-48">{packageData?.category || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Price:</span>
            <span className="border rounded px-2 py-1 w-48">{packageData?.price || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Capacity:</span>
            <span className="border rounded px-2 py-1 w-48">{packageData?.capacity || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Includes:</span>
            <span className="border rounded px-2 py-1 w-48">{packageData?.includes || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Event Categories:</span>
            <div className="w-48">
              {packageData?.eventCategories && Array.isArray(packageData.eventCategories) && packageData.eventCategories.length > 0 ? (
                <div className="flex flex-wrap gap-1 justify-end">
                  {packageData.eventCategories.map((category, index) => (
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
            <span className="font-semibold">Status:</span>
            <div className="w-48 flex justify-end">
              {packageData?.status ? (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  packageData.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {packageData.status}
                </span>
              ) : (
                <span className="border rounded px-2 py-1 w-full text-center">-</span>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Image:</span>
            {packageData?.image ? (
              <img
                src={packageData.image}
                alt="Package"
                className="w-32 h-24 object-cover rounded border"
                onError={(e) => {
                  console.log('Package popup image failed to load:', packageData.image);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : (
              <span className="border rounded px-2 py-1 w-48 text-center text-gray-500">No Image</span>
            )}
            {packageData?.image && (
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

export default PackageDetailsPopupWindow;
