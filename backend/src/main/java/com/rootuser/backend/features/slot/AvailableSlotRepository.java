package com.rootuser.backend.features.slot;

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
