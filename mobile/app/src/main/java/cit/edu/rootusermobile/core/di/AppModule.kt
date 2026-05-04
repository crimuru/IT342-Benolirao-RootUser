package cit.edu.rootusermobile.core.di

import cit.edu.rootusermobile.core.network.RetrofitClient
import cit.edu.rootusermobile.features.auth.data.AuthApi
import cit.edu.rootusermobile.features.auth.data.AuthRepository
import cit.edu.rootusermobile.features.auth.presentation.AuthViewModel
import cit.edu.rootusermobile.features.dashboard.data.DashboardApi
import cit.edu.rootusermobile.features.dashboard.data.DashboardRepository
import cit.edu.rootusermobile.features.dashboard.presentation.DashboardViewModel
import cit.edu.rootusermobile.features.appointment.data.AppointmentApi
import cit.edu.rootusermobile.features.appointment.data.AppointmentRepository
import cit.edu.rootusermobile.features.appointment.presentation.AppointmentViewModel
import cit.edu.rootusermobile.features.admin.data.AdminApi
import cit.edu.rootusermobile.features.admin.data.AdminRepository
import cit.edu.rootusermobile.features.admin.presentation.AdminViewModel
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.dsl.module

val appModule = module {
    // Network
    single { RetrofitClient.createService<AuthApi>() }
    single { RetrofitClient.createService<DashboardApi>() }
    single { RetrofitClient.createService<AppointmentApi>() }
    single { RetrofitClient.createService<AdminApi>() }

    // Repositories
    single { AuthRepository(get()) }
    single { DashboardRepository(get()) }
    single { AppointmentRepository(get()) }
    single { AdminRepository(get()) }

    // ViewModels
    viewModel { AuthViewModel(get()) }
    viewModel { DashboardViewModel(get()) }
    viewModel { AppointmentViewModel(get()) }
    viewModel { AdminViewModel(get()) }
}
