package com.municipal.complaint_management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.municipal.complaint_management.entity.Complaint;
import com.municipal.complaint_management.entity.User;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    // Get all complaints assigned to an employee
    List<Complaint> findByEmployee_Id(Long employeeId);

    // Find a complaint assigned to a specific employee
    Optional<Complaint> findByIdAndEmployee_Id(
            Long complaintId, Long employeeId);

    // Get all complaints submitted by a citizen
    List<Complaint> findByCitizen(User citizen);

    // Count complaints by status
    long countByStatusIgnoreCase(String status);
}