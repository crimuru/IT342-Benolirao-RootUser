package com.rootuser.backend.repository;

import com.rootuser.backend.entity.AvailableSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AvailableSlotRepository extends JpaRepository<AvailableSlot, Long> {
    List<AvailableSlot> findByDate(String date);
    List<AvailableSlot> findByDateAndIsBookedFalse(String date);
    Optional<AvailableSlot> findByDateAndTime(String date, String time);
}
