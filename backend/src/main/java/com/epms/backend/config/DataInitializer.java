package com.epms.backend.config;

import com.epms.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        try {
            userService.findByEmail("admin@epms.com");
        } catch (Exception e) {
            userService.createUser("Admin User", "admin@epms.com", "admin123", "ADMIN");
            System.out.println("Default admin user created: admin@epms.com / admin123");
        }

        // Create default staff user if not exists
        try {
            userService.findByEmail("staff@epms.com");
        } catch (Exception e) {
            userService.createUser("Staff User", "staff@epms.com", "staff123", "STAFF");
            System.out.println("Default staff user created: staff@epms.com / staff123");
        }
    }
}