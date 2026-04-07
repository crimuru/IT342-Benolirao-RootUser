package com.rootuser.backend.event;

import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class AppointmentEventManager {
    // 🚀 The Subject maintains a list of Observers
    private final List<AppointmentObserver> observers = new ArrayList<>();

    public void subscribe(AppointmentObserver observer) {
        observers.add(observer);
    }

    public void notifyBookingMade(Long appointmentId) {
        for (AppointmentObserver obs : observers) {
            obs.onBookingEvent(appointmentId);
        }
    }
}

// The Observer Interface
interface AppointmentObserver {
    void onBookingEvent(Long appointmentId);
}

// A concrete Observer listening silently
@Component
class DatabaseAuditObserver implements AppointmentObserver {
    public void onBookingEvent(Long appointmentId) {
        System.out.println("Observer Triggered: Archiving booking ID " + appointmentId + " to secure logs.");
    }
}