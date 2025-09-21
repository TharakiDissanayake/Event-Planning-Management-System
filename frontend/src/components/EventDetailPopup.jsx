import React from "react";
import closeIcon from "../assets/icons/close-icon.png";

const EventDetailPopup = ({ isOpen, onClose, eventData, role }) => {
  if (!isOpen) return null;

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
        <h2 className="text-3xl font-bold text-center mb-12">
          Event Details
        </h2>

        {/* Details */}
        <div className="flex flex-col gap-7 text-lg flex-1">
          <div className="flex justify-between">
            <span className="font-semibold">Identity Number:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.customerId || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Customer Name:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.customerName || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Event Type:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.eventType || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Event Date:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.eventDate || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className="border rounded px-2 py-1 w-48">{eventData?.status || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Image:</span>
            {eventData?.image ? (
              <img
                src={eventData.image}
                alt="Event"
                className="w-24 h-16 object-cover rounded"
              />
            ) : (
              <span className="border rounded px-2 py-1 w-48">-</span>
            )}
          </div>
        </div>
        {/* Edit Button */}
          <button
            className="mt-8 w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg hover:bg-primary/80 transition"
          >
            Edit
          </button>
      </div>
    </div>
  );
};

export default EventDetailPopup;
