package com.municipal.complaint_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.municipal.complaint_management.entity.Complaint;
import com.municipal.complaint_management.entity.ComplaintStatusHistory;

public interface ComplaintStatusHistoryRepository
        extends JpaRepository<ComplaintStatusHistory, Long> {

    List<ComplaintStatusHistory> findByComplaintOrderByUpdatedAtDesc(Complaint complaint);
}