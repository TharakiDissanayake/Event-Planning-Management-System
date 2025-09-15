package com.epms.backend.service.impl;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.requests.RequestUpdateCustomerDTO;
import com.epms.backend.entity.Customer;
import com.epms.backend.exceptions.NotFoundException;
import com.epms.backend.repository.CustomerRepository;
import com.epms.backend.service.CustomerService;
import com.epms.backend.util.mappaers.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceIMPL implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private CustomerMapper customerMapper;

    @Override
    public String saveCustomer(CustomerDTO customerDTO) {
        Customer customer = customerMapper.DTOToEntity(customerDTO);
        if(!customerRepository.existsById(customer.getCustomerId())){
            customerRepository.save(customer);
            return customer.getCustomerName()+ " saved successfully.";
        }else {
            throw new NotFoundException("Customer with ID "+ customer.getCustomerId() + " already exists.");
        }
    }

    @Override
    public CustomerDTO getCustomerById(int customerId) {
        if(customerRepository.existsById(customerId)){
            Customer customer = customerRepository.getReferenceById(customerId);
            CustomerDTO customerDTO = customerMapper.EntityToDTO(customer);
            return customerDTO;
        }else {
            throw new NotFoundException("Customer with ID "+ customerId + " Not found.");
        }
    }

    @Override
    public String updateCustomer(RequestUpdateCustomerDTO requestUpdateCustomerDTO, int customerId) {
        if(customerRepository.existsById(customerId)){
            Customer customer = customerRepository.getReferenceById(customerId);
            customer.setCustomerEmail(requestUpdateCustomerDTO.getCustomerEmail());
            customer.setContactNumber(requestUpdateCustomerDTO.getContactNumber());
            customer.setAddress(requestUpdateCustomerDTO.getAddress());
            customerRepository.save(customer);
            return "Customer with ID "+ customerId + " updated successfully.";
        }else {
            throw new NotFoundException("Customer with ID "+ customerId + " Not found.");
        }
    }
}
