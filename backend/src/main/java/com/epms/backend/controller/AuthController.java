package com.epms.backend.controller;

import com.epms.backend.dto.requests.LoginRequest;
import com.epms.backend.dto.requests.RefreshTokenRequest;
import com.epms.backend.dto.responses.LoginResponse;
import com.epms.backend.dto.responses.RefreshTokenResponse;
import com.epms.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest,
                                             HttpServletResponse response) {
        try {
            LoginResponse loginResponse = userService.authenticateUser(loginRequest);
            
            // Set refresh token as httpOnly cookie
            Cookie refreshTokenCookie = new Cookie("refreshToken", loginResponse.getRefreshToken());
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setSecure(false); // Set to true in production with HTTPS
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
            response.addCookie(refreshTokenCookie);

            // Don't send refresh token in response body for security
            loginResponse.setRefreshToken(null);

            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Authentication failed");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            String newAccessToken = userService.refreshAccessToken(refreshTokenRequest.getRefreshToken());
            RefreshTokenResponse response = new RefreshTokenResponse();
            response.setAccessToken(newAccessToken);
            response.setTokenType("Bearer");
            response.setExpiresIn(900);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Token refresh failed");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        // Clear refresh token cookie
        Cookie refreshTokenCookie = new Cookie("refreshToken", "");
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false); // Set to true in production with HTTPS
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(0);
        response.addCookie(refreshTokenCookie);

        Map<String, String> result = new HashMap<>();
        result.put("message", "Logged out successfully");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser() {
        // This endpoint can be used to get current user info from token
        // The authentication info is available from SecurityContext
        Map<String, Object> result = new HashMap<>();
        result.put("message", "User info endpoint - implement as needed");
        return ResponseEntity.ok(result);
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, String>> validateToken() {
        // If this endpoint is reached, it means the JWT filter validated the token
        // and the user is authenticated
        Map<String, String> result = new HashMap<>();
        result.put("status", "valid");
        result.put("message", "Token is valid");
        return ResponseEntity.ok(result);
    }
}