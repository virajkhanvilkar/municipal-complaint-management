package com.municipal.complaint_management.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.municipal.complaint_management.entity.Complaint;
import com.municipal.complaint_management.service.EmployeeComplaintService;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeComplaintController {

    private final EmployeeComplaintService employeeComplaintService;

    public EmployeeComplaintController(
            EmployeeComplaintService employeeComplaintService) {
        this.employeeComplaintService = employeeComplaintService;
    }

    @GetMapping("/{employeeId}/complaints")
    public ResponseEntity<List<Complaint>> getAssignedComplaints(
            @PathVariable Long employeeId) {

        return ResponseEntity.ok(
                employeeComplaintService.getAssignedComplaints(employeeId)
        );
    }

    @GetMapping("/complaints/{complaintId}")
    public ResponseEntity<Complaint> getComplaint(
            @PathVariable Long complaintId) {

        return ResponseEntity.ok(
                employeeComplaintService.getComplaintById(complaintId)
        );
    }

    @PutMapping("/complaints/{complaintId}/status")
    public ResponseEntity<Complaint> updateComplaintStatus(
            @PathVariable Long complaintId,
            @RequestBody Map<String, Object> request) {

        Long employeeId = Long.valueOf(
                request.get("employeeId").toString()
        );

        String status = request.get("status").toString();

        String remarks = request.get("remarks") == null
                ? ""
                : request.get("remarks").toString();

        Complaint updatedComplaint =
                employeeComplaintService.updateComplaintStatus(
                        complaintId,
                        employeeId,
                        status,
                        remarks
                );

        return ResponseEntity.ok(updatedComplaint);
    }
}