-- Fix customer table to allow manual ID input
-- This will drop and recreate the customer table with the correct structure

USE epms_db;

-- Drop the existing customer table (WARNING: This will delete all customer data)
DROP TABLE IF EXISTS customer;

-- Create customer table with manual ID (no AUTO_INCREMENT)
CREATE TABLE customer (
    customer_id INT NOT NULL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) NOT NULL UNIQUE,
    contact_number1 VARCHAR(10) NOT NULL,
    contact_number2 VARCHAR(10) NOT NULL,
    address VARCHAR(200) NOT NULL
);

-- Verify the table structure
DESCRIBE customer;