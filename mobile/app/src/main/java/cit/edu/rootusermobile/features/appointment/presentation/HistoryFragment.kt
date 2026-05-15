package cit.edu.rootusermobile.features.appointment.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import cit.edu.rootusermobile.databinding.FragmentHistoryBinding
import cit.edu.rootusermobile.features.auth.presentation.AuthViewModel
import kotlinx.coroutines.launch
import org.koin.androidx.viewmodel.ext.android.activityViewModel

class HistoryFragment : Fragment() {

    private var _binding: FragmentHistoryBinding? = null
    private val binding get() = _binding!!

    private val authViewModel: AuthViewModel by activityViewModel()
    private val appointmentViewModel: AppointmentViewModel by activityViewModel()
    
    private lateinit var completedAdapter: AppointmentAdapter
    private lateinit var cancelledAdapter: AppointmentAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHistoryBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        completedAdapter = AppointmentAdapter()
        cancelledAdapter = AppointmentAdapter()

        binding.rvCompleted.layoutManager = LinearLayoutManager(context)
        binding.rvCompleted.adapter = completedAdapter

        binding.rvCancelled.layoutManager = LinearLayoutManager(context)
        binding.rvCancelled.adapter = cancelledAdapter

        val user = authViewModel.currentUser
        user?.id?.let {
            appointmentViewModel.fetchUserAppointments(it)
        }

        viewLifecycleOwner.lifecycleScope.launch {
            appointmentViewModel.uiState.collect { state ->
                binding.progressBar.visibility = if (state is AppointmentState.Loading) View.VISIBLE else View.GONE
                if (state is AppointmentState.Error) {
                    Toast.makeText(context, state.message, Toast.LENGTH_SHORT).show()
                }
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            appointmentViewModel.appointments.collect { allAppointments ->
                val completed = allAppointments.filter { it.status.lowercase() == "completed" }
                val cancelled = allAppointments.filter { it.status.lowercase() == "cancelled" }

                completedAdapter.submitList(completed)
                cancelledAdapter.submitList(cancelled)

                binding.tvCompletedCount.text = completed.size.toString()
                binding.tvCancelledCount.text = cancelled.size.toString()
                binding.tvTotalCount.text = (completed.size + cancelled.size).toString()

                binding.tvEmptyCompleted.visibility = if (completed.isEmpty()) View.VISIBLE else View.GONE
                binding.tvEmptyCancelled.visibility = if (cancelled.isEmpty()) View.VISIBLE else View.GONE
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
