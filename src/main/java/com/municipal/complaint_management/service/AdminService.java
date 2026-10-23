
package com.municipal.complaint_management.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.municipal.complaint_management.entity.Complaint;
import com.municipal.complaint_management.entity.User;
import com.municipal.complaint_management.repository.ComplaintRepository;
import com.municipal.complaint_management.repository.UserRepository;

@Service
public class AdminService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    public AdminService(
            ComplaintRepository complaintRepository,
            UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }

    // Get all complaints for the Admin panel
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // Get only employees for the assignment dropdown
    public List<User> getAllEmployees() {
        return userRepository.findByRoleIgnoreCase("EMPLOYEE");
    }

    // Assign an employee to a complaint
    @Transactional
    public Complaint assignEmployee(Long complaintId, Long employeeId) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found: " + complaintId));

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found: " + employeeId));

        if (!"EMPLOYEE".equalsIgnoreCase(employee.getRole())) {
            throw new IllegalArgumentException(
                    "Selected user does not have the EMPLOYEE role");
        }

        complaint.setEmployee(employee);

        return complaintRepository.save(complaint);
    }

    // Get real dashboard counts from the database
    public Map<String, Long> getDashboardStatistics() {

        Map<String, Long> statistics = new HashMap<>();

        statistics.put("totalComplaints", complaintRepository.count());
        statistics.put("pending", complaintRepository.countByStatusIgnoreCase("PENDING"));
        statistics.put("inProgress", complaintRepository.countByStatusIgnoreCase("IN_PROGRESS"));
        statistics.put("resolved", complaintRepository.countByStatusIgnoreCase("RESOLVED"));
        statistics.put("totalUsers", userRepository.count());

        return statistics;
    }
}
