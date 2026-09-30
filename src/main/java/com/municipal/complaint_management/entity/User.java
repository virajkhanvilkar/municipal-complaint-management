package com.municipal.complaint_management.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    private String phone;

    private String role;

    // Default constructor
    public User() {
    }

    // Get ID
    public Long getId() {
        return id;
    }

    // Set ID
    public void setId(Long id) {
        this.id = id;
    }

    // Get Name
    public String getName() {
        return name;
    }

    // Set Name
    public void setName(String name) {
        this.name = name;
    }

    // Get Email
    public String getEmail() {
        return email;
    }

    // Set Email
    public void setEmail(String email) {
        this.email = email;
    }

    // Get Password
    public String getPassword() {
        return password;
    }

    // Set Password
    public void setPassword(String password) {
        this.password = password;
    }

    // Get Phone
    public String getPhone() {
        return phone;
    }

    // Set Phone
    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Get Role
    public String getRole() {
        return role;
    }

    // Set Role
    public void setRole(String role) {
        this.role = role;
    }
}