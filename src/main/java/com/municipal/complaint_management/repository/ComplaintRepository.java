package com.municipal.complaint_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.municipal.complaint_management.entity.Complaint;
import com.municipal.complaint_management.entity.User;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    List<Complaint> findByEmployee(User employee);

    List<Complaint> findByCitizen(User citizen);
}