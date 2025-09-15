package com.epms.backend.service;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.requests.RequestUpdateCustomerDTO;

public interface CustomerService {
    String saveCustomer(CustomerDTO customerDTO);

    CustomerDTO getCustomerById(int customerId);

    String updateCustomer(RequestUpdateCustomerDTO requestUpdateCustomerDTO, int customerId);
}
