package com.municipal.complaint_management.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.municipal.complaint_management.entity.Complaint;
import com.municipal.complaint_management.entity.User;
import com.municipal.complaint_management.repository.ComplaintRepository;
import com.municipal.complaint_management.repository.UserRepository;

@RestController
@RequestMapping("/api/citizen")
@CrossOrigin(origins = "http://localhost:5173")
public class CitizenComplaintController {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    public CitizenComplaintController(
            ComplaintRepository complaintRepository,
            UserRepository userRepository) {

        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }


    // ==========================================
    // GET ALL COMPLAINTS OF A CITIZEN
    // ==========================================

    @GetMapping("/{citizenId}/complaints")
    public ResponseEntity<?> getCitizenComplaints(
    		@PathVariable("citizenId") Long citizenId) {

        try {

            User citizen = userRepository.findById(citizenId)
                    .orElseThrow(() ->
                            new RuntimeException("Citizen not found"));

            if (!"CITIZEN".equalsIgnoreCase(citizen.getRole())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(Map.of(
                                "message",
                                "Only citizens can access complaints"
                        ));
            }

            return ResponseEntity.ok(
                    complaintRepository.findByCitizen(citizen)
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "message",
                            "Failed to fetch complaints",
                            "error",
                            e.getMessage()
                    ));
        }
    }


    // ==========================================
    // CREATE NEW COMPLAINT
    // ==========================================

    @PostMapping("/complaints")
    public ResponseEntity<?> createComplaint(
            @RequestBody Map<String, Object> request) {

        try {

            Long citizenId = Long.valueOf(
                    request.get("citizenId").toString()
            );

            String category = request.get("category").toString();

            String location = request.get("location").toString();

            String description = request.get("description").toString();


            // Find citizen

            User citizen = userRepository.findById(citizenId)
                    .orElseThrow(() ->
                            new RuntimeException("Citizen not found"));


            // Check role

            if (!"CITIZEN".equalsIgnoreCase(citizen.getRole())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(Map.of(
                                "message",
                                "Only citizens can create complaints"
                        ));
            }


            // Create complaint

            Complaint complaint = new Complaint();

            complaint.setCitizen(citizen);

            complaint.setCategory(category);

            complaint.setLocation(location);

            complaint.setDescription(description);

            complaint.setStatus("PENDING");

            complaint.setRemarks("");

            // Set creation date

            complaint.setCreatedAt(LocalDateTime.now());


            // Save

            Complaint savedComplaint =
                    complaintRepository.save(complaint);


            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(Map.of(
                            "message",
                            "Complaint submitted successfully",

                            "complaintId",
                            savedComplaint.getId()
                    ));

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                            "message",
                            "Failed to submit complaint",

                            "error",
                            e.getMessage()
                    ));
        }
    }
}