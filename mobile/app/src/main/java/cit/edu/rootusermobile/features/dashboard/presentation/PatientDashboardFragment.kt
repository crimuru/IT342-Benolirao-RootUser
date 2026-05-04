package cit.edu.rootusermobile.features.dashboard.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import cit.edu.rootusermobile.R
import cit.edu.rootusermobile.databinding.FragmentPatientDashboardBinding
import cit.edu.rootusermobile.features.appointment.presentation.AppointmentAdapter
import cit.edu.rootusermobile.features.auth.presentation.AuthViewModel
import kotlinx.coroutines.launch
import org.koin.androidx.viewmodel.ext.android.activityViewModel

class PatientDashboardFragment : Fragment() {

    private var _binding: FragmentPatientDashboardBinding? = null
    private val binding get() = _binding!!
    
    private val authViewModel: AuthViewModel by activityViewModel()
    private val dashboardViewModel: DashboardViewModel by activityViewModel()
    private lateinit var adapter: AppointmentAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentPatientDashboardBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val user = authViewModel.currentUser
        binding.tvGreeting.text = "Hello, ${user?.firstName ?: "User"}"

        adapter = AppointmentAdapter()
        binding.rvAppointments.layoutManager = LinearLayoutManager(context)
        binding.rvAppointments.adapter = adapter

        binding.toolbar.setOnMenuItemClickListener {
            // we can add logout menu later
            true
        }

        binding.fabAddAppointment.setOnClickListener {
            findNavController().navigate(R.id.action_patientDashboardFragment_to_bookingFragment)
        }

        user?.id?.let {
            dashboardViewModel.loadDashboard(it)
        }

        viewLifecycleOwner.lifecycleScope.launch {
            dashboardViewModel.uiState.collect { state ->
                when (state) {
                    is DashboardState.Loading -> {
                        binding.progressBar.visibility = View.VISIBLE
                    }
                    is DashboardState.Success -> {
                        binding.progressBar.visibility = View.GONE
                        binding.tvUpcomingCount.text = state.data.upcomingCount.toString()
                        binding.tvCompletedCount.text = state.data.completedCount.toString()
                        adapter.submitList(state.data.upcomingAppointments)
                    }
                    is DashboardState.Error -> {
                        binding.progressBar.visibility = View.GONE
                        Toast.makeText(context, state.message, Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
