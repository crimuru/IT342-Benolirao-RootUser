package cit.edu.rootusermobile.features.appointment.data

import cit.edu.rootusermobile.features.auth.data.User

data class Appointment(
    val id: Long? = null,
    val user: User? = null,
    val date: String,
    val time: String,
    val concern: String?,
    val status: String = "pending"
)

data class AvailableSlot(
    val id: Long? = null,
    val date: String,
    val time: String,
    val isBooked: Boolean = false
)
