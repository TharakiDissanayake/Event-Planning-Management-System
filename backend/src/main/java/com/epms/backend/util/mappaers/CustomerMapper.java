package com.epms.backend.util.mappaers;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.entity.Customer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    Customer DTOToEntity(CustomerDTO customerDTO);

    CustomerDTO EntityToDTO(Customer customer);
}
