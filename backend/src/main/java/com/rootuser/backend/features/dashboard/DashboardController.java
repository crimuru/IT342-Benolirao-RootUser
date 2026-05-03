package com.rootuser.backend.features.dashboard;

import com.rootuser.backend.features.dashboard.DashboardResponse;
import com.rootuser.backend.features.dashboard.DashboardFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"}) // Allows React to talk to Spring Boot
public class DashboardController {

    @Autowired
    private DashboardFacade dashboardFacade;

    // 🚀 This is the endpoint React is calling!
    @GetMapping("/{userId}")
    public ResponseEntity<DashboardResponse> getDashboard(@PathVariable Long userId) {
        // The controller stays perfectly clean by just calling the Facade
        return ResponseEntity.ok(dashboardFacade.getDashboardData(userId));
    }
}