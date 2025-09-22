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
          Package Details
        </h2>

        {/* Details */}
        <div className="flex flex-col gap-7 text-lg flex-1">
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
            <span className="font-semibold">Hall:</span>
            <span className="border rounded px-2 py-1 w-48">{packageData?.hall || "-"}</span>
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
            <span className="font-semibold">Status:</span>
            <span className="border rounded px-2 py-1 w-48">{packageData?.status || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Image:</span>
            {packageData?.image ? (
              <img
                src={packageData.image}
                alt="Package"
                className="w-24 h-16 object-cover rounded"
              />
            ) : (
              <span className="border rounded px-2 py-1 w-48">-</span>
            )}
          </div>
        </div>
        {/* Edit Button for Admin */}
        {role === "admin" && (
          <button
            onClick={handleEditClick}
            className="mt-8 w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg hover:bg-primary/80 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PackageDetailsPopupWindow;
