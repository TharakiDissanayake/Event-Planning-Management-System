package com.epms.backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomerDTO {
    private int customerId;
    private String customerName;
    private String customerEmail;
    private String contactNumber1;
    private String contactNumber2;
    private String address;
}
