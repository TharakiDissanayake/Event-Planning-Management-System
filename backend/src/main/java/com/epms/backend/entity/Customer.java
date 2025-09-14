package com.epms.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customer")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Customer {

    @Id
    @Column(name = "customer_id", nullable = false)
    private int customerId;

    @Column(name = "customer_name", length = 100, nullable = false)
    private String customerName;

    @Email
    @Column(name = "customer_email", nullable = false, unique = true)
    private String customerEmail;

    @Column(name = "contact_number", length = 10, nullable = false)
    private String contactNumber;

    @Column(name = "address", length = 200, nullable = false)
    private String address;
}
