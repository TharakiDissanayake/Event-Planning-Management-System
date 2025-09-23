import React, { useState } from "react";
import closeIcon from "../assets/icons/close-icon.png";

const EventQuotation = ({ isOpen, onClose, eventData }) => {
  if (!isOpen || !eventData) return null;

  const calculateTotals = () => {
    const packagePrice = parseFloat(eventData.packagePrice) || 0;
    const offerDiscount = parseFloat(eventData.offerDiscount) || 0;
    
    // Calculate discount amount (assuming discount is in percentage)
    const discountAmount = (packagePrice * offerDiscount) / 100;
    const finalPrice = packagePrice - discountAmount;
    
    return {
      packagePrice,
      offerDiscount,
      discountAmount,
      finalPrice
    };
  };

  const totals = calculateTotals();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download functionality here
    console.log("Download quotation as PDF");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className="relative bg-white rounded-xl shadow-lg w-[600px] h-[700px] p-8 border-6 border-secondary flex flex-col z-10">
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
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Event Quotation
        </h2>

        {/* Quotation Details */}
        <div className="flex-1 space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-4">Event Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Identity Number:</span>
                <p className="text-gray-700">{eventData.identityNumber}</p>
              </div>
              <div>
                <span className="font-semibold">Event Name:</span>
                <p className="text-gray-700">{eventData.eventName}</p>
              </div>
              <div>
                <span className="font-semibold">Event Type:</span>
                <p className="text-gray-700">{eventData.eventType}</p>
              </div>
              <div>
                <span className="font-semibold">Event Date:</span>
                <p className="text-gray-700">{eventData.eventDate}</p>
              </div>
            </div>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-4">Pricing Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Package Price:</span>
                <span className="text-lg">${totals.packagePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Offer Discount:</span>
                <span className="text-lg text-green-600">{totals.offerDiscount}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Discount Amount:</span>
                <span className="text-lg text-green-600">-${totals.discountAmount.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total Price:</span>
                <span className="text-primary">${totals.finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>This quotation is valid for 30 days from the date of issue.</p>
            <p className="mt-2">Generated on: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrint}
            className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-600 transition"
          >
            Print
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition"
          >
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventQuotation;