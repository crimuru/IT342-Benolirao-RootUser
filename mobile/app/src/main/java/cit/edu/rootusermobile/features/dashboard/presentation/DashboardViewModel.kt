package cit.edu.rootusermobile.features.dashboard.presentation

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import cit.edu.rootusermobile.features.dashboard.data.DashboardRepository
import cit.edu.rootusermobile.features.dashboard.data.DashboardResponse
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class DashboardState {
    object Loading : DashboardState()
    data class Success(val data: DashboardResponse) : DashboardState()
    data class Error(val message: String) : DashboardState()
}

class DashboardViewModel(private val repository: DashboardRepository) : ViewModel() {

    private val _uiState = MutableStateFlow<DashboardState>(DashboardState.Loading)
    val uiState: StateFlow<DashboardState> = _uiState

    fun loadDashboard(userId: Long) {
        viewModelScope.launch {
            _uiState.value = DashboardState.Loading
            val result = repository.getDashboard(userId)
            result.onSuccess { data ->
                _uiState.value = DashboardState.Success(data)
            }.onFailure { error ->
                _uiState.value = DashboardState.Error(error.message ?: "Failed to load dashboard")
            }
        }
    }
}
