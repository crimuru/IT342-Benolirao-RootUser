package cit.edu.rootusermobile.features.user.presentation

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import cit.edu.rootusermobile.R
import cit.edu.rootusermobile.databinding.FragmentProfileBinding
import cit.edu.rootusermobile.features.auth.presentation.AuthViewModel
import org.koin.androidx.viewmodel.ext.android.activityViewModel

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    private val authViewModel: AuthViewModel by activityViewModel()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val user = authViewModel.currentUser
        if (user != null) {
            binding.tvFullName.text = "${user.firstName} ${user.lastName}"
            binding.tvEmail.text = user.email
            binding.tvInitials.text = "${user.firstName.firstOrNull()?.uppercase() ?: ""}${user.lastName.firstOrNull()?.uppercase() ?: ""}"
            
            binding.etFirstName.setText(user.firstName)
            binding.etLastName.setText(user.lastName)
            binding.etEmailAddress.setText(user.email)
            binding.etPhone.setText(user.phone ?: "")
        }

        binding.btnSave.setOnClickListener {
            // Future implementation for updating profile
            Toast.makeText(context, "Profile update coming soon!", Toast.LENGTH_SHORT).show()
        }

        binding.btnLogout.setOnClickListener {
            // Logout and navigate to login
            authViewModel.logout()
            findNavController().navigate(R.id.action_profileFragment_to_loginFragment)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
