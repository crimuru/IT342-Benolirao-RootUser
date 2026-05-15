package cit.edu.rootusermobile.features.admin.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import cit.edu.rootusermobile.databinding.FragmentAdminAppointmentsBinding
import cit.edu.rootusermobile.features.appointment.data.Appointment
import kotlinx.coroutines.launch
import org.koin.androidx.viewmodel.ext.android.activityViewModel

class AdminAppointmentsFragment : Fragment() {

    private var _binding: FragmentAdminAppointmentsBinding? = null
    private val binding get() = _binding!!

    private val adminViewModel: AdminViewModel by activityViewModel()
    private lateinit var adapter: AdminAppointmentAdapter
    private var allAppointments: List<Appointment> = emptyList()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAdminAppointmentsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapter = AdminAppointmentAdapter { id, status ->
            adminViewModel.updateAppointmentStatus(id, status)
        }
        
        binding.rvAppointments.layoutManager = LinearLayoutManager(context)
        binding.rvAppointments.adapter = adapter

        adminViewModel.loadAllAppointments()

        viewLifecycleOwner.lifecycleScope.launch {
            adminViewModel.appointments.collect { appointments ->
                allAppointments = appointments
                filterAppointments()
            }
        }

        binding.cgFilters.setOnCheckedStateChangeListener { _, _ ->
            filterAppointments()
        }
    }

    private fun filterAppointments() {
        val filteredList = when (binding.cgFilters.checkedChipId) {
            binding.chipPending.id -> allAppointments.filter { it.status.equals("pending", true) }
            binding.chipApproved.id -> allAppointments.filter { it.status.equals("approved", true) }
            binding.chipCompleted.id -> allAppointments.filter { it.status.equals("completed", true) }
            binding.chipCancelled.id -> allAppointments.filter { it.status.equals("cancelled", true) }
            else -> allAppointments
        }
        adapter.submitList(filteredList)
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
