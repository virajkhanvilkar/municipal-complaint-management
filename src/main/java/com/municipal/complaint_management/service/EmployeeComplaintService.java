package com.municipal.complaint_management.service;

import java.time.LocalDateTime;
import java.util.List;

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
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return complaintRepository.findByEmployee(employee);
    }

    public Complaint getComplaintById(Long complaintId) {

        return complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    @Transactional
    public Complaint updateComplaintStatus(
            Long complaintId,
            Long employeeId,
            String newStatus,
            String remarks) {

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        if (complaint.getEmployee() == null ||
                !complaint.getEmployee().getId().equals(employeeId)) {

            throw new RuntimeException("Complaint is not assigned to this employee");
        }

        String oldStatus = complaint.getStatus();

        complaint.setStatus(newStatus);
        complaint.setRemarks(remarks);

        Complaint savedComplaint = complaintRepository.save(complaint);

        ComplaintStatusHistory history = new ComplaintStatusHistory();

        history.setComplaint(savedComplaint);
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setRemarks(remarks);
        history.setUpdatedAt(LocalDateTime.now());
        history.setUpdatedBy(employee);

        historyRepository.save(history);

        return savedComplaint;
    }
}