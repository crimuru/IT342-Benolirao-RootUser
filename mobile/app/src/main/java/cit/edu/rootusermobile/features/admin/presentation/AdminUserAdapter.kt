package cit.edu.rootusermobile.features.admin.presentation

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import cit.edu.rootusermobile.databinding.ItemAdminUserBinding
import cit.edu.rootusermobile.features.auth.data.User

class AdminUserAdapter(
    private val onDeleteUser: (Long) -> Unit
) : RecyclerView.Adapter<AdminUserAdapter.ViewHolder>() {

    private var users: List<User> = emptyList()

    fun submitList(list: List<User>) {
        users = list
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = ItemAdminUserBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(users[position], onDeleteUser)
    }

    override fun getItemCount(): Int = users.size

    class ViewHolder(private val binding: ItemAdminUserBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(user: User, onDeleteUser: (Long) -> Unit) {
            binding.tvUserId.text = "#${user.id ?: "?"}"
            binding.tvUserName.text = "${user.firstName} ${user.lastName}"
            binding.tvUserEmail.text = user.email
            binding.tvUserRole.text = user.role.uppercase()
            
            binding.btnDeleteUser.setOnClickListener {
                user.id?.let { id -> onDeleteUser(id) }
            }
        }
    }
}
