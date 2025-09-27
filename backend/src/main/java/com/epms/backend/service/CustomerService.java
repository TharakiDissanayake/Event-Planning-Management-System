package com.epms.backend.service;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.requests.RequestUpdateCustomerDTO;

public interface CustomerService {
    String saveCustomer(CustomerDTO customerDTO);

    CustomerDTO getCustomerById(String customerId);

    String updateCustomer(RequestUpdateCustomerDTO requestUpdateCustomerDTO, String customerId);
}
