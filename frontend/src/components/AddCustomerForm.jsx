import React, { useState, useRef } from "react";
import { customerService } from "../services/customerService";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const AddCustomerForm = () => {
    const { user } = useAuth();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        customerId: "",
        customerName: "",
        customerEmail: "",
        contactNumber1: "",
        contactNumber2: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear message when user starts typing
        if (message.text) {
            setMessage({ type: '', text: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await customerService.createCustomer(formData);
            
            // Show success alert using SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Customer added successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#8B5CF6', // Purple color to match your theme
                timer: 3000, // Auto close after 3 seconds
                timerProgressBar: true,
                toast: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            
            // Reset form after successful submission
            handleCancel();
        } catch (error) {
            console.error('Error creating customer:', error);
            
            // Check if it's a duplicate customer ID error - handle various error structures
            if (error && typeof error === 'object') {
                // Handle StandardResponse structure from backend
                if (error.data && typeof error.data === 'string' && error.data.includes('already exists')) {
                    setMessage({ 
                        type: 'error', 
                        text: 'This identity number already exists in the system. Please use a different ID.' 
                    });
                    return;
                }
                
                // Handle unwrapped message from backend
                if (error.message && typeof error.message === 'string' && error.message.includes('already exists')) {
                    setMessage({ 
                        type: 'error', 
                        text: 'This identity number already exists in the system. Please use a different ID.' 
                    });
                    return;
                }
                
                // If there's any message in the error object, use it
                if (error.message) {
                    setMessage({ 
                        type: 'error', 
                        text: error.message
                    });
                    return;
                }
            }
            
            // Default error message
            setMessage({ 
                type: 'error', 
                text: 'Failed to add customer. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            customerId: "",
            customerName: "",
            customerEmail: "",
            contactNumber1: "",
            contactNumber2: "",
            address: "",
        });
        setMessage({ type: '', text: '' });

        // Reset the file input using ref
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-white shadow-md p-8 w-[1200px]">
            <h2 className="text-3xl font-bold text-center mb-8">Customer Details</h2>

            {/* Note: Success messages are now handled by SweetAlert2 */}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer ID */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">
                        Customer ID:
                    </label>
                    <input
                        type="number"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        min="1"
                        required
                    />
                </div>

                {/* Customer Name */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">
                        Customer Name:
                    </label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />
                </div>

                {/* Email */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />
                </div>

                {/* Contact Number 1*/}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Contact Number 1:</label>
                    <input
                        type="tel"
                        name="contactNumber1"
                        value={formData.contactNumber1}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        required
                    />
                </div>
                {/* Contact Number 2*/}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Contact Number 2:</label>
                    <input
                        type="tel"
                        name="contactNumber2"
                        value={formData.contactNumber2}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        required
                    />
                </div>

                {/* Address */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Address:</label>
                    <div className="flex flex-col">
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                            required
                        />
                        
                        {/* Error Message - displayed below address field */}
                        {message.text && message.type === 'error' && (
                            <div className="mt-2 p-2 rounded-md text-left text-sm bg-red-100 text-red-800 border border-red-300">
                                {message.text}
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomerForm;
