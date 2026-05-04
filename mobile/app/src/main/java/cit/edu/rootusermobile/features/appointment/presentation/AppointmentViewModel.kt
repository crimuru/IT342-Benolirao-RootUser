package cit.edu.rootusermobile.features.appointment.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import cit.edu.rootusermobile.features.appointment.data.Appointment
import cit.edu.rootusermobile.features.appointment.data.AppointmentRepository
import cit.edu.rootusermobile.features.appointment.data.AvailableSlot
import cit.edu.rootusermobile.features.auth.data.User
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class AppointmentState {
    object Idle : AppointmentState()
    object Loading : AppointmentState()
    data class Success(val message: String) : AppointmentState()
    data class Error(val message: String) : AppointmentState()
}

class AppointmentViewModel(private val repository: AppointmentRepository) : ViewModel() {

    private val _uiState = MutableStateFlow<AppointmentState>(AppointmentState.Idle)
    val uiState: StateFlow<AppointmentState> = _uiState

    private val _appointments = MutableStateFlow<List<Appointment>>(emptyList())
    val appointments: StateFlow<List<Appointment>> = _appointments

    private val _availableSlots = MutableStateFlow<List<AvailableSlot>>(emptyList())
    val availableSlots: StateFlow<List<AvailableSlot>> = _availableSlots

    fun fetchUserAppointments(userId: Long) {
        viewModelScope.launch {
            _uiState.value = AppointmentState.Loading
            val result = repository.getUserAppointments(userId)
            result.onSuccess { data ->
                _appointments.value = data
                _uiState.value = AppointmentState.Idle
            }.onFailure { error ->
                _uiState.value = AppointmentState.Error(error.message ?: "Failed to fetch appointments")
            }
        }
    }

    fun fetchAvailableSlots(date: String) {
        viewModelScope.launch {
            _uiState.value = AppointmentState.Loading
            val result = repository.getAvailableSlots(date)
            result.onSuccess { data ->
                _availableSlots.value = data
                _uiState.value = AppointmentState.Idle
            }.onFailure { error ->
                _uiState.value = AppointmentState.Error(error.message ?: "Failed to fetch slots")
            }
        }
    }

    fun bookAppointment(user: User, date: String, time: String, concern: String) {
        viewModelScope.launch {
            _uiState.value = AppointmentState.Loading
            val newAppointment = Appointment(
                user = user,
                date = date,
                time = time,
                concern = concern,
                status = "pending"
            )
            val result = repository.bookAppointment(newAppointment)
            result.onSuccess {
                _uiState.value = AppointmentState.Success("Appointment booked successfully")
                // Refresh list if needed, or caller handles it
            }.onFailure { error ->
                _uiState.value = AppointmentState.Error(error.message ?: "Failed to book appointment")
            }
        }
    }

    fun cancelAppointment(appointmentId: Long) {
        viewModelScope.launch {
            _uiState.value = AppointmentState.Loading
            val result = repository.cancelAppointment(appointmentId)
            result.onSuccess {
                _uiState.value = AppointmentState.Success("Appointment cancelled")
            }.onFailure { error ->
                _uiState.value = AppointmentState.Error(error.message ?: "Failed to cancel")
            }
        }
    }
    
    fun resetState() {
        _uiState.value = AppointmentState.Idle
    }
}
