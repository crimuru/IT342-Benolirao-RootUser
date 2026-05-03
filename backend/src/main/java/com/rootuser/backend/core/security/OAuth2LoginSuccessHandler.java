package com.rootuser.backend.core.security;

import com.rootuser.backend.features.user.User;
import com.rootuser.backend.features.user.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            String redirectUrl = String.format("http://localhost:3000/dashboard?userId=%d&email=%s&firstName=%s&lastName=%s&role=%s",
                    user.getId(),
                    URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8),
                    URLEncoder.encode(user.getFirstName() != null ? user.getFirstName() : "", StandardCharsets.UTF_8),
                    URLEncoder.encode(user.getLastName() != null ? user.getLastName() : "", StandardCharsets.UTF_8),
                    URLEncoder.encode(user.getRole() != null ? user.getRole() : "USER", StandardCharsets.UTF_8)
            );
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        } else {
            super.onAuthenticationSuccess(request, response, authentication);
        }
    }
}
