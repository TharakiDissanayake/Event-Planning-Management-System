package com.epms.backend.dto.requests;

public class RequestUpdateCustomerDTO {
    private String customerEmail;
    private String contactNumber1;
    private String contactNumber2;
    private String address;

    // Constructors
    public RequestUpdateCustomerDTO() {}

    public RequestUpdateCustomerDTO(String customerEmail, String contactNumber1, String contactNumber2, String address) {
        this.customerEmail = customerEmail;
        this.contactNumber1 = contactNumber1;
        this.contactNumber2 = contactNumber2;
        this.address = address;
    }

    // Getters and Setters
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
