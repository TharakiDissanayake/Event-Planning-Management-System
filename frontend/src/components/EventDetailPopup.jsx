import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";
import UpdateEventDetails from "./UpdateEventDetails";
import Swal from "sweetalert2";

// Helper function to get package display value with enhanced fallbacks
const getPackageDisplay = (eventData) => {
  if (!eventData) return "-";
  
  // First check: Special property we set in Home.jsx
  if (eventData._packageName) {
    console.log("Found package name in _packageName special property:", eventData._packageName);
    return eventData._packageName;
  }
  
  // Second check: Standard property
  if (eventData.packageName) {
    console.log("Found package name in standard property:", eventData.packageName);
    return eventData.packageName;
  }
  
  // Third check: Package object
  if (eventData.package) {
    if (typeof eventData.package === 'object' && eventData.package !== null) {
      if (eventData.package.packageName) {
        console.log("Found package name in package.packageName:", eventData.package.packageName);
        return eventData.package.packageName;
      }
      if (eventData.package.name) {
        console.log("Found package name in package.name:", eventData.package.name);
        return eventData.package.name;
      }
      
      // Deep search within package object
      for (const key in eventData.package) {
        if (typeof eventData.package[key] === 'object' && eventData.package[key] !== null) {
          if (eventData.package[key].packageName) {
            console.log("Found package name in package nested property:", eventData.package[key].packageName);
            return eventData.package[key].packageName;
          }
          if (eventData.package[key].name) {
            console.log("Found package name in package nested property:", eventData.package[key].name);
            return eventData.package[key].name;
          }
        }
      }
    }
    
    if (typeof eventData.package === 'string') {
      console.log("Package is a string value:", eventData.package);
      return eventData.package;
    }
    
    return "Package object (no name found)";
  }
  
  // Fourth check: packageId object
  if (eventData.packageId) {
    if (typeof eventData.packageId === 'object' && eventData.packageId !== null) {
      if (eventData.packageId.packageName) {
        console.log("Found package name in packageId.packageName:", eventData.packageId.packageName);
        return eventData.packageId.packageName;
      }
      if (eventData.packageId.name) {
        console.log("Found package name in packageId.name:", eventData.packageId.name);
        return eventData.packageId.name;
      }
      
      // Try to find packageName within nested objects
      for (const key in eventData.packageId) {
        if (typeof eventData.packageId[key] === 'object' && eventData.packageId[key] !== null) {
          if (eventData.packageId[key].packageName) {
            console.log("Found package name in nested packageId property:", eventData.packageId[key].packageName);
            return eventData.packageId[key].packageName;
          }
          if (eventData.packageId[key].name) {
            console.log("Found package name in nested packageId property:", eventData.packageId[key].name);
            return eventData.packageId[key].name;
          }
        }
      }
      
      // If no name is found, try not to show the full object
      return "Package #" + (eventData.packageId.id || "Unknown");
    }
    
    if (typeof eventData.packageId === 'number' || typeof eventData.packageId === 'string') {
      console.log("PackageId is a simple value:", eventData.packageId);
      return "Package #" + eventData.packageId;
    }
  }
  
  // Final fallback
  console.log("No package name found using any method");
  return "-";
};

