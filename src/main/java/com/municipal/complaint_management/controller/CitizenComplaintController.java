
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
                            "message", "Failed to fetch complaints",
                            "error", e.getMessage() == null
                                    ? "Unknown error"
                                    : e.getMessage()
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
            // Read and validate request fields
            Object citizenIdValue = request.get("citizenId");
            Object titleValue = request.get("title");
            Object categoryValue = request.get("category");
            Object locationValue = request.get("location");
            Object descriptionValue = request.get("description");

            if (citizenIdValue == null
                    || titleValue == null
                    || categoryValue == null
                    || locationValue == null
                    || descriptionValue == null) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Citizen ID, title, category, location, and description are required"
                        ));
            }

            Long citizenId = Long.valueOf(
                    citizenIdValue.toString()
            );

            String title = titleValue.toString().trim();
            String category = categoryValue.toString().trim();
            String location = locationValue.toString().trim();
            String description = descriptionValue.toString().trim();

            if (title.isEmpty()
                    || category.isEmpty()
                    || location.isEmpty()
                    || description.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "message",
                                "Title, category, location, and description cannot be empty"
                        ));
            }

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

            complaint.setTitle(title);
            complaint.setCitizen(citizen);
            complaint.setCategory(category);
            complaint.setLocation(location);
            complaint.setDescription(description);
            complaint.setStatus("PENDING");
            complaint.setRemarks("");
            complaint.setCreatedAt(LocalDateTime.now());

            // Save complaint
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
                            "message", "Failed to submit complaint",
                            "error", e.getMessage() == null
                                    ? "Unknown error"
                                    : e.getMessage()
                    ));
        }
    }
}
