package com.municipal.complaint_management.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "citizen_id")
    private User citizen;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private User employee;

    private String category;

    private String location;

    @Column(length = 2000)
    private String description;

    private String status;

    @Column(length = 2000)
    private String remarks;

    private LocalDateTime createdAt;


    // Default constructor
    public Complaint() {
    }


    // ID
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // Citizen
    public User getCitizen() {
        return citizen;
    }

    public void setCitizen(User citizen) {
        this.citizen = citizen;
    }


    // Employee
    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }


    // Category
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    // Location
    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    // Description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    // Status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    // Remarks
    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }


    // Created At
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}