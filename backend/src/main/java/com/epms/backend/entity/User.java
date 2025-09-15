package com.epms.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "user_name", length = 100, nullable = false)
    private String userName;

    @Email
    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;

//    @Column(name = "password", nullable = false)
//    private String password;

    @Column(name = "user_role", nullable = false)
    private String userRole;
}
