package com.epms.backend.config;

import com.epms.backend.service.UserService;
import com.epms.backend.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserService userService;

    public JwtAuthenticationFilter(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        
        String requestURI = request.getRequestURI();
        logger.info("Processing request to URI: " + requestURI);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            logger.info("No JWT token found in request to " + requestURI);
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        logger.info("JWT token found in request to " + requestURI);
        
        try {
            userEmail = jwtUtil.extractUsername(jwt);
            String tokenType = jwtUtil.getTokenType(jwt);
            boolean isExpired = jwtUtil.isTokenExpired(jwt);
            boolean isValid = jwtUtil.validateToken(jwt);
            
            logger.info("JWT analysis - Email: " + userEmail + ", Type: " + tokenType + 
                ", Expired: " + isExpired + ", Valid: " + isValid);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Only accept access tokens for API requests
                if ("access".equals(tokenType) && isValid) {
                    String role = jwtUtil.extractRole(jwt);
                    logger.info("Setting authentication for user: " + userEmail + " with role: " + role);
                    
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userEmail,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("Authentication set successfully for user: " + userEmail);
                } else {
                    logger.warn("Token validation failed - Type: " + tokenType + ", Valid: " + isValid);
                }
            } else {
                if (userEmail == null) {
                    logger.warn("Username could not be extracted from token");
                }
                if (SecurityContextHolder.getContext().getAuthentication() != null) {
                    logger.info("SecurityContext already contains authentication");
                }
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: " + e.getMessage(), e);
        }

        filterChain.doFilter(request, response);
    }
}