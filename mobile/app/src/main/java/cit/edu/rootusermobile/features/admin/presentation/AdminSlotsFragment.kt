package cit.edu.rootusermobile.features.admin.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.GridLayoutManager
import cit.edu.rootusermobile.databinding.FragmentAdminSlotsBinding
import cit.edu.rootusermobile.features.appointment.presentation.SlotAdapter
import com.google.android.material.datepicker.MaterialDatePicker
import com.google.android.material.timepicker.MaterialTimePicker
import com.google.android.material.timepicker.TimeFormat
import kotlinx.coroutines.launch
import org.koin.androidx.viewmodel.ext.android.activityViewModel
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class AdminSlotsFragment : Fragment() {

    private var _binding: FragmentAdminSlotsBinding? = null
    private val binding get() = _binding!!

    private val adminViewModel: AdminViewModel by activityViewModel()
    private lateinit var slotAdapter: SlotAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAdminSlotsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        slotAdapter = SlotAdapter { slot ->
            val status = if (slot.isBooked) "Booked" else "Available"
            Toast.makeText(context, "Slot at ${slot.time} is $status", Toast.LENGTH_SHORT).show()
        }
        binding.rvAdminSlots.layoutManager = GridLayoutManager(context, 3)
        binding.rvAdminSlots.adapter = slotAdapter

        binding.tilDate.setEndIconOnClickListener { showDatePicker() }
        binding.etDate.setOnClickListener { showDatePicker() }

        binding.tilTime.setEndIconOnClickListener { showTimePicker() }
        binding.etTime.setOnClickListener { showTimePicker() }

        binding.btnAddSlot.setOnClickListener {
            val date = binding.etDate.text.toString()
            val time = binding.etTime.text.toString()
            if (date.isNotBlank() && time.isNotBlank()) {
                adminViewModel.createSlot(date, time)
                binding.etTime.text?.clear()
            } else {
                Toast.makeText(context, "Please select both date and time", Toast.LENGTH_SHORT).show()
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            adminViewModel.adminSlots.collect { slots ->
                slotAdapter.submitList(slots)
            }
        }

        viewLifecycleOwner.lifecycleScope.launch {
            adminViewModel.uiState.collect { state ->
                when (state) {
                    is AdminState.Error -> {
                        Toast.makeText(context, state.message, Toast.LENGTH_SHORT).show()
                    }
                    else -> {}
                }
            }
        }
    }

    private fun showDatePicker() {
        val picker = MaterialDatePicker.Builder.datePicker()
            .setTitleText("Select Date")
            .build()
        
        picker.addOnPositiveButtonClickListener { selection ->
            val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.US)
            sdf.timeZone = java.util.TimeZone.getTimeZone("UTC")
            val formattedDate = sdf.format(Date(selection))
            binding.etDate.setText(formattedDate)
            
            // Fetch admin slots when date is picked
            adminViewModel.fetchAdminSlots(formattedDate)
        }
        
        picker.show(childFragmentManager, "DATE_PICKER")
    }

    private fun showTimePicker() {
        val picker = MaterialTimePicker.Builder()
            .setTimeFormat(TimeFormat.CLOCK_12H)
            .setHour(12)
            .setMinute(0)
            .setTitleText("Select Time")
            .build()

        picker.addOnPositiveButtonClickListener {
            val isPM = picker.hour >= 12
            val displayHour = if (picker.hour % 12 == 0) 12 else picker.hour % 12
            val amPm = if (isPM) "PM" else "AM"
            val timeString = String.format(Locale.US, "%02d:%02d %s", displayHour, picker.minute, amPm)
            binding.etTime.setText(timeString)
        }

        picker.show(childFragmentManager, "TIME_PICKER")
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
