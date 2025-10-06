import React, { useState, useEffect } from "react";
import closeIcon from "../assets/icons/close-icon.png";
import { packageService } from "../services/packageService";
import { offerService } from "../services/offerService";

const UpdateEventDetails = ({ isOpen, onClose, eventData, onSave }) => {
  const [packages, setPackages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  
  // Process the image URL for proper display
  const processImageUrl = (imageUrl) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith('/uploads/')) {
      return `http://localhost:8082${imageUrl}`;
    } else if (imageUrl.startsWith('http')) {
      return imageUrl;
    } else {
      return `http://localhost:8082/uploads/${imageUrl}`;
    }
  };
  
  // Fetch packages and offers when component mounts
  useEffect(() => {
    if (isOpen) {
      fetchPackages();
      fetchOffers();
    }
  }, [isOpen]);
  
  // Fetch all available packages
  const fetchPackages = async () => {
    try {
      setIsLoadingPackages(true);
      const response = await packageService.getAllPackages();
      console.log("Fetched packages:", response);
      if (response && response.data) {
        // Handle different response formats
        let packagesList = [];
        if (Array.isArray(response.data)) {
          packagesList = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          packagesList = response.data.data;
        }
        
        // Process the packages to ensure we can access packageId and packageName consistently
        const processedPackages = packagesList.map(pkg => {
          // Create a standardized package object
          return {
            packageId: pkg.packageId || pkg.id,
            packageName: pkg.packageName || pkg.name || `Package #${pkg.packageId || pkg.id}`
          };
        });
        
        console.log("Processed packages for dropdown:", processedPackages);
        setPackages(processedPackages);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setIsLoadingPackages(false);
    }
  };
  
  // Fetch all available offers
  const fetchOffers = async () => {
    try {
      setIsLoadingOffers(true);
      const response = await offerService.getAllOffers();
      console.log("Fetched offers:", response);
      if (response && response.data) {
        // Handle different response formats
        let offersList = [];
        if (Array.isArray(response.data)) {
          offersList = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          offersList = response.data.data;
        }
        
        // Process the offers to ensure we can access offerId and offerName consistently
        const processedOffers = offersList.map(offer => {
          // Create a standardized offer object
          return {
            offerId: offer.offerId || offer.id,
            offerName: offer.offerName || offer.name || `Offer #${offer.offerId || offer.id}`
          };
        });
        
        console.log("Processed offers for dropdown:", processedOffers);
        setOffers(processedOffers);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setIsLoadingOffers(false);
    }
  };

  // Use useEffect to update the form data when eventData changes
  const [formData, setFormData] = useState({
    eventTitle: eventData?.eventTitle || "",
    eventDate: eventData?.eventDate || "",
    startTime: eventData?.startTime || "",
    description: eventData?.description || "",
    status: eventData?.status || "PENDING",
    image: eventData?.image || eventData?.eventImage || "",
    imageUrl: processImageUrl(eventData?.image || eventData?.eventImage) || "",
  });
  
  // Update form data when eventData changes
  useEffect(() => {
    if (eventData) {
      setFormData({
        eventTitle: eventData.eventTitle || "",
        eventDate: eventData.eventDate || "",
        startTime: eventData.startTime || "",
        description: eventData.description || "",
        status: eventData.status || "PENDING",
        image: eventData.image || eventData.eventImage || "",
        imageUrl: processImageUrl(eventData.image || eventData.eventImage) || "",
      });
    }
  }, [eventData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for preview
      const imageURL = URL.createObjectURL(file);
      
      // Store both the file object and the preview URL
      setFormData((prev) => ({
        ...prev,
        imageFile: file, // Store the file object for upload
        image: file.name, // Store the filename for backend
        imageUrl: imageURL, // Store the preview URL for display
      }));
    }
  };

  const handleSave = async () => {
    try {
      // Import eventService for API calls
      const eventService = (await import('../services/eventService')).eventService;
      
      // Handle image upload if there's a new image
      let imageFileName = formData.image;
      
      if (formData.imageFile) {
        console.log("Uploading new image file:", formData.imageFile.name);
        try {
          const uploadResponse = await eventService.uploadImage(formData.imageFile);
          console.log("Image upload response:", uploadResponse);
          
          // Extract the file URL or filename from the response
          if (uploadResponse) {
            if (uploadResponse.url) {
              // If the response contains a URL property
              imageFileName = uploadResponse.url;
              console.log("Using image URL from response:", imageFileName);
            } else if (uploadResponse.filename) {
              // If the response contains a filename property
              imageFileName = uploadResponse.filename;
              console.log("Using image filename from response:", imageFileName);
            } else if (typeof uploadResponse === 'string') {
              // If the response is a string directly
              imageFileName = uploadResponse;
              console.log("Using string response as image name:", imageFileName);
            } else if (uploadResponse.data) {
              // If response has a nested data property
              if (uploadResponse.data.url) {
                imageFileName = uploadResponse.data.url;
                console.log("Using nested URL from response.data:", imageFileName);
              } else if (uploadResponse.data.filename) {
                imageFileName = uploadResponse.data.filename;
                console.log("Using nested filename from response.data:", imageFileName);
              } else if (typeof uploadResponse.data === 'string') {
                imageFileName = uploadResponse.data;
                console.log("Using nested string from response.data:", imageFileName);
              }
            }
          }
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          // Continue with save even if image upload fails
        }
      }
      
      // Create a DTO matching the backend's RequestUpdateEventDTO structure
      const updateEventDTO = {
        eventTitle: formData.eventTitle,
        startTime: formData.startTime,
        description: formData.description,
        status: formData.status, // Backend expects this as an enum string
        eventImage: imageFileName
      };
      
      console.log("Saving updated event data:", updateEventDTO);
      
      // Make the API call directly
      await eventService.updateEvent(eventData.eventId, updateEventDTO);
      console.log("Event updated successfully");
      
      // Call the onSave function provided by the parent component for UI updates
      if (typeof onSave === 'function') {
        onSave({
          eventId: eventData.eventId,
          ...updateEventDTO
        });
      }
      
      // Show success message
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to update the event. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-10">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="relative bg-white rounded-xl shadow-lg w-[500px] max-h-[90vh] p-8 border-6 border-secondary flex flex-col z-10 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <img src={closeIcon} alt="Close Icon" className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12">
          Update Event Details
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-7 text-lg flex-1">
          {/* Read-only fields */}
          <div className="flex justify-between">
            <span className="font-semibold">Identity Number:</span>
            <span className="border rounded px-2 py-1 w-48 bg-gray-100">
              {eventData?.customerId || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Customer Name:</span>
            <span className="border rounded px-2 py-1 w-48 bg-gray-100">
              {eventData?.customerName || "-"}
            </span>
          </div>

          {/* Editable fields - only event title, start time, description, status and image */}
          <div className="flex justify-between">
            <span className="font-semibold">Event Category:</span>
            <span className="border rounded px-2 py-1 w-48 bg-gray-100">
              {eventData?.eventType || "-"}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Event Title:</span>
            <input
              type="text"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Event Date:</span>
            <span className="border rounded px-2 py-1 w-48 bg-gray-100">
              {eventData?.eventDate || "-"}
            </span>
          </div>
          
          {/* Start Time Field */}
          <div className="flex justify-between">
            <span className="font-semibold">Start Time:</span>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Description Field */}
          <div className="flex justify-between">
            <span className="font-semibold">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 h-20 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Event description..."
            />
          </div>
          
          {/* Package */}
          <div className="flex justify-between">
            <span className="font-semibold">Package:</span>
            <span className="border rounded px-2 py-1 w-48 bg-gray-100">
              {eventData?.packageName || "-"}
            </span>
          </div>
          
          {/* Offer */}
          <div className="flex justify-between">
            <span className="font-semibold">Offer:</span>
            <span className="border rounded px-2 py-1 w-48 bg-gray-100">
              {eventData?.offerName || "-"}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="COMPLETED">COMPLETED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="flex justify-between items-center">
            <span className="font-semibold">Image:</span>
            <div className="w-48">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              {formData.image ? (
                <div className="relative">
                  <img
                    src={formData.imageUrl || formData.image}
                    alt="Event Preview"
                    className="w-full h-16 object-cover rounded"
                    onError={(e) => {
                      console.log('Image failed to load:', formData.imageUrl || formData.image);
                      e.target.style.display = 'none';
                    }}
                  />
                  <label
                    htmlFor="image-upload"
                    className="absolute inset-0 bg-white bg-opacity-50 text-black text-xs flex items-center justify-center rounded cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  >
                    Change Image
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="block border rounded px-2 py-1 cursor-pointer hover:bg-gray-50 text-center text-sm"
                >
                  Choose Image
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex gap-4 mt-8">
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

export default UpdateEventDetails;