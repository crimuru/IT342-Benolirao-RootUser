package com.rootuser.backend.features.dashboard;

import com.rootuser.backend.features.appointment.Appointment;
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