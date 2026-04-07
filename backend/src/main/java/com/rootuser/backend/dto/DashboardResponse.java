package com.rootuser.backend.dto;

import com.rootuser.backend.entity.Appointment;
import lombok.Data;
import java.util.List;

@Data
public class DashboardResponse {
    private int upcomingCount;
    private int completedCount;
    private int totalVisits;
    
    // 🚀 This must be spelled exactly like this for Lombok to create setUpcomingAppointments()
    private List<Appointment> upcomingAppointments; 
}