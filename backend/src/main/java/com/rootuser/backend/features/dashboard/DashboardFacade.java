
package com.rootuser.backend.features.dashboard;

import com.rootuser.backend.features.appointment.Appointment;
import com.rootuser.backend.features.appointment.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardFacade {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public DashboardResponse getDashboardData(Long userId) {
        DashboardResponse response = new DashboardResponse();
        List<Appointment> all = appointmentRepository.findByUser_Id(userId);
        
        // 1. Grab the actual list of upcoming appointments
        List<Appointment> upcomingList = all.stream()
            .filter(a -> a.getStatus().equals("pending") || a.getStatus().equals("confirmed") || a.getStatus().equals("approved") || a.getStatus().equals("cancelled"))
            .collect(Collectors.toList());

        // 2. Count the completed ones
        long completed = all.stream()
            .filter(a -> a.getStatus().equals("completed"))
            .count();

        // 3. Package EVERYTHING into the response
        response.setUpcomingAppointments(upcomingList); // 🚀 Passes the list to React
        response.setUpcomingCount(upcomingList.size()); // The count is just the size of that list
        response.setCompletedCount((int) completed);
        response.setTotalVisits(all.size());

        return response;
    }
}