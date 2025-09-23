import React, { useState, useRef } from "react";

const AddEventForm = () => {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        identitynumber: "",
        category: "",
        eventdate: "",
        package: "",
        offer: "",
        status: "",
        image: null
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
            category: "",
            eventdate: "",
            package: "",
            offer: "",
            status: "",
            image: null
        });

        // Reset the file input using ref
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-white shadow-md p-8 w-[1200px]">
            <h2 className="text-3xl font-bold text-center mb-8">Event Details</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Identity Number */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">
                        Identity Number:
                    </label>
                    <input
                        type="text"
                        name="identitynumber"
                        value={formData.identitynumber}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Category Dropdown */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <option value="">Select Category</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="corporate">Corporate</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                {/* Event Date */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">
                        Event Date:
                    </label>
                    <input
                        type="date"
                        name="eventdate"
                        value={formData.eventdate}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Package */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Package:</label>
                    <input
                        type="number"
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Offer */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Offer:</label>
                    <input
                        type="number"
                        name="offer"
                        value={formData.offer}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </div>

                {/* Status Dropdown */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div className="grid grid-cols-2 gap-4 items-center">
                    <label className="text-lg font-semibold text-gray-700">Image:</label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                        Save Package
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEventForm;