// Helper function to get offer display value with enhanced fallbacks
const getOfferDisplay = (eventData) => {
  if (!eventData) return "-";
  
  // First check: Special property we set in Home.jsx
  if (eventData._offerName) {
    console.log("Found offer name in _offerName special property:", eventData._offerName);
    return eventData._offerName;
  }
  
  // Second check: Standard property
  if (eventData.offerName) {
    console.log("Found offer name in standard property:", eventData.offerName);
    return eventData.offerName;
  }
  
  // Third check: Offer object
  if (eventData.offer) {
    if (typeof eventData.offer === 'object' && eventData.offer !== null) {
      if (eventData.offer.offerName) {
        console.log("Found offer name in offer.offerName:", eventData.offer.offerName);
        return eventData.offer.offerName;
      }
      if (eventData.offer.name) {
        console.log("Found offer name in offer.name:", eventData.offer.name);
        return eventData.offer.name;
      }
      
      // Deep search within offer object
      for (const key in eventData.offer) {
        if (typeof eventData.offer[key] === 'object' && eventData.offer[key] !== null) {
          if (eventData.offer[key].offerName) {
            console.log("Found offer name in offer nested property:", eventData.offer[key].offerName);
            return eventData.offer[key].offerName;
          }
          if (eventData.offer[key].name) {
            console.log("Found offer name in offer nested property:", eventData.offer[key].name);
            return eventData.offer[key].name;
          }
        }
      }
    }
    
    if (typeof eventData.offer === 'string') {
      console.log("Offer is a string value:", eventData.offer);
      return eventData.offer;
    }
    
    return "Offer object (no name found)";
  }
  
  // Fourth check: offerId object
  if (eventData.offerId) {
    if (typeof eventData.offerId === 'object' && eventData.offerId !== null) {
      if (eventData.offerId.offerName) {
        console.log("Found offer name in offerId.offerName:", eventData.offerId.offerName);
        return eventData.offerId.offerName;
      }
      if (eventData.offerId.name) {
        console.log("Found offer name in offerId.name:", eventData.offerId.name);
        return eventData.offerId.name;
      }
      
      // Try to find offerName within nested objects
      for (const key in eventData.offerId) {
        if (typeof eventData.offerId[key] === 'object' && eventData.offerId[key] !== null) {
          if (eventData.offerId[key].offerName) {
            console.log("Found offer name in nested offerId property:", eventData.offerId[key].offerName);
            return eventData.offerId[key].offerName;
          }
          if (eventData.offerId[key].name) {
            console.log("Found offer name in nested offerId property:", eventData.offerId[key].name);
            return eventData.offerId[key].name;
          }
        }
      }
      
      // If no name is found, try not to show the full object
      return "Offer #" + (eventData.offerId.id || "Unknown");
    }
    
    if (typeof eventData.offerId === 'number' || typeof eventData.offerId === 'string') {
      console.log("OfferId is a simple value:", eventData.offerId);
      return "Offer #" + eventData.offerId;
    }
  }
  
  // Final fallback
  console.log("No offer name found using any method");
  return "-";
};

const EventDetailPopup = ({ isOpen, onClose, eventData, role, onEventUpdated }) => {
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
    console.log("Closing edit mode");
    setIsEditMode(false);
  };

  const handleSave = async (updatedData) => {
    try {
      console.log("Event update data received from form:", updatedData);
      
      // Import and use eventService to update the event
      const eventService = (await import('../services/eventService')).eventService;
      
      // Make API call to update the event
      await eventService.updateEvent(updatedData.eventId, updatedData);
      console.log("Event update successful via API call");
      
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Event updated successfully!',
        confirmButtonColor: '#6d28d9',
      });
      
      setIsEditMode(false);
      
      // Call the onEventUpdated callback if provided to refresh the events list
      if (typeof onEventUpdated === 'function') {
        console.log("Calling onEventUpdated to refresh events list");
        onEventUpdated();
      }
      
      // If onClose is provided, call it to close the popup
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      console.error("Error finalizing event update:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update event. Please try again.',
        confirmButtonColor: '#6d28d9',
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this event?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6d28d9',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (result.isConfirmed) {
      try {
        // Import eventService for API calls
        const eventService = (await import('../services/eventService')).eventService;
        
        console.log("Deleting event with ID:", eventData.eventId);
        
        // Make API call to delete the event
        await eventService.deleteEvent(eventData.eventId);
        console.log("Event deleted successfully via API call");
        
        // Call the onEventUpdated callback if provided to refresh the events list
        if (typeof onEventUpdated === 'function') {
          console.log("Calling onEventUpdated to refresh events list after deletion");
          onEventUpdated();
        }
        
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Event deleted successfully!',
          confirmButtonColor: '#6d28d9',
        });
        
        // Close the popup
        if (typeof onClose === 'function') {
          onClose();
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete the event. Please try again.',
          confirmButtonColor: '#6d28d9',
        });
      }
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
                  title={getPackageDisplay(eventData) || "No package selected"}>
              <span className="bg-primary text-white px-1.5 py-0.5 rounded mr-1 text-xs">
                Package
              </span>
              <span className="truncate">
                {getPackageDisplay(eventData) || "Not specified"}
              </span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Offer:</span>
            <span className="border rounded px-2 py-1 w-48 truncate flex items-center" 
                  title={getOfferDisplay(eventData) || "No offer selected"}>
              <span className="bg-secondary text-white px-1.5 py-0.5 rounded mr-1 text-xs">
                Offer
              </span>
              <span className="truncate">
                {getOfferDisplay(eventData) || "Not specified"}
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
