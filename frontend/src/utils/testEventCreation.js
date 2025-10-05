// Test utility to verify event creation functionality
import axios from 'axios';
import { eventService } from '../services/eventService';

const API_BASE_URL = 'http://localhost:8082/api/v1';

// Sample event data for testing
const sampleEventData = {
    customerId: 1, // Replace with a valid customer ID from your database
    eventTitle: "Test Event",
    eventCategory: "BIRTHDAY_PARTY",
    eventDate: "2023-12-31", // Update with a future date
    startTime: "14:00",
    packageId: 1, // Replace with a valid package ID
    offerId: null, // Optional
    eventStatus: "pending"
};

// Test the authenticated endpoint
const testAuthenticatedEndpoint = async () => {
    console.log("Testing authenticated endpoint...");
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.log("No token found. Please log in first.");
            return;
        }

        const response = await axios.post(
            `${API_BASE_URL}/event/save-event`,
            sampleEventData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log("Authenticated endpoint success:", response.data);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error("Authenticated endpoint error:", error);
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
};

// Test the public endpoint
const testPublicEndpoint = async () => {
    console.log("Testing public endpoint...");
    try {
        const response = await axios.post(
            `${API_BASE_URL}/public/save-event`,
            sampleEventData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log("Public endpoint success:", response.data);
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error("Public endpoint error:", error);
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
};

// Test the combined event service with fallback
const testEventService = async () => {
    console.log("Testing event service with fallback...");
    try {
        const response = await eventService.createEvent(sampleEventData);
        console.log("Event service success:", response);
        return {
            success: true,
            data: response
        };
    } catch (error) {
        console.error("Event service error:", error);
        return {
            success: false,
            error: error
        };
    }
};

// Run all tests
export const runEventCreationTests = async () => {
    console.group("EVENT CREATION TESTS");
    
    console.log("=== Test 1: Authenticated Endpoint ===");
    const authResult = await testAuthenticatedEndpoint();
    
    console.log("\n=== Test 2: Public Endpoint ===");
    const publicResult = await testPublicEndpoint();
    
    console.log("\n=== Test 3: Event Service with Fallback ===");
    const serviceResult = await testEventService();
    
    console.log("\n=== TEST RESULTS SUMMARY ===");
    console.log("Authenticated endpoint:", authResult.success ? "SUCCESS" : "FAILED");
    console.log("Public endpoint:", publicResult.success ? "SUCCESS" : "FAILED");
    console.log("Event service with fallback:", serviceResult.success ? "SUCCESS" : "FAILED");
    
    console.groupEnd();
    
    return {
        authenticatedTest: authResult,
        publicTest: publicResult,
        serviceTest: serviceResult
    };
};

// To run these tests from the browser console, import this file and call:
// import { runEventCreationTests } from './utils/testEventCreation';
// runEventCreationTests().then(results => console.log(results));