package cit.edu.rootusermobile.features.admin.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import cit.edu.rootusermobile.databinding.FragmentAdminDashboardBinding
import kotlinx.coroutines.launch
import org.koin.androidx.viewmodel.ext.android.activityViewModel

class AdminDashboardFragment : Fragment() {

    private var _binding: FragmentAdminDashboardBinding? = null
    private val binding get() = _binding!!

    private val adminViewModel: AdminViewModel by activityViewModel()
    private lateinit var adapter: AdminAppointmentAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAdminDashboardBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapter = AdminAppointmentAdapter { id, status ->
            adminViewModel.updateAppointmentStatus(id, status)
        }
        
        binding.rvAdminAppointments.layoutManager = LinearLayoutManager(context)
        binding.rvAdminAppointments.adapter = adapter

        adminViewModel.loadDashboardStats()
        adminViewModel.loadAllAppointments()

        viewLifecycleOwner.lifecycleScope.launch {
            adminViewModel.stats.collect { stats ->
                stats?.let {
                    binding.tvTotalUsers.text = it.totalUsers.toString()
                    binding.tvTotalAppointments.text = it.totalAppointments.toString()
                    binding.tvPendingAppointments.text = it.pendingAppointments.toString()
                }
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            adminViewModel.appointments.collect { appointments ->
                adapter.submitList(appointments)
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            adminViewModel.uiState.collect { state ->
                when (state) {
                    is AdminState.Loading -> binding.progressBar.visibility = View.VISIBLE
                    is AdminState.Idle -> binding.progressBar.visibility = View.GONE
                    is AdminState.Error -> {
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
