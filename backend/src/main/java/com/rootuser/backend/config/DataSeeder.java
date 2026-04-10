package com.rootuser.backend.config;

import com.rootuser.backend.entity.User;
import com.rootuser.backend.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner loadData(UserService userService) {
        return args -> {
            if (!userService.existsByEmail("admin@rootuser.com")) {
                User admin = new User();
                admin.setFirstName("System");
                admin.setLastName("Administrator");
                admin.setEmail("admin@rootuser.com");
                admin.setPassword("admin123");
                admin.setRole("ADMIN");
                userService.registerUser(admin);
                System.out.println("✅ Admin account created: admin@rootuser.com / admin123");
            } else {
                System.out.println("✅ Admin account already exists.");
            }
        };
    }
}
