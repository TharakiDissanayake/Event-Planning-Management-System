import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";
import UpdateEventDetails from "./UpdateEventDetails";

// Helper function to get package display value with multiple fallbacks
const getPackageDisplay = (eventData) => {
  if (!eventData) return "-";
  
  // Try different ways to access package information
  if (eventData.packageName) return eventData.packageName;
  
  if (eventData.package) {
    if (typeof eventData.package === 'object' && eventData.package !== null) {
      if (eventData.package.packageName) return eventData.package.packageName;
      if (eventData.package.name) return eventData.package.name;
    }
    return eventData.package.toString();
  }
  
  if (eventData.packageId) {
    if (typeof eventData.packageId === 'object' && eventData.packageId !== null) {
      if (eventData.packageId.packageName) return eventData.packageId.packageName;
      if (eventData.packageId.name) return eventData.packageId.name;
      
      // Try to find packageName within nested objects
      for (const key in eventData.packageId) {
        if (typeof eventData.packageId[key] === 'object' && eventData.packageId[key] !== null) {
          if (eventData.packageId[key].packageName) {
            return eventData.packageId[key].packageName;
          }
          if (eventData.packageId[key].name) {
            return eventData.packageId[key].name;
          }
        }
      }
      
      // If no name is found, try not to show the full object
      return "Package #" + (eventData.packageId.id || "Unknown");
    }
    return eventData.packageId.toString();
  }
  
  return "-";
};

// Helper function to get offer display value with multiple fallbacks
const getOfferDisplay = (eventData) => {
  if (!eventData) return "-";
  
  // Try different ways to access offer information
  if (eventData.offerName) return eventData.offerName;
  
  if (eventData.offer) {
    if (typeof eventData.offer === 'object' && eventData.offer !== null) {
      if (eventData.offer.offerName) return eventData.offer.offerName;
      if (eventData.offer.name) return eventData.offer.name;
    }
    return eventData.offer.toString();
  }
  
  if (eventData.offerId) {
    if (typeof eventData.offerId === 'object' && eventData.offerId !== null) {
      if (eventData.offerId.offerName) return eventData.offerId.offerName;
      if (eventData.offerId.name) return eventData.offerId.name;
      
      // Try to find offerName within nested objects
      for (const key in eventData.offerId) {
        if (typeof eventData.offerId[key] === 'object' && eventData.offerId[key] !== null) {
          if (eventData.offerId[key].offerName) {
            return eventData.offerId[key].offerName;
          }
          if (eventData.offerId[key].name) {
            return eventData.offerId[key].name;
          }
        }
      }
      
      // If no name is found, try not to show the full object
      return "Offer #" + (eventData.offerId.id || "Unknown");
    }
    return eventData.offerId.toString();
  }
  
  return "-";
};

const EventDetailPopup = ({ isOpen, onClose, eventData, role }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // Debug: Log eventData when component updates with detailed information
  React.useEffect(() => {
    if (eventData) {
      console.log("EventDetailPopup received data:", eventData);
      console.log("Event customerId:", eventData.customerId);
      console.log("Event customerName:", eventData.customerName);
      console.log("Event type:", eventData.eventType);
      
      // Now we should have explicit package and offer name properties
      console.log("Event packageId:", eventData.packageId);
      console.log("Event packageName:", eventData.packageName);
      
      console.log("Event offerId:", eventData.offerId);
      console.log("Event offerName:", eventData.offerName);
      
      // Add this to debug the raw structure
      if (typeof eventData === 'object') {
        console.log("Raw event data properties:", Object.keys(eventData));
      }
    }
  }, [eventData]);

  if (!isOpen) return null;

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCloseEdit = () => {
    setIsEditMode(false);
  };

  const handleSave = (updatedData) => {
    // Handle save logic here
    console.log("Updated event data:", updatedData);
    setIsEditMode(false);
    // You can add API call here to save the data
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      // Handle delete logic here
      console.log("Deleting event:", eventData);
      // Add API call here to delete the event
      alert("Event deleted successfully!");
      onClose(); // Close the popup after deletion
    }
  };

  // If in edit mode, show the update component
  if (isEditMode) {
    return (
      <UpdateEventDetails
        isOpen={isEditMode}
        onClose={handleCloseEdit}
        eventData={eventData}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="relative bg-white rounded-xl shadow-lg w-[500px] max-h-[95vh] p-4 border-6 border-secondary flex flex-col z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 z-10"
        >
          <img
            src={closeIcon}
            alt="Close Icon"
            className="w-6 h-6"
          />
        </button>

        {/* Title - Fixed at top */}
        <div className="sticky top-0 bg-white z-[5] pb-1">
          <h2 className="text-2xl font-bold text-center mb-2">
            Event Details
          </h2>
        </div>

        {/* Details - Added scrollbar */}
        <div className="flex flex-col gap-3 text-lg flex-1 overflow-y-auto pr-2 custom-scrollbar" style={{maxHeight: "calc(95vh - 160px)"}}>
          <div className="flex justify-between">
            <span className="font-semibold">Identity Number:</span>
            <span className="border rounded px-2 py-1 w-48" title={eventData?.customerId || ""}>{eventData?.customerId || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Customer Name:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.customerName || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Event Category:</span>
            <span className="border rounded px-2 py-1 w-48" title={eventData?.eventType || ""}>{eventData?.eventType || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Event Title:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.eventTitle || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Event Date:</span>
            <span className="border rounded px-2 py-1 w-48">
              {eventData?.eventDate 
                ? new Date(eventData.eventDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })
                : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Start Time:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.startTime || "-"}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="font-semibold">Description:</span>
            <span className="border rounded px-2 py-1 w-48 max-h-16 overflow-y-auto custom-scrollbar">
              {eventData?.description || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Package:</span>
            <span className="border rounded px-2 py-1 w-48 truncate flex items-center" 
                  title={eventData?.packageName || "No package selected"}>
              <span className="bg-primary text-white px-1.5 py-0.5 rounded mr-1 text-xs">
                Package
              </span>
              <span className="truncate">
                {eventData?.packageName || "Not specified"}
              </span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Offer:</span>
            <span className="border rounded px-2 py-1 w-48 truncate flex items-center" 
                  title={eventData?.offerName || "No offer selected"}>
              <span className="bg-secondary text-white px-1.5 py-0.5 rounded mr-1 text-xs">
                Offer
              </span>
              <span className="truncate">
                {eventData?.offerName || "Not specified"}
              </span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.status || "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Image:</span>
            <div className="border rounded w-48 p-1 h-16 flex items-center justify-center overflow-hidden">
              {eventData?.image ? (
                <img
                  src={
                    eventData.image.startsWith('/uploads/')
                      ? `http://localhost:8082${eventData.image}`
                      : eventData.image.startsWith('http')
                        ? eventData.image
                        : `http://localhost:8082/uploads/${eventData.image}`
                  }
                  alt="Event"
                  className="max-h-full object-contain"
                  onError={(e) => {
                    console.log('Image failed to load:', eventData.image);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'inline';
                  }}
                />
              ) : (
                <span className="text-gray-400 text-sm">No image</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Delete and Edit Buttons - Fixed at bottom */}
        <div className="flex justify-between mt-3 gap-4 pt-2 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded-xl font-semibold text-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={handleEditClick}
            className="flex-1 bg-primary text-white py-2 rounded-xl font-semibold text-lg hover:bg-primary/80 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPopup;
