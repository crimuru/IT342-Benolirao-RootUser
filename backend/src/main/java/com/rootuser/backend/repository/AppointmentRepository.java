package com.rootuser.backend.repository;

import com.rootuser.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByStatus(String status);
    // 🚀 ADD THIS LINE: Tells Spring Boot how to find appointments for a specific user
    List<Appointment> findByUser_Id(Long userId);
}