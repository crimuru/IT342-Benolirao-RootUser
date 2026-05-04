package cit.edu.rootusermobile.features.appointment.data

import retrofit2.Response
import retrofit2.http.*

interface AppointmentApi {
    
    @GET("appointments/user/{userId}")
    suspend fun getUserAppointments(@Path("userId") userId: Long): Response<List<Appointment>>

    @POST("appointments")
    suspend fun bookAppointment(@Body appointment: Appointment): Response<Appointment>

    @PUT("appointments/{id}/cancel")
    suspend fun cancelAppointment(@Path("id") appointmentId: Long): Response<Appointment>

    @GET("slots/available")
    suspend fun getAvailableSlots(@Query("date") date: String): Response<List<AvailableSlot>>
}
