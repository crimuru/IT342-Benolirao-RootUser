package com.rootuser.backend.adapter;

import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class AppointmentDateAdapter {
    
    // 🚀 Adapts standard String dates into strict Java LocalDate objects safely
    public LocalDate adaptStringDate(String dateString) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            return LocalDate.parse(dateString, formatter);
        } catch (Exception e) {
            System.err.println("Adapter failed to parse date: " + dateString);
            return LocalDate.now(); 
        }
    }
}