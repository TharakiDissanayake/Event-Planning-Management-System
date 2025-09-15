package com.epms.backend.controller;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.requests.RequestUpdateCustomerDTO;
import com.epms.backend.service.CustomerService;
import com.epms.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping(
            path = {"/save-customer"}
    )
    public ResponseEntity<StandardResponse> saveCustomer(@RequestBody CustomerDTO customerDTO){
        String message = customerService.saveCustomer(customerDTO);
        return new ResponseEntity<StandardResponse>(new StandardResponse(201, "SUCCESS", message), HttpStatus.CREATED);
    }

    @GetMapping(
            path = {"/get-customer-by-id"},
            params = "id"
    )
    public ResponseEntity<StandardResponse> getCustomerById(@RequestParam(value = "id") int customerId){
        CustomerDTO customerDTO = customerService.getCustomerById(customerId);
        return new ResponseEntity<StandardResponse>(new StandardResponse(200, "SUCCESS", customerDTO), HttpStatus.OK);
    }

    @PutMapping(
            path = {"/update-customer"},
            params = "id"
    )
    public ResponseEntity<StandardResponse> updateCustomer(@RequestBody RequestUpdateCustomerDTO requestUpdateCustomerDTO, @RequestParam(value = "id") int customerId){
        String message = customerService.updateCustomer(requestUpdateCustomerDTO, customerId);
        return new ResponseEntity<StandardResponse>(new StandardResponse(201, "SUCCESS", message), HttpStatus.CREATED);
    }
}
