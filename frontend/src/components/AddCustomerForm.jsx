import React, { useState, useRef } from "react";

const AddCustomerForm = () => {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        identitynumber: "",
        name: "",
        email: "",
        contactnumber: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    const handleCancel = () => {
        setFormData({
            identitynumber: "",
            name: "",
            email: "",
            contactnumber: "",
            address: "",
        });

        // Reset the file input using ref
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-white shadow-md p-8 w-[1200px]">
            <h2 className="text-3xl font-bold text-center mb-8">Customer Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Package Name */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">
                        Customer Name:
                    </label>
                    <input
                        type="text"
                        name="identitynumber"
                        value={formData.identitynumber}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Customer Name */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Customer Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Email */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Contact Number */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Contact Number:</label>
                    <input
                        type="text"
                        name="contactnumber"
                        value={formData.contactnumber}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Includes */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    />
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition"
                    >
                        Save 
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomerForm;
