import React, { useState } from "react";
import { customerService } from "../services/customerService";
import { useAuth } from "../contexts/AuthContext";
import EditCustomerForm from "./EditCustomerForm";

const CheckCustomerForm = () => {
  const { user } = useAuth();
  const [identityNumber, setIdentityNumber] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleCheck = async () => {
    if (!identityNumber.trim()) {
      setError("Please enter an Identity Number");
      return;
    }

    setLoading(true);
    setError("");
    setCustomerData(null);

    try {
      const response = await customerService.getCustomerById(identityNumber);
      console.log('API Response:', response); // Debug log
      if (response && response.data) {
        console.log('Customer Data:', response.data); // Debug log
        // API returns customer data in the data field
        setCustomerData(response.data);
      } else {
        console.log('No customer data found in response'); // Debug log
        setError("Customer not found with this Identity Number");
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
      console.log('Error status:', error.response?.status);
      console.log('Error code:', error.code);
      console.log('Error data:', error.data);
      console.log('Error message:', error.message);
      
      // Handle different types of errors
      // Check for our custom error format first (from customerService)
      if (error.code === 404) {
        setError("Customer not found with this Identity Number");
      } else if (error.code === 401) {
        setError("Access denied. Please login again.");
      } else if (error.data && typeof error.data === 'string') {
        setError(error.data);
      } else if (error.response?.status === 404) {
        setError("Customer not found with this Identity Number");
      } else if (error.response?.status === 401) {
        setError("Access denied. Please login again.");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (typeof error === 'string') {
        setError(error);
      } else {
        setError("Failed to fetch customer details. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIdentityNumber("");
    setCustomerData(null);
    setError("");
  };

  const handleEdit = () => {
    setShowEditPopup(true);
  };

  const handleEditSuccess = async () => {
    // Refresh customer data after successful edit
    if (identityNumber) {
      await handleCheck();
    }
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 w-[800px]">
      {/* <h2 className="text-3xl font-bold text-center mb-8">Check Customer</h2> */}

      {/* Identity Number Input */}
      <div className="mb-6">
        <div className="grid grid-cols-3 gap-4 items-center mb-4">
          <label className="text-lg font-semibold text-gray-700">Identity Number:</label>
          <input
            type="text"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            placeholder="Enter Identity Number"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className="bg-purple-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-600 transition disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Customer Details */}
      {customerData && (
        <div className="border-t pt-6">
          <h3 className="text-2xl font-bold mb-6 text-center">Customer Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Customer ID:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.customerId}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.customerName}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.customerEmail}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Contact Number 1:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.contactNumber1}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Contact Number 2:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.contactNumber2}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.address}</span>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      {customerData && (
        <div className="flex justify-between mt-8">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition"
          >
            Reset
          </button>
          <button
            onClick={handleEdit}
            className="bg-purple-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition"
          >
            Edit
          </button>
        </div>
      )}

      {/* Reset Button for Error State */}
      {error && !customerData && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>
      )}
      
      {/* Edit Customer Popup */}
      <EditCustomerForm
        isOpen={showEditPopup}
        onClose={handleCloseEditPopup}
        customerData={customerData}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default CheckCustomerForm;