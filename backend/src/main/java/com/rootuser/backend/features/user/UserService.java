package com.rootuser.backend.features.user;

import com.rootuser.backend.features.user.User;
import com.rootuser.backend.features.user.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // FIX 1: Add this method so AuthController can find it
    public boolean existsByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User registerUser(User user) {
        // FIX 2: Change user.password to user.getPassword()
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean validateUser(String email, String rawPassword) {
        return userRepository.findByEmail(email)
            .map(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
            .orElse(false);
    }

    
    public User findByEmail(String email) {
        // 🚀 Add .orElse(null) to unpack the Optional!
        return userRepository.findByEmail(email).orElse(null);
    }
}