import React, { useState } from "react";

const CheckCustomerForm = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sample customer data (replace with API call)
  const sampleCustomers = [
    {
      id: "123456789",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1-234-567-8900",
      address: "123 Main Street, City, State 12345",
      registeredDate: "2024-01-15",
      totalEvents: 5,
      status: "Active"
    },
    {
      id: "987654321",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1-098-765-4321",
      address: "456 Oak Avenue, Town, State 54321",
      registeredDate: "2024-03-20",
      totalEvents: 2,
      status: "Active"
    }
  ];

  const handleCheck = () => {
    if (!identityNumber.trim()) {
      setError("Please enter an Identity Number");
      return;
    }

    setLoading(true);
    setError("");
    setCustomerData(null);

    // Simulate API call
    setTimeout(() => {
      const customer = sampleCustomers.find(c => c.id === identityNumber);
      if (customer) {
        setCustomerData(customer);
      } else {
        setError("Customer not found with this Identity Number");
      }
      setLoading(false);
    }, 1000);
  };

  const handleReset = () => {
    setIdentityNumber("");
    setCustomerData(null);
    setError("");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-8 w-[800px]">
      <h2 className="text-3xl font-bold text-center mb-8">Check Customer</h2>

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
              <span className="font-semibold text-gray-700">Identity Number:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.id}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Phone:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.phone}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.address}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Registered Date:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.registeredDate}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Total Events:</span>
              <span className="border rounded px-3 py-2 bg-gray-50">{customerData.totalEvents}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className={`border rounded px-3 py-2 ${customerData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {customerData.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      {(customerData || error) && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckCustomerForm;