package cit.edu.rootusermobile

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.NavController
import androidx.navigation.fragment.NavHostFragment
import cit.edu.rootusermobile.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var navController: NavController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navHostFragment = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        navController = navHostFragment.navController

        navController.addOnDestinationChangedListener { _, destination, _ ->
            when (destination.id) {
                R.id.loginFragment, R.id.registerFragment -> {
                    binding.bottomNavContainer.visibility = android.view.View.GONE
                    binding.adminBottomNavContainer.visibility = android.view.View.GONE
                }
                R.id.adminDashboardFragment, R.id.adminAppointmentsFragment, 
                R.id.adminUsersFragment, R.id.adminSlotsFragment -> {
                    binding.bottomNavContainer.visibility = android.view.View.GONE
                    binding.adminBottomNavContainer.visibility = android.view.View.VISIBLE
                    updateAdminBottomNavUI(destination.id)
                }
                else -> {
                    binding.bottomNavContainer.visibility = android.view.View.VISIBLE
                    binding.adminBottomNavContainer.visibility = android.view.View.GONE
                    updateBottomNavUI(destination.id)
                }
            }
        }

        binding.navDashboard.setOnClickListener { navigateTo(R.id.patientDashboardFragment) }
        binding.navBook.setOnClickListener { navigateTo(R.id.bookingFragment) }
        binding.navHistory.setOnClickListener { navigateTo(R.id.historyFragment) }
        binding.navProfile.setOnClickListener { navigateTo(R.id.profileFragment) }

        binding.navAdminOverview.setOnClickListener { navigateTo(R.id.adminDashboardFragment) }
        binding.navAdminUsers.setOnClickListener { navigateTo(R.id.adminUsersFragment) }
        binding.navAdminAppointments.setOnClickListener { navigateTo(R.id.adminAppointmentsFragment) }
        binding.navAdminSlots.setOnClickListener { navigateTo(R.id.adminSlotsFragment) }
        binding.navAdminLogout.setOnClickListener { navigateTo(R.id.loginFragment) } // will handle auth logout properly later
    }

    private fun navigateTo(destinationId: Int) {
        if (navController.currentDestination?.id != destinationId) {
            navController.navigate(destinationId)
        }
    }

    private fun updateBottomNavUI(destinationId: Int) {
        // Reset all
        val inactiveColor = android.graphics.Color.parseColor("#9E9E9E")
        val activeColor = androidx.core.content.ContextCompat.getColor(this, R.color.primary)

        binding.navDashboard.setBackgroundResource(android.R.color.transparent)
        binding.labelDashboard.visibility = android.view.View.GONE
        binding.iconDashboard.setColorFilter(inactiveColor)

        binding.navBook.setBackgroundResource(android.R.color.transparent)
        binding.labelBook.visibility = android.view.View.GONE
        binding.iconBook.setColorFilter(inactiveColor)

        binding.navHistory.setBackgroundResource(android.R.color.transparent)
        binding.labelHistory.visibility = android.view.View.GONE
        binding.iconHistory.setColorFilter(inactiveColor)

        binding.navProfile.setBackgroundResource(android.R.color.transparent)
        binding.labelProfile.visibility = android.view.View.GONE
        binding.iconProfile.setColorFilter(inactiveColor)

        // Set active
        when (destinationId) {
            R.id.patientDashboardFragment -> {
                binding.navDashboard.setBackgroundResource(R.drawable.bg_nav_active_pill)
                binding.labelDashboard.visibility = android.view.View.VISIBLE
                binding.iconDashboard.setColorFilter(activeColor)
            }
            R.id.bookingFragment -> {
                binding.navBook.setBackgroundResource(R.drawable.bg_nav_active_pill)
                binding.labelBook.visibility = android.view.View.VISIBLE
                binding.iconBook.setColorFilter(activeColor)
            }
            R.id.historyFragment -> {
                binding.navHistory.setBackgroundResource(R.drawable.bg_nav_active_pill)
                binding.labelHistory.visibility = android.view.View.VISIBLE
                binding.iconHistory.setColorFilter(activeColor)
            }
            R.id.profileFragment -> {
                binding.navProfile.setBackgroundResource(R.drawable.bg_nav_active_pill)
                binding.labelProfile.visibility = android.view.View.VISIBLE
                binding.iconProfile.setColorFilter(activeColor)
            }
        }
    }

    private fun updateAdminBottomNavUI(destinationId: Int) {
        val inactiveColor = android.graphics.Color.parseColor("#9E9E9E")
        val activeColor = androidx.core.content.ContextCompat.getColor(this, R.color.primary)

        val navItems = listOf(
            Triple(binding.navAdminOverview, binding.labelAdminOverview, binding.iconAdminOverview),
            Triple(binding.navAdminUsers, binding.labelAdminUsers, binding.iconAdminUsers),
            Triple(binding.navAdminAppointments, binding.labelAdminAppointments, binding.iconAdminAppointments),
            Triple(binding.navAdminSlots, binding.labelAdminSlots, binding.iconAdminSlots),
            Triple(binding.navAdminLogout, binding.labelAdminLogout, binding.iconAdminLogout)
        )

        navItems.forEach { (nav, label, icon) ->
            nav.setBackgroundResource(android.R.color.transparent)
            label.visibility = android.view.View.GONE
            icon.setColorFilter(inactiveColor)
        }

        when (destinationId) {
            R.id.adminDashboardFragment -> {
                binding.navAdminOverview.setBackgroundResource(R.drawable.bg_nav_active_pill)
                binding.labelAdminOverview.visibility = android.view.View.VISIBLE
                binding.iconAdminOverview.setColorFilter(activeColor)
            }
            R.id.adminUsersFragment -> {
                binding.navAdminUsers.setBackgroundResource(R.drawable.bg_nav_active_pill)
                binding.labelAdminUsers.visibility = android.view.View.VISIBLE
                binding.iconAdminUsers.setColorFilter(activeColor)
            }
            R.id.adminAppointmentsFragment -> {
                binding.navAdminAppointments.setBackgroundResource(R.drawable.bg_nav_active_pill)
                binding.labelAdminAppointments.visibility = android.view.View.VISIBLE
                binding.iconAdminAppointments.setColorFilter(activeColor)
            }
            R.id.adminSlotsFragment -> {
                binding.navAdminSlots.setBackgroundResource(R.drawable.bg_nav_active_pill)
                binding.labelAdminSlots.visibility = android.view.View.VISIBLE
                binding.iconAdminSlots.setColorFilter(activeColor)
            }
        }
    }
}
