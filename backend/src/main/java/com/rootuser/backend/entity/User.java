package com.rootuser.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data // Generates getters, setters, and toString automatically
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Maps Java's 'firstName' to Supabase's 'first_name' column
    @Column(name = "first_name", nullable = false) 
    private String firstName;

    // Maps Java's 'lastName' to Supabase's 'last_name' column
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    // Ensures unique email registration and data validation
    @Column(unique = true, nullable = false)
    private String email;

    // Stores the BCrypt hashed password
    @Column(nullable = false)
    private String password;

    @Column(name = "phone")
    private String phone;
    
    @Column(nullable = false, columnDefinition = "varchar(255) default 'USER'")
    private String role = "USER";
}