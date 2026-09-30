package com.municipal.complaint_management.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.municipal.complaint_management.dto.LoginRequest;
import com.municipal.complaint_management.entity.User;
import com.municipal.complaint_management.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ================================
    // REGISTER
    // ================================

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        System.out.println("=================================");
        System.out.println("REGISTER EMAIL: [" + user.getEmail() + "]");

        // Check if email already exists
        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "message",
                            "Email already registered"
                    ));
        }

        // Default role for new users
        user.setRole("CITIZEN");

        // Save user into database
        User savedUser = userRepository.save(user);

        System.out.println("USER REGISTERED: "
                + savedUser.getEmail());

        System.out.println("=================================");

        Map<String, Object> response = new HashMap<>();

        response.put("message", "Registration successful");
        response.put("id", savedUser.getId());
        response.put("name", savedUser.getName());
        response.put("email", savedUser.getEmail());
        response.put("role", savedUser.getRole());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // ================================
    // LOGIN
    // ================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        System.out.println("=================================");
        System.out.println(
                "LOGIN EMAIL RECEIVED: ["
                + request.getEmail() + "]"
        );

        // Find user by email
        Optional<User> userOptional =
                userRepository.findByEmail(request.getEmail());

        System.out.println(
                "USER FOUND: "
                + userOptional.isPresent()
        );

        // User does not exist
        if (userOptional.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "message",
                            "Invalid email or password"
                    ));
        }

        User user = userOptional.get();

        // Check password
        if (!Objects.equals(
                user.getPassword(),
                request.getPassword())) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                            "message",
                            "Invalid email or password"
                    ));
        }

        // Login successful
        Map<String, Object> response = new HashMap<>();

        response.put("message", "Login successful");
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());

        System.out.println("LOGIN SUCCESSFUL");
        System.out.println("USER ID: " + user.getId());
        System.out.println("USER NAME: " + user.getName());
        System.out.println("USER ROLE: " + user.getRole());
        System.out.println("=================================");

        return ResponseEntity.ok(response);
    }
}