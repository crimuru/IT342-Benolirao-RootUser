package cit.edu.rootusermobile.features.dashboard.data

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class DashboardRepository(private val api: DashboardApi) {
    suspend fun getDashboard(userId: Long): Result<DashboardResponse> = withContext(Dispatchers.IO) {
        try {
            val response = api.getDashboard(userId)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to load dashboard: ${response.message()}"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
