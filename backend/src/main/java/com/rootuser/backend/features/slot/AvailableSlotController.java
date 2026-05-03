package com.rootuser.backend.features.slot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AvailableSlotController {

    @Autowired
    private AvailableSlotRepository availableSlotRepository;

    // 👤 USER ENDPOINT: Get only available slots for a specific date
    @GetMapping("/available")
    public ResponseEntity<List<AvailableSlot>> getAvailableSlots(@RequestParam String date) {
        return ResponseEntity.ok(availableSlotRepository.findByDateAndIsBookedFalse(date));
    }

    // 👑 ADMIN ENDPOINT: Get ALL slots for a date (booked and unbooked)
    @GetMapping("/admin")
    public ResponseEntity<List<AvailableSlot>> getAdminSlots(@RequestParam String date) {
        return ResponseEntity.ok(availableSlotRepository.findByDate(date));
    }

    // 👑 ADMIN ENDPOINT: Create a new slot
    @PostMapping("/admin")
    public ResponseEntity<AvailableSlot> createSlot(@RequestBody AvailableSlot slot) {
        // Prevent duplicate slot for the exact same date and time
        Optional<AvailableSlot> existing = availableSlotRepository.findByDateAndTime(slot.getDate(), slot.getTime());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().build(); // Already exists
        }
        return ResponseEntity.ok(availableSlotRepository.save(slot));
    }

    // 👑 ADMIN ENDPOINT: Delete a slot
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteSlot(@PathVariable Long id) {
        if (!availableSlotRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        availableSlotRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
