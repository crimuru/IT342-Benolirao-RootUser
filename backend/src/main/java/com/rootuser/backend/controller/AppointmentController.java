package com.rootuser.backend.controller;

import com.rootuser.backend.entity.Appointment;
import com.rootuser.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
// 🚀 UPDATED: Detailed CORS configuration to stop the "Preflight" errors
@CrossOrigin(
    origins = {"http://localhost:3000", "http://localhost:5173"},
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;


    // 👑 1. ADMIN ENDPOINT: Gets EVERY appointment in the database
    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // 👤 2. USER ENDPOINT: Gets ONLY the appointments for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getUserAppointments(@PathVariable Long userId) {
        // We use the custom repository method we made earlier!
        List<Appointment> userAppointments = appointmentRepository.findByUser_Id(userId);
        return ResponseEntity.ok(userAppointments);
    }

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(savedAppointment);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable Long id) {
        return appointmentRepository.findById(id)
                .map(appointment -> {
                    appointment.setStatus("cancelled");
                    return ResponseEntity.ok(appointmentRepository.save(appointment));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    
}