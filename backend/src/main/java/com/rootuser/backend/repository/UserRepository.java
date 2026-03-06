package com.rootuser.backend.repository;

import com.rootuser.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Requirement: Prevent duplicate email registration
    Optional<User> findByEmail(String email);
}