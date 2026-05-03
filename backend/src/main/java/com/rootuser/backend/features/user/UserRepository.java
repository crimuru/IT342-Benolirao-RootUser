package com.rootuser.backend.features.user;

import com.rootuser.backend.features.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Requirement: Prevent duplicate email registration
    Optional<User> findByEmail(String email);
    // 🚀 ADD THIS NEW LINE: Spring Boot will auto-generate the SQL for this!
    
}