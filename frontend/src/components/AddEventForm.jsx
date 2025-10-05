import React, { useState, useRef, useEffect } from "react";
import EventQuotation from "./EventQuotation";
import { customerService } from "../services/customerService";
import { packageService } from "../services/packageService";
import offerService from "../services/offerService";
import { eventService } from "../services/eventService";

const AddEventForm = () => {
    const fileInputRef = useRef(null);
    const [showQuotation, setShowQuotation] = useState(false);
    const [quotationData, setQuotationData] = useState(null);
    
    // Customer validation states
    const [customerValidated, setCustomerValidated] = useState(false);
    const [customerData, setCustomerData] = useState(null);
    const [customerError, setCustomerError] = useState("");
    const [checkingCustomer, setCheckingCustomer] = useState(false);
    
    // Package and Offer lists
    const [packages, setPackages] = useState([]);
    const [offers, setOffers] = useState([]);
    const [loadingPackages, setLoadingPackages] = useState(false);
    const [loadingOffers, setLoadingOffers] = useState(false);
    
    // Selected package data
    const [selectedPackage, setSelectedPackage] = useState(null);

    const [formData, setFormData] = useState({
        identitynumber: "",
        category: "",
        eventTitle: "",
        eventdate: "",
        startTime: "",
        description: "",
        packageId: "",
        offerId: "",
        status: "",
        image: null
    });

    // Validate customer by identity number
    const validateCustomer = async () => {
        const identityNumber = formData.identitynumber.trim();
        if (!identityNumber) {
            setCustomerError("Please enter a customer identity number");
            setCustomerValidated(false);
            setCustomerData(null);
            return;
        }
        
        setCheckingCustomer(true);
        setCustomerError("");
        
        try {
            const response = await customerService.getCustomerById(identityNumber);
            if (response && response.data) {
                setCustomerData(response.data);
                setCustomerValidated(true);
                setCustomerError("");
            } else {
                setCustomerError("Customer not found with this identity number");
                setCustomerValidated(false);
                setCustomerData(null);
            }
        } catch (error) {
            console.error("Error checking customer:", error);
            setCustomerError("Customer not found with this identity number");
            setCustomerValidated(false);
            setCustomerData(null);
        } finally {
            setCheckingCustomer(false);
        }
    };
    
    // Fetch packages based on event category
    const fetchPackagesByEventCategory = async (eventCategory) => {
        if (!eventCategory) return;
        
        setLoadingPackages(true);
        try {
            console.log("Fetching packages for event category:", eventCategory);
            const response = await packageService.getPackagesByEventCategory(eventCategory);
            console.log("Package service response:", response);
            
            // Check if response contains the standard response format with data property
            if (response && response.data) {
                console.log("Filtered packages:", response.data);
                const packagesArray = Array.isArray(response.data) ? response.data : [];
                setPackages(packagesArray);
                
                // Log how many active packages were found
                console.log(`Found ${packagesArray.length} active packages for event category ${eventCategory}`);
            } else {
                // If we got a direct array without the standard wrapper
                const packageData = Array.isArray(response) ? response : [];
                console.log("Direct package data:", packageData);
                setPackages(packageData);
            }
        } catch (error) {
            console.error("Error fetching packages:", error);
            setPackages([]);
        } finally {
            setLoadingPackages(false);
        }
    };
    
    // Fetch offers based on event category, package category, and event date
    const fetchOffersByCategories = async (eventCategory, packageCategory, eventDate) => {
        if (!eventCategory || !packageCategory) return;
        
        setLoadingOffers(true);
        try {
            console.log("Fetching offers for:", { eventCategory, packageCategory, eventDate });
            const response = await offerService.getOffersByCategories(eventCategory, packageCategory, eventDate);
            
            // Check if response contains the standard response format with data property
            if (response && response.data && Array.isArray(response.data)) {
                console.log("Filtered active offers:", response.data);
                setOffers(response.data);
            } else if (response && response.data && response.data.data && Array.isArray(response.data.data)) {
                // Handle nested data structure
                console.log("Filtered active offers (nested):", response.data.data);
                setOffers(response.data.data);
            } else {
                console.log("No offers found or unexpected response format");
                setOffers([]);
            }
        } catch (error) {
            console.error("Error fetching offers:", error);
            setOffers([]);
        } finally {
            setLoadingOffers(false);
        }
    };
    
    // Effect to fetch packages when event category changes
    useEffect(() => {
        if (formData.category) {
            fetchPackagesByEventCategory(formData.category);
            // Reset package and offer selection
            setFormData(prev => ({
                ...prev,
                packageId: "",
                offerId: ""
            }));
            setSelectedPackage(null);
            setOffers([]);
        }
    }, [formData.category]);
    
    // Effect to fetch offers when selected package changes or event date changes
    useEffect(() => {
        if (formData.packageId && formData.category && selectedPackage && formData.eventdate) {
            // Only fetch offers if we have all required data
            fetchOffersByCategories(formData.category, selectedPackage.packageCategory, formData.eventdate);
        } else if (formData.packageId && formData.category && selectedPackage) {
            // If no event date is selected yet, fetch without date filtering
            fetchOffersByCategories(formData.category, selectedPackage.packageCategory);
        }
    }, [formData.packageId, formData.category, selectedPackage, formData.eventdate]);
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
        
        // When package ID changes, find the selected package object
        if (name === "packageId" && value) {
            const pkg = packages.find(p => p.packageId.toString() === value);
            setSelectedPackage(pkg || null);
        }
    };

    const handleCreate = () => {
        // Validate customer first
        if (!customerValidated) {
            validateCustomer();
            return;
        }
        
        // Validate required fields
        if (!formData.category) {
            alert("Please select an event category");
            return;
        }
        
        if (!formData.eventdate) {
            alert("Please select an event date");
            return;
        }
        
        if (!formData.packageId) {
            alert("Please select a package");
            return;
        }
        
        // Find selected package and offer objects
        const selectedPkg = packages.find(p => p.packageId.toString() === formData.packageId);
        const selectedOffer = formData.offerId ? offers.find(o => o.offerId.toString() === formData.offerId) : null;
        
        if (!selectedPkg) {
            alert("Selected package not found");
            return;
        }
        
            // Prepare quotation data
        const quotationInfo = {
            identityNumber: formData.identitynumber,
            customerName: customerData?.customerName || "Customer",
            eventName: formData.eventTitle || `${formData.category} Event`,
            eventType: formData.category,
            eventDate: formData.eventdate,
            startTime: formData.startTime || "09:00",
            description: formData.description || "No description provided",
            packageName: selectedPkg.packageName,
            packagePrice: selectedPkg.packagePrice,
            offerName: selectedOffer ? selectedOffer.offerName : "No Offer",
            offerDiscount: selectedOffer ? selectedOffer.offerDiscount : 0,
            // Calculate final price with discount
            finalPrice: selectedPkg.packagePrice * (1 - (selectedOffer ? selectedOffer.offerDiscount / 100 : 0)),
        };        setQuotationData(quotationInfo);
        setShowQuotation(true);
    };

    const resetForm = () => {
        setFormData({
            identitynumber: "",
            category: "",
            eventTitle: "",
            eventdate: "",
            startTime: "",
            description: "",
            packageId: "",
            offerId: "",
            status: "",
            image: null
        });

        // Reset the file input using ref
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        
        // Reset related states
        setCustomerValidated(false);
        setCustomerData(null);
        setCustomerError("");
        setPackages([]);
        setOffers([]);
        setSelectedPackage(null);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        // Validate customer first
        if (!customerValidated) {
            validateCustomer();
            return;
        }
        
        // Additional validation
        if (!formData.category || !formData.eventdate || !formData.packageId || !formData.status) {
            alert("Please fill all required fields");
            return;
        }
        
        try {
            // Prepare event data for API
            const eventData = {
                customerId: customerData.customerId,
                eventTitle: formData.eventTitle || `${formData.category} Event`,
                eventCategory: formData.category,
                eventDate: formData.eventdate,
                startTime: formData.startTime || "09:00",
                description: formData.description,
                packageId: formData.packageId,
                offerId: formData.offerId || null,
                status: formData.status
            };
            
            // If there's an image, upload it first
            if (formData.image) {
                try {
                    const imageResponse = await eventService.uploadImage(formData.image);
                    eventData.eventImage = imageResponse.filename || imageResponse.url;
                } catch (imageError) {
                    console.error("Error uploading image:", imageError);
                    // Continue without image if upload fails
                    alert("Image upload failed, but event will be saved without an image");
                }
            }
            
            console.log("Saving event with data:", eventData);
            
            // Save the event - eventService will try both authenticated and public endpoints
            const response = await eventService.createEvent(eventData);
            console.log("Event saved:", response);
            alert("Event saved successfully!");
            
            // Reset form after successful submission
            resetForm();
        } catch (error) {
            console.error("Error saving event:", error);
            alert("Error saving event: " + (error.message || "Unknown error"));
        }
    };

    const handleCancel = () => {
        resetForm();
    };

    return (
        <>
            <div className="bg-white shadow-md p-8 w-[1200px]">
                <h2 className="text-3xl font-bold text-center mb-8">Event Details</h2>

                <form onSubmit={handleSave} className="space-y-6">
                    {/* Identity Number with Validation */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">
                            Identity Number:
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="identitynumber"
                                value={formData.identitynumber}
                                onChange={handleChange}
                                disabled={customerValidated}
                                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                                    customerError ? "border-red-500" : customerValidated ? "border-green-500" : ""
                                }`}
                            />
                            <button
                                type="button"
                                onClick={validateCustomer}
                                disabled={checkingCustomer || !formData.identitynumber || customerValidated}
                                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-600 transition disabled:opacity-50"
                            >
                                {checkingCustomer ? "Checking..." : customerValidated ? "Verified" : "Verify"}
                            </button>
                        </div>
                    </div>
                    
                    {/* Customer Error Message */}
                    {customerError && (
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <div></div>
                            <div className="text-red-500 text-sm">{customerError}</div>
                        </div>
                    )}
                    
                    {/* Customer Details when validated */}
                    {customerValidated && customerData && (
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <label className="text-lg font-semibold text-gray-700">
                                Customer:
                            </label>
                            <div className="border border-green-500 bg-green-50 rounded-md px-3 py-2">
                                <p><span className="font-medium">Name:</span> {customerData.customerName}</p>
                                <p><span className="font-medium">Email:</span> {customerData.customerEmail}</p>
                                <p><span className="font-medium">Contact:</span> {customerData.contactNumber1}</p>
                            </div>
                        </div>
                    )}

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
                            <option value="WEDDING">Wedding</option>
                            <option value="ENGAGEMENT_PARTY">Engagement Party</option>
                            <option value="BIRTHDAY_PARTY">Birthday Party</option>
                            <option value="ANNEVASARY_CELEBRATION">Anniversary Celebration</option>
                            <option value="CORPARATE_MEETING">Corporate Meeting</option>
                            <option value="CONFERENCE_SEMINAR">Conference/Seminar</option>
                        </select>
                    </div>

                    {/* Event Title */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">
                            Event Title:
                        </label>
                        <input
                            type="text"
                            name="eventTitle"
                            value={formData.eventTitle}
                            onChange={handleChange}
                            placeholder="Enter event title"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
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

                    {/* Start Time */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">
                            Start Time:
                        </label>
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            placeholder="09:00"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                    
                    {/* Description */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">
                            Description:
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter event description"
                            rows="3"
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        ></textarea>
                    </div>

                    {/* Package Dropdown */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">Package:</label>
                        <div>
                            <select
                                name="packageId"
                                value={formData.packageId}
                                onChange={handleChange}
                                disabled={!formData.category || loadingPackages}
                                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                            >
                                <option value="">Select Package</option>
                                {Array.isArray(packages) && packages.length > 0 ? (
                                    packages.map((pkg) => (
                                        <option key={pkg.packageId} value={pkg.packageId}>
                                            {pkg.packageName} (${pkg.packagePrice}) - {pkg.packageCategory}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>No packages available</option>
                                )}
                            </select>
                            {loadingPackages && <div className="text-sm text-gray-500 mt-1">Loading packages...</div>}
                            {!loadingPackages && packages.length === 0 && formData.category && (
                                <div className="text-sm text-orange-500 mt-1">No active packages available for {formData.category.replace("_", " ").toLowerCase()}. Please contact an administrator.</div>
                            )}
                        </div>
                    </div>
                    
                    {/* Selected Package Details */}
                    {selectedPackage && (
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <label className="text-lg font-semibold text-gray-700">Package Details:</label>
                            <div className="border border-blue-200 bg-blue-50 rounded-md px-3 py-2">
                                <p><span className="font-medium">Name:</span> {selectedPackage.packageName}</p>
                                <p><span className="font-medium">Price:</span> ${selectedPackage.packagePrice}</p>
                                <p><span className="font-medium">Capacity:</span> {selectedPackage.capacity} persons</p>
                            </div>
                        </div>
                    )}

                    {/* Offer Dropdown */}
                    <div className="grid grid-cols-2 gap-4 items-center">
                        <label className="text-lg font-semibold text-gray-700">Offer:</label>
                        <div>
                            <select
                                name="offerId"
                                value={formData.offerId}
                                onChange={handleChange}
                                disabled={!selectedPackage || loadingOffers || !formData.eventdate}
                                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                            >
                                <option value="">Select Offer (Optional)</option>
                                {offers.map((offer) => (
                                    <option key={offer.offerId} value={offer.offerId}>
                                        {offer.offerName} ({offer.offerDiscount}% off)
                                    </option>
                                ))}
                            </select>
                            {loadingOffers && <div className="text-sm text-gray-500 mt-1">Loading offers...</div>}
                            {!formData.eventdate && selectedPackage && (
                                <div className="text-sm text-amber-500 mt-1">Please select an event date to see applicable offers</div>
                            )}
                            {!loadingOffers && offers.length === 0 && selectedPackage && formData.eventdate && (
                                <div className="text-sm text-gray-500 mt-1">No active offers available for this event category, package category, and date</div>
                            )}
                        </div>
                    </div>
                    
                    {/* Selected Offer Details */}
                    {formData.offerId && (
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <label className="text-lg font-semibold text-gray-700">Offer Details:</label>
                            <div className="border border-green-200 bg-green-50 rounded-md px-3 py-2">
                                {(() => {
                                    const selectedOffer = offers.find(o => o.offerId.toString() === formData.offerId);
                                    return selectedOffer ? (
                                        <>
                                            <p><span className="font-medium">Name:</span> {selectedOffer.offerName}</p>
                                            <p><span className="font-medium">Discount:</span> {selectedOffer.offerDiscount}%</p>
                                            <p><span className="font-medium">Valid Until:</span> {selectedOffer.endDate}</p>
                                        </>
                                    ) : <p>Offer details not available</p>
                                })()}
                            </div>
                        </div>
                    )}

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
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="PENDING">Pending</option>
                            <option value="CANCELLED">Cancelled</option>
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
