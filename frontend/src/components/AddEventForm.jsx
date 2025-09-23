import React, { useState, useRef } from "react";
import EventQuotation from "./EventQuotation";

const AddEventForm = () => {
    const fileInputRef = useRef(null);
    const [showQuotation, setShowQuotation] = useState(false);
    const [quotationData, setQuotationData] = useState(null);

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

    const handleCreate = () => {
        // Prepare quotation data
        const quotationInfo = {
            identityNumber: formData.identitynumber,
            eventName: `${formData.category} Event`, // You can customize this
            eventType: formData.category,
            eventDate: formData.eventdate,
            packagePrice: formData.package, // Assuming this is the price
            offerDiscount: formData.offer, // Assuming this is discount percentage
        };
        
        setQuotationData(quotationInfo);
        setShowQuotation(true);
    };

    const resetForm = () => {
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

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Event Saved:", formData);
        // Add API call here to save the event
        alert("Event saved successfully!");
        
        // Reset form after successful submission
        resetForm();
    };

    const handleCancel = () => {
        resetForm();
    };

    return (
        <>
            <div className="bg-white shadow-md p-8 w-[1200px]">
                <h2 className="text-3xl font-bold text-center mb-8">Event Details</h2>

                <form onSubmit={handleSave} className="space-y-6">
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
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Anniversary">Anniversary</option>
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

                    {/* Package Price */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">Package Price:</label>
                        <input
                            type="number"
                            name="package"
                            value={formData.package}
                            onChange={handleChange}
                            placeholder="Enter package price"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    {/* Offer Discount */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">Offer Discount (%):</label>
                        <input
                            type="number"
                            name="offer"
                            value={formData.offer}
                            onChange={handleChange}
                            placeholder="Enter discount percentage"
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
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
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

                    {/* Buttons */}
                    <div className="flex justify-between mt-8">
                        {/* Cancel button on the left */}
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        
                        {/* Create and Save buttons on the right */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleCreate}
                                className="bg-blue-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition"
                            >
                                Create
                            </button>
                            <button
                                type="submit"
                                className="bg-purple-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-purple-600 transition"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Event Quotation Popup */}
            <EventQuotation
                isOpen={showQuotation}
                onClose={() => setShowQuotation(false)}
                eventData={quotationData}
            />
        </>
    );
};

export default AddEventForm;
