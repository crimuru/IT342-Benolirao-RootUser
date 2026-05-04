package cit.edu.rootusermobile.features.appointment.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import cit.edu.rootusermobile.databinding.FragmentBookingBinding
import cit.edu.rootusermobile.features.appointment.data.AvailableSlot
import cit.edu.rootusermobile.features.auth.presentation.AuthViewModel
import kotlinx.coroutines.launch
import org.koin.androidx.viewmodel.ext.android.activityViewModel

class BookingFragment : Fragment() {

    private var _binding: FragmentBookingBinding? = null
    private val binding get() = _binding!!

    private val authViewModel: AuthViewModel by activityViewModel()
    private val appointmentViewModel: AppointmentViewModel by activityViewModel()
    private lateinit var slotAdapter: SlotAdapter
    private var selectedSlot: AvailableSlot? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentBookingBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.toolbar.setNavigationOnClickListener {
            findNavController().navigateUp()
        }

        slotAdapter = SlotAdapter { slot ->
            selectedSlot = slot
        }
        binding.rvSlots.layoutManager = GridLayoutManager(context, 3)
        binding.rvSlots.adapter = slotAdapter

        binding.btnCheckSlots.setOnClickListener {
            val date = binding.etDate.text.toString()
            if (date.isNotBlank()) {
                appointmentViewModel.fetchAvailableSlots(date)
            }
        }

        binding.btnConfirmBooking.setOnClickListener {
            val user = authViewModel.currentUser
            val date = binding.etDate.text.toString()
            val concern = binding.etConcern.text.toString()
            
            if (user != null && selectedSlot != null && date.isNotBlank()) {
                appointmentViewModel.bookAppointment(user, date, selectedSlot!!.time, concern)
            } else {
                Toast.makeText(context, "Please select a date and a time slot", Toast.LENGTH_SHORT).show()
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            appointmentViewModel.availableSlots.collect { slots ->
                slotAdapter.submitList(slots)
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            appointmentViewModel.uiState.collect { state ->
                when (state) {
                    is AppointmentState.Loading -> {
                        binding.progressBar.visibility = View.VISIBLE
                        binding.btnConfirmBooking.isEnabled = false
                    }
                    is AppointmentState.Success -> {
                        binding.progressBar.visibility = View.GONE
                        binding.btnConfirmBooking.isEnabled = true
                        Toast.makeText(context, state.message, Toast.LENGTH_SHORT).show()
                        appointmentViewModel.resetState()
                        findNavController().navigateUp()
                    }
                    is AppointmentState.Error -> {
                        binding.progressBar.visibility = View.GONE
                        binding.btnConfirmBooking.isEnabled = true
                        Toast.makeText(context, state.message, Toast.LENGTH_SHORT).show()
                    }
                    else -> {
                        binding.progressBar.visibility = View.GONE
                        binding.btnConfirmBooking.isEnabled = true
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
