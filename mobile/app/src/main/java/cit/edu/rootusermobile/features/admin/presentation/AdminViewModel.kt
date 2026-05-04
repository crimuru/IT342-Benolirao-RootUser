package cit.edu.rootusermobile.features.admin.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import cit.edu.rootusermobile.features.admin.data.AdminDashboardStats
import cit.edu.rootusermobile.features.admin.data.AdminRepository
import cit.edu.rootusermobile.features.appointment.data.Appointment
import cit.edu.rootusermobile.features.auth.data.User
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class AdminState {
    object Loading : AdminState()
    object Idle : AdminState()
    data class Error(val message: String) : AdminState()
}

class AdminViewModel(private val repository: AdminRepository) : ViewModel() {

    private val _uiState = MutableStateFlow<AdminState>(AdminState.Idle)
    val uiState: StateFlow<AdminState> = _uiState

    private val _stats = MutableStateFlow<AdminDashboardStats?>(null)
    val stats: StateFlow<AdminDashboardStats?> = _stats

    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users

    private val _appointments = MutableStateFlow<List<Appointment>>(emptyList())
    val appointments: StateFlow<List<Appointment>> = _appointments

    fun loadDashboardStats() {
        viewModelScope.launch {
            _uiState.value = AdminState.Loading
            val result = repository.getDashboardStats()
            result.onSuccess { data ->
                _stats.value = data
                _uiState.value = AdminState.Idle
            }.onFailure { error ->
                _uiState.value = AdminState.Error(error.message ?: "Failed to load stats")
            }
        }
    }

    fun loadAllUsers() {
        viewModelScope.launch {
            _uiState.value = AdminState.Loading
            val result = repository.getAllUsers()
            result.onSuccess { data ->
                _users.value = data
                _uiState.value = AdminState.Idle
            }.onFailure { error ->
                _uiState.value = AdminState.Error(error.message ?: "Failed to load users")
            }
        }
    }

    fun loadAllAppointments() {
        viewModelScope.launch {
            _uiState.value = AdminState.Loading
            val result = repository.getAllAppointments()
            result.onSuccess { data ->
                _appointments.value = data
                _uiState.value = AdminState.Idle
            }.onFailure { error ->
                _uiState.value = AdminState.Error(error.message ?: "Failed to load appointments")
            }
        }
    }

    fun updateAppointmentStatus(id: Long, status: String) {
        viewModelScope.launch {
            _uiState.value = AdminState.Loading
            val result = repository.updateAppointmentStatus(id, status)
            result.onSuccess {
                loadAllAppointments() // refresh list
                loadDashboardStats()  // refresh stats
            }.onFailure { error ->
                _uiState.value = AdminState.Error(error.message ?: "Failed to update status")
            }
        }
    }
}
