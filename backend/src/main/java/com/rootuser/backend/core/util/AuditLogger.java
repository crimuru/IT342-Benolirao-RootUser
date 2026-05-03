
package com.rootuser.backend.core.util;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton") // 🚀 Guarantees only one instance exists application-wide
public class AuditLogger {
    
    public void logSecurityEvent(String action, Long userId) {
        System.out.println("[AUDIT LOG] User " + userId + " performed: " + action);
    }
}