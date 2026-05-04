package cit.edu.rootusermobile.features.admin.presentation

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import cit.edu.rootusermobile.databinding.ItemAdminAppointmentBinding
import cit.edu.rootusermobile.features.appointment.data.Appointment

class AdminAppointmentAdapter(
    private val onUpdateStatus: (Long, String) -> Unit
) : RecyclerView.Adapter<AdminAppointmentAdapter.ViewHolder>() {

    private var appointments: List<Appointment> = emptyList()

    fun submitList(list: List<Appointment>) {
        appointments = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemAdminAppointmentBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(appointments[position], onUpdateStatus)
    }

    override fun getItemCount(): Int = appointments.size

    class ViewHolder(private val binding: ItemAdminAppointmentBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(appointment: Appointment, onUpdateStatus: (Long, String) -> Unit) {
            val dateParts = appointment.date.split("-")
            if (dateParts.size >= 3) {
                val months = arrayOf("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC")
                val monthIndex = dateParts[1].toIntOrNull()?.minus(1) ?: 0
                binding.tvMonth.text = if (monthIndex in 0..11) months[monthIndex] else dateParts[1]
                binding.tvDay.text = dateParts[2]
            } else {
                binding.tvMonth.text = ""
                binding.tvDay.text = appointment.date
            }
            binding.tvTime.text = appointment.time
            binding.tvStatus.text = appointment.status.uppercase()
            binding.tvPatientName.text = "${appointment.user?.firstName} ${appointment.user?.lastName}"
            binding.tvConcern.text = appointment.concern ?: "No concern provided"

            when (appointment.status.lowercase()) {
                "approved" -> binding.tvStatus.setTextColor(Color.parseColor("#0D9488"))
                "cancelled" -> binding.tvStatus.setTextColor(Color.parseColor("#EF4444"))
                else -> binding.tvStatus.setTextColor(Color.parseColor("#B45309")) // Warning/Pending
            }

            if (appointment.status.lowercase() == "pending") {
                binding.actionLayout.visibility = View.VISIBLE
                binding.btnApprove.setOnClickListener {
                    appointment.id?.let { id -> onUpdateStatus(id, "approved") }
                }
                binding.btnReject.setOnClickListener {
                    appointment.id?.let { id -> onUpdateStatus(id, "cancelled") }
                }
            } else {
                binding.actionLayout.visibility = View.GONE
            }
        }
    }
}
