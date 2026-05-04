package cit.edu.rootusermobile.features.dashboard.data

import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface DashboardApi {
    @GET("dashboard/{userId}")
    suspend fun getDashboard(@Path("userId") userId: Long): Response<DashboardResponse>
}
