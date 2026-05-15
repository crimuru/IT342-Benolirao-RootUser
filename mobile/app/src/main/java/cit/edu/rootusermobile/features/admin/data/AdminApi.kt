package cit.edu.rootusermobile.features.admin.data

import cit.edu.rootusermobile.features.appointment.data.Appointment
import cit.edu.rootusermobile.features.auth.data.User
import retrofit2.Response
import retrofit2.http.*

interface AdminApi {
    @GET("admin/dashboard-stats")
    suspend fun getDashboardStats(): Response<AdminDashboardStats>

    @GET("admin/users")
    suspend fun getAllUsers(): Response<List<User>>

    @DELETE("admin/users/{id}")
    suspend fun deleteUser(@Path("id") id: Long): Response<Unit>

    @GET("admin/appointments")
    suspend fun getAllAppointments(): Response<List<Appointment>>

    @PUT("admin/appointments/{id}/status")
    suspend fun updateAppointmentStatus(
        @Path("id") id: Long,
        @Body request: UpdateStatusRequest
    ): Response<Appointment>

    @GET("slots/admin")
    suspend fun getAdminSlots(@Query("date") date: String): Response<List<cit.edu.rootusermobile.features.appointment.data.AvailableSlot>>

    @POST("slots/admin")
    suspend fun createSlot(@Body slot: cit.edu.rootusermobile.features.appointment.data.AvailableSlot): Response<cit.edu.rootusermobile.features.appointment.data.AvailableSlot>
}
