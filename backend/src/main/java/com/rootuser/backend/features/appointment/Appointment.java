package com.rootuser.backend.features.appointment;

import com.rootuser.backend.features.user.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "appointments")
@Data 
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🚀 ADD THIS RELATIONSHIP: Links the appointment to a User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String time;

    @Column(length = 500)
    private String concern;

    @Column(nullable = false)
    private String status = "pending"; 
}