
package com.municipal.complaint_management.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.municipal.complaint_management.entity.Complaint;
import com.municipal.complaint_management.entity.ComplaintStatusHistory;
import com.municipal.complaint_management.entity.User;
import com.municipal.complaint_management.repository.ComplaintRepository;
import com.municipal.complaint_management.repository.ComplaintStatusHistoryRepository;
import com.municipal.complaint_management.repository.UserRepository;

@Service
public class EmployeeComplaintService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintStatusHistoryRepository historyRepository;
    private final UserRepository userRepository;

    private static final Set<String> VALID_STATUSES =
            Set.of("PENDING", "IN_PROGRESS", "RESOLVED");

    public EmployeeComplaintService(
            ComplaintRepository complaintRepository,
            ComplaintStatusHistoryRepository historyRepository,
            UserRepository userRepository) {

        this.complaintRepository = complaintRepository;
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    public List<Complaint> getAssignedComplaints(Long employeeId) {

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        if (employee.getRole() == null
                || !employee.getRole().equalsIgnoreCase("EMPLOYEE")) {
            throw new RuntimeException("User is not an employee");
        }

        return complaintRepository.findByEmployee_Id(employeeId);
    }

    public Complaint getComplaintById(Long complaintId) {

        return complaintRepository.findById(complaintId)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));
    }

    @Transactional
    public Complaint updateComplaintStatus(
            Long complaintId,
            Long employeeId,
            String newStatus,
            String remarks) {

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        if (employee.getRole() == null
                || !employee.getRole().equalsIgnoreCase("EMPLOYEE")) {
            throw new RuntimeException("User is not an employee");
        }

        Complaint complaint = complaintRepository
                .findByIdAndEmployee_Id(complaintId, employeeId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Complaint not found or not assigned to this employee"));

        if (newStatus == null
                || !VALID_STATUSES.contains(
                        newStatus.trim().toUpperCase())) {
            throw new IllegalArgumentException(
                    "Invalid status. Allowed values: PENDING, IN_PROGRESS, RESOLVED");
        }

        String normalizedStatus = newStatus.trim().toUpperCase();
        String oldStatus = complaint.getStatus();

        complaint.setStatus(normalizedStatus);
        complaint.setRemarks(remarks == null ? "" : remarks.trim());

        Complaint savedComplaint = complaintRepository.save(complaint);

        ComplaintStatusHistory history = new ComplaintStatusHistory();

        history.setComplaint(savedComplaint);
        history.setOldStatus(oldStatus);
        history.setNewStatus(normalizedStatus);
        history.setRemarks(remarks == null ? "" : remarks.trim());
        history.setUpdatedAt(LocalDateTime.now());
        history.setUpdatedBy(employee);

        historyRepository.save(history);

        return savedComplaint;
    }
}
