

package com.rootuser.backend.features.appointment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder // 🚀 Lombok generates the Builder Pattern for you
public class AppointmentResponse {
    private Long id;
    private String date;
    private String time;
    private String concern;
    private String status;
}