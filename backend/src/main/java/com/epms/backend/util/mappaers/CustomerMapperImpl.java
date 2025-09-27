package com.epms.backend.util.mappaers;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.entity.Customer;
import org.springframework.stereotype.Component;

@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public Customer DTOToEntity(CustomerDTO customerDTO) {
        if (customerDTO == null) {
            return null;
        }

        Customer customer = new Customer();
        customer.setCustomerId(customerDTO.getCustomerId());
        customer.setCustomerName(customerDTO.getCustomerName());
        customer.setCustomerEmail(customerDTO.getCustomerEmail());
        customer.setContactNumber1(customerDTO.getContactNumber1());
        customer.setContactNumber2(customerDTO.getContactNumber2());
        customer.setAddress(customerDTO.getAddress());

        return customer;
    }

    @Override
    public CustomerDTO EntityToDTO(Customer customer) {
        if (customer == null) {
            return null;
        }

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setCustomerId(customer.getCustomerId());
        customerDTO.setCustomerName(customer.getCustomerName());
        customerDTO.setCustomerEmail(customer.getCustomerEmail());
        customerDTO.setContactNumber1(customer.getContactNumber1());
        customerDTO.setContactNumber2(customer.getContactNumber2());
        customerDTO.setAddress(customer.getAddress());

        return customerDTO;
    }
}