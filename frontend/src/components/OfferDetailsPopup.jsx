import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";
import UpdateOfferDetails from "./UpdateOfferDetails";
import offerService from "../services/offerService";

const OfferDetaiPopup = ({ isOpen, onClose, offerData, role, onUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  if (!isOpen) return null;

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = () => {
    setIsEditMode(false);
  };

  const handleSave = async (updatedData) => {
    // Debug: log offerData to verify ID and updated data
    console.log('OfferData for update:', offerData);
    console.log('Updated data from form:', updatedData);
    
    // Try common ID keys
    const offerId = offerData?.id || offerData?.offerId || offerData?.offer_id;
    if (!offerId) {
      alert('Error: Offer ID is missing. Cannot update offer.');
      return;
    }
    
    try {
      // Map form data to API format expected by backend
      const updatePayload = {
        offerName: updatedData.name,
        offerDiscount: updatedData.discount.replace(/\D/g, ''), // Remove all non-digits (including %)
        offerDescription: updatedData.description,
        startDate: updatedData.startDate,
        endDate: updatedData.endDate,
        packageCategories: updatedData.packageCategories || [],
        eventCategories: updatedData.eventCategories || [],
        offerStatus: updatedData.status === 'Active', // Convert to boolean
        offerImage: null // Will be set below
      };
      
      // Handle image
      if (updatedData.imageFile) {
        // Upload new image first
        try {
          const imageResponse = await offerService.uploadImage(updatedData.imageFile);
          console.log('Image upload response:', imageResponse);
          
          // Make sure we have a valid filename from the response
          if (imageResponse && (imageResponse.url || imageResponse.filename)) {
            // Prefer the URL path if available, otherwise use the filename
            updatePayload.offerImage = imageResponse.url || ('/uploads/' + (imageResponse.filename || imageResponse.fileName));
            console.log('Setting image from upload:', updatePayload.offerImage);
          } else {
            throw new Error('Invalid image upload response');
          }
        } catch (imageError) {
          console.error('Image upload failed:', imageError);
          alert('Image upload failed, but other details will be updated.');
          // Keep current image if upload fails
          if (updatedData.image) {
            // If it's a full URL, extract the path part
            if (updatedData.image.includes('http://localhost:8082')) {
              // Keep the /uploads/ part in the path
              const pathPart = updatedData.image.split('http://localhost:8082')[1];
              updatePayload.offerImage = pathPart;
              console.log('Extracted image path from URL:', updatePayload.offerImage);
            } else {
              updatePayload.offerImage = updatedData.image;
              console.log('Using existing image path:', updatePayload.offerImage);
            }
          }
        }
      } else if (updatedData.image) {
        // Keep existing image - extract path from URL if needed
        if (updatedData.image.includes('http://localhost:8082')) {
          // Keep the /uploads/ part in the path
          const pathPart = updatedData.image.split('http://localhost:8082')[1];
          updatePayload.offerImage = pathPart;
          console.log('Extracted image path from URL:', updatePayload.offerImage);
        } else {
          updatePayload.offerImage = updatedData.image;
          console.log('Using existing image path:', updatePayload.offerImage);
        }
      }
      
      // Log the payload being sent for debugging
      console.log('Sending update payload:', updatePayload);
      
      // Update offer using service
      const result = await offerService.updateOffer(offerId, updatePayload);
      console.log('Update result:', result);
      
      // First refresh the data in the background
      if (onUpdate) {
        onUpdate();
      }
      
      // Show success alert and then close the popup when user clicks OK
      alert("Offer updated successfully!");
      
      // Reset edit mode and close the popup
      setIsEditMode(false);
      onClose(); // This will close the popup and return to the main view
    } catch (error) {
      console.error('Error updating offer:', error);
      
      // Check for authentication errors
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please log in again to continue.");
        // This will trigger the auth context to handle the redirect
        window.dispatchEvent(new CustomEvent('tokenExpired', {
          detail: { type: 'TOKEN_EXPIRED' }
        }));
      } else {
        // For other errors, show a more specific message
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
        alert("Error updating offer: " + errorMessage);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        const offerId = offerData?.id || offerData?.offerId || offerData?.offer_id;
        if (!offerId) {
          throw new Error('Offer ID not found');
        }
        
        console.log("Deleting offer:", offerData);
        await offerService.deleteOffer(offerId);
        
        alert("Offer deleted successfully!");
        
        // Refresh data if callback provided
        if (onUpdate) {
          onUpdate();
        }
        
        onClose(); // Close the popup after deletion
      } catch (error) {
        console.error('Error deleting offer:', error);
        
        // Check for authentication errors
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again to continue.");
          // This will trigger the auth context to handle the redirect
          window.dispatchEvent(new CustomEvent('tokenExpired', {
            detail: { type: 'TOKEN_EXPIRED' }
          }));
        } else {
          // For other errors, show a more specific message
          const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
          alert("Error deleting offer: " + errorMessage);
        }
      }
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
