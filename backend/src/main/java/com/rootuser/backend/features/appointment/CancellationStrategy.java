package com.rootuser.backend.features.appointment;

import com.rootuser.backend.features.appointment.Appointment;
import org.springframework.stereotype.Service;

// 🚀 The Family of Algorithms interface
public interface CancellationStrategy {
    void executeCancel(Appointment appointment);
}

class FreeCancellationStrategy implements CancellationStrategy {
    public void executeCancel(Appointment appointment) {
        appointment.setStatus("cancelled_free");
    }
}

class LatePenaltyStrategy implements CancellationStrategy {
    public void executeCancel(Appointment appointment) {
        appointment.setStatus("cancelled_with_penalty");
    }
}

@Service
class CancellationService {
    public void processCancel(Appointment apt, boolean isLate) {
        CancellationStrategy strategy = isLate ? new LatePenaltyStrategy() : new FreeCancellationStrategy();
        strategy.executeCancel(apt);
    }
}