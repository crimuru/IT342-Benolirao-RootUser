package com.rootuser.backend.features.slot;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "available_slots")
@Data 
public class AvailableSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String time;

    @Column(nullable = false)
    private boolean isBooked = false;
}
