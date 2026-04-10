package com.rootuser.backend.controller;

import com.rootuser.backend.entity.Appointment;
import com.rootuser.backend.entity.User;
import com.rootuser.backend.repository.AppointmentRepository;
import com.rootuser.backend.repository.UserRepository;
import com.rootuser.backend.repository.AvailableSlotRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;
    private final AvailableSlotRepository availableSlotRepository;

    public AdminController(UserRepository userRepository, AppointmentRepository appointmentRepository, AvailableSlotRepository availableSlotRepository) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
        this.availableSlotRepository = availableSlotRepository;
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        long totalUsers = userRepository.count();
        long totalAppointments = appointmentRepository.count();
        List<Appointment> pending = appointmentRepository.findByStatus("pending");
        
        stats.put("totalUsers", totalUsers);
        stats.put("totalAppointments", totalAppointments);
        stats.put("pendingAppointments", pending.size());
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        // optionally remove passwords from response to be safe, but for this demo, OK
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        
        // delete all appointments associated with this user first to avoid constraint violation
        List<Appointment> userAppointments = appointmentRepository.findByUser_Id(id);
        appointmentRepository.deleteAll(userAppointments);
        
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentRepository.findAll());
    }

    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            String newStatus = body.get("status");
            appointment.setStatus(newStatus);
            appointmentRepository.save(appointment);

            if ("cancelled".equalsIgnoreCase(newStatus)) {
                availableSlotRepository.findByDateAndTime(appointment.getDate(), appointment.getTime())
                    .ifPresent(slot -> {
                        slot.setBooked(false);
                        availableSlotRepository.save(slot);
                    });
            }
            return ResponseEntity.ok(appointment);
        }
        return ResponseEntity.notFound().build();
    }

}
