package com.epms.backend.controller;

import com.epms.backend.util.JwtUtil;
import com.epms.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/api/health")
public class HealthCheckController {

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/status")
    public ResponseEntity<StandardResponse> getStatus() {
        return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", "API is running"), HttpStatus.OK);
    }

    @GetMapping("/auth-status")
    public ResponseEntity<StandardResponse> getAuthStatus(HttpServletRequest request) {
        try {
            // Get the authentication object from the security context
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication != null && authentication.isAuthenticated() && 
                authentication.getPrincipal() instanceof UserDetails) {
                
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                
                // Return authentication details
                String responseMessage = "Authentication test successful. User: " + 
                                         userDetails.getUsername() + 
                                         ", Authorities: " + 
                                         authentication.getAuthorities();
                
                return new ResponseEntity<>(
                    new StandardResponse(200, "SUCCESS", responseMessage), 
                    HttpStatus.OK);
            } else {
                return new ResponseEntity<>(
                    new StandardResponse(401, "UNAUTHORIZED", "Not authenticated"), 
                    HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(
                new StandardResponse(500, "ERROR", "Authentication check failed: " + e.getMessage()), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/token-debug")
    public ResponseEntity<StandardResponse> debugToken(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>(
                new StandardResponse(400, "ERROR", "Authorization header missing or invalid"),
                HttpStatus.BAD_REQUEST);
        }
        
        try {
            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);
            boolean isExpired = jwtUtil.isTokenExpired(token);
            boolean isValid = jwtUtil.validateToken(token);
            
            return new ResponseEntity<>(
                new StandardResponse(200, "SUCCESS", 
                    "Token debug info - Username: " + username + 
                    ", Role: " + role + 
                    ", Expired: " + isExpired + 
                    ", Valid: " + isValid),
                HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(
                new StandardResponse(400, "ERROR", "Invalid token: " + e.getMessage()),
                HttpStatus.BAD_REQUEST);
        }
    }
}