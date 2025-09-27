package com.epms.backend.config;

import com.epms.backend.entity.User;
import com.epms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Check if users already exist
        if (userRepository.count() == 0) {
            // Create default admin user
            User admin = new User();
            admin.setUserName("Admin User");
            admin.setUserEmail("admin@epms.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setUserRole("ADMIN");
            userRepository.save(admin);

            // Create default staff user
            User staff = new User();
            staff.setUserName("Staff User");
            staff.setUserEmail("staff@epms.com");
            staff.setPassword(passwordEncoder.encode("staff123"));
            staff.setUserRole("STAFF");
            userRepository.save(staff);

            System.out.println("Default users created:");
            System.out.println("Admin: admin@epms.com / admin123");
            System.out.println("Staff: staff@epms.com / staff123");
        } else {
            System.out.println("Users already exist in database");
        }
    }
}