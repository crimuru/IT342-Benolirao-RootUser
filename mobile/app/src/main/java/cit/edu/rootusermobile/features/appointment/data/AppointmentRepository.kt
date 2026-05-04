package cit.edu.rootusermobile.features.appointment.data

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class AppointmentRepository(private val api: AppointmentApi) {
    
    suspend fun getUserAppointments(userId: Long): Result<List<Appointment>> = withContext(Dispatchers.IO) {
        try {
            val response = api.getUserAppointments(userId)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to fetch appointments"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun bookAppointment(appointment: Appointment): Result<Appointment> = withContext(Dispatchers.IO) {
        try {
            val response = api.bookAppointment(appointment)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to book appointment"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun cancelAppointment(appointmentId: Long): Result<Appointment> = withContext(Dispatchers.IO) {
        try {
            val response = api.cancelAppointment(appointmentId)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to cancel appointment"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getAvailableSlots(date: String): Result<List<AvailableSlot>> = withContext(Dispatchers.IO) {
        try {
            val response = api.getAvailableSlots(date)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to fetch available slots"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
