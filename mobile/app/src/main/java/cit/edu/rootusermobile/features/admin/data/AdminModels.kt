package cit.edu.rootusermobile.features.admin.data

data class AdminDashboardStats(
    val totalUsers: Long,
    val totalAppointments: Long,
    val pendingAppointments: Long
)

data class UpdateStatusRequest(
    val status: String
)
