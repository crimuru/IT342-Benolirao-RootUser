package com.rootuser.backend.features.auth;

import com.rootuser.backend.features.user.User;
import com.rootuser.backend.features.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") 
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Requirement: Prevent duplicate email registration
        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // Requirement: Validate credentials using database
        boolean isValid = userService.validateUser(loginRequest.getEmail(), loginRequest.getPassword());
        
        if (isValid) {
            // 🚀 THE FIX: Fetch the actual User from the database and return it!
            // (Note: If findByEmail gives a red error, you just need to add it to your UserService!)
            User loggedInUser = userService.findByEmail(loginRequest.getEmail());
            return ResponseEntity.ok(loggedInUser); 
        } else {
            // Requirement: Prevent login with invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}