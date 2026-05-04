package cit.edu.rootusermobile.features.dashboard.data

import cit.edu.rootusermobile.features.appointment.data.Appointment

data class DashboardResponse(
    val upcomingCount: Int,
    val completedCount: Int,
    val totalVisits: Int,
    val upcomingAppointments: List<Appointment>
)
