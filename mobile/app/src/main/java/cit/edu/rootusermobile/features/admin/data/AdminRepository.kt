package cit.edu.rootusermobile.features.admin.data

import cit.edu.rootusermobile.features.appointment.data.Appointment
import cit.edu.rootusermobile.features.auth.data.User
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class AdminRepository(private val api: AdminApi) {

    suspend fun getDashboardStats(): Result<AdminDashboardStats> = withContext(Dispatchers.IO) {
        try {
            val response = api.getDashboardStats()
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to fetch stats"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getAllUsers(): Result<List<User>> = withContext(Dispatchers.IO) {
        try {
            val response = api.getAllUsers()
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to fetch users"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getAllAppointments(): Result<List<Appointment>> = withContext(Dispatchers.IO) {
        try {
            val response = api.getAllAppointments()
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to fetch appointments"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun updateAppointmentStatus(id: Long, status: String): Result<Appointment> = withContext(Dispatchers.IO) {
        try {
            val response = api.updateAppointmentStatus(id, UpdateStatusRequest(status))
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to update status"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
