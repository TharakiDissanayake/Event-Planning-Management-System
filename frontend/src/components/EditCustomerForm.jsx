import React, { useState, useEffect } from "react";
import { customerService } from "../services/customerService";
import { useAuth } from "../contexts/AuthContext";
import closeIcon from "../assets/icons/close-icon.png";
import Swal from "sweetalert2";

const EditCustomerForm = ({ isOpen, onClose, customerData, onSuccess }) => {
    const { user } = useAuth();
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

    // Populate form with existing customer data
    useEffect(() => {
        if (customerData && isOpen) {
            setFormData({
                customerId: customerData.customerId || "",
                customerName: customerData.customerName || "",
                customerEmail: customerData.customerEmail || "",
                contactNumber1: customerData.contactNumber1 || "",
                contactNumber2: customerData.contactNumber2 || "",
                address: customerData.address || "",
            });
            // Clear any previous messages
            setMessage({ type: '', text: '' });
        }
    }, [customerData, isOpen]);

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
            // Prepare update data (excluding customerId and customerName)
            const updateData = {
                customerEmail: formData.customerEmail,
                contactNumber1: formData.contactNumber1,
                contactNumber2: formData.contactNumber2,
                address: formData.address,
            };

            const response = await customerService.updateCustomer(formData.customerId, updateData);
            
            // Show success alert using SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Customer details updated successfully!',
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

            // Call onSuccess callback to refresh customer data
            if (onSuccess) {
                onSuccess();
            }

            // Close popup after successful update
            onClose();
            
        } catch (error) {
            console.error('Error updating customer:', error);
            setMessage({
                type: 'error',
                text: error.message || 'Failed to update customer. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Blurred background overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={handleOverlayClick}></div>

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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Edit Customer Details</h2>
                    {/* <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button> */}
                </div>

                {/* Error Message - Success is handled by SweetAlert2 */}
                {message.text && message.type === 'error' && (
                    <div className="mb-6 p-4 rounded-md text-center bg-red-100 text-red-800 border border-red-300">
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer ID - Read Only */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">
                            Customer ID:
                        </label>
                        <input
                            type="text"
                            name="customerId"
                            value={formData.customerId}
                            className="border rounded-md px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    {/* Customer Name - Read Only */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">
                            Customer Name:
                        </label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            className="border rounded-md px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    {/* Email - Editable */}
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

                    {/* Contact Number 1 - Editable */}
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

                    {/* Contact Number 2 - Editable */}
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

                    {/* Address - Editable */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">Address:</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                            required
                        />
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
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerForm;