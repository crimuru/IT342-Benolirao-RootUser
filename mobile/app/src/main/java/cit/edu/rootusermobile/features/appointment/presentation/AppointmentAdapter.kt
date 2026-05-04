package cit.edu.rootusermobile.features.appointment.presentation

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import cit.edu.rootusermobile.databinding.ItemAppointmentBinding
import cit.edu.rootusermobile.features.appointment.data.Appointment

class AppointmentAdapter : RecyclerView.Adapter<AppointmentAdapter.ViewHolder>() {

    private var appointments: List<Appointment> = emptyList()

    fun submitList(list: List<Appointment>) {
        appointments = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemAppointmentBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(appointments[position])
    }

    override fun getItemCount(): Int = appointments.size

    class ViewHolder(private val binding: ItemAppointmentBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(appointment: Appointment) {
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
            binding.tvConcern.text = appointment.concern ?: "No concern provided"
        }
    }
}
