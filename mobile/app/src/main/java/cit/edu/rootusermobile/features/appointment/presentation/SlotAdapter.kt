package cit.edu.rootusermobile.features.appointment.presentation

import android.graphics.Color
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import cit.edu.rootusermobile.databinding.ItemSlotBinding
import cit.edu.rootusermobile.features.appointment.data.AvailableSlot

class SlotAdapter(private val onSlotSelected: (AvailableSlot) -> Unit) : RecyclerView.Adapter<SlotAdapter.ViewHolder>() {

    private var slots: List<AvailableSlot> = emptyList()
    private var selectedPosition = RecyclerView.NO_POSITION

    fun submitList(list: List<AvailableSlot>) {
        slots = list
        selectedPosition = RecyclerView.NO_POSITION
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemSlotBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val slot = slots[position]
        val isSelected = position == selectedPosition
        holder.bind(slot, isSelected)
        
        holder.itemView.setOnClickListener {
            val previousPos = selectedPosition
            selectedPosition = position
            notifyItemChanged(previousPos)
            notifyItemChanged(selectedPosition)
            onSlotSelected(slot)
        }
    }

    override fun getItemCount(): Int = slots.size

    class ViewHolder(private val binding: ItemSlotBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(slot: AvailableSlot, isSelected: Boolean) {
            binding.tvTime.text = slot.time
            
            if (isSelected) {
                binding.cardSlot.setCardBackgroundColor(Color.parseColor("#0D9488")) // Primary
                binding.tvTime.setTextColor(Color.WHITE)
            } else {
                binding.cardSlot.setCardBackgroundColor(Color.WHITE)
                binding.tvTime.setTextColor(Color.parseColor("#0F172A")) // text_main
            }
        }
    }
}
