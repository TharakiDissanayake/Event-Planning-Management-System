package com.epms.backend.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RequestUpdateCustomerDTO {
    private String customerEmail;
    private String contactNumber;
    private String address;
}
