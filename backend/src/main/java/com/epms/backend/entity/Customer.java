package com.epms.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @Column(name = "customer_id", nullable = false)
    private String customerId;

    @Column(name = "customer_name", length = 100, nullable = false)
    private String customerName;

    @Email
    @Column(name = "customer_email", nullable = false, unique = true)
    private String customerEmail;

    @Column(name = "contact_number1", length = 10, nullable = false)
    private String contactNumber1;

    @Column(name = "contact_number2", length = 10, nullable = false)
    private String contactNumber2;

    @Column(name = "address", length = 200, nullable = false)
    private String address;

    // Constructors
    public Customer() {}

    public Customer(String customerId, String customerName, String customerEmail, String contactNumber1, String contactNumber2, String address) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.contactNumber1 = contactNumber1;
        this.contactNumber2 = contactNumber2;
        this.address = address;
    }

    // Getters and Setters
    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getContactNumber1() {
        return contactNumber1;
    }

    public void setContactNumber1(String contactNumber1) {
        this.contactNumber1 = contactNumber1;
    }

    public String getContactNumber2() {
        return contactNumber2;
    }

    public void setContactNumber2(String contactNumber2) {
        this.contactNumber2 = contactNumber2;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
