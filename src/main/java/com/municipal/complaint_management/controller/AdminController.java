
package com.municipal.complaint_management.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.municipal.complaint_management.entity.Complaint;
import com.municipal.complaint_management.entity.User;
import com.municipal.complaint_management.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Get all complaints for the Admin panel
    @GetMapping("/complaints")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(adminService.getAllComplaints());
    }

    // Get employees for the assignment dropdown
    @GetMapping("/employees")
    public ResponseEntity<List<User>> getAllEmployees() {
        return ResponseEntity.ok(adminService.getAllEmployees());
    }

 // Assign an employee to a complaint
    @PostMapping("/complaints/{complaintId}/assign")
    public ResponseEntity<?> assignEmployee(
            @PathVariable("complaintId") Long complaintId,
            @RequestBody Map<String, Long> request) {

        Long employeeId = request.get("employeeId");
        if (employeeId == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "employeeId is required"));
        }

        try {
            Complaint updatedComplaint =
                    adminService.assignEmployee(complaintId, employeeId);

            return ResponseEntity.ok(updatedComplaint);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // Get dynamic dashboard statistics
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Long>> getDashboardStatistics() {
        return ResponseEntity.ok(adminService.getDashboardStatistics());
    }
}
