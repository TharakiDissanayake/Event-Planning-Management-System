package com.epms.backend.service;

import com.epms.backend.dto.requests.LoginRequest;
import com.epms.backend.dto.responses.LoginResponse;
import com.epms.backend.entity.User;
import com.epms.backend.exceptions.NotFoundException;
import com.epms.backend.repository.UserRepository;
import com.epms.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        User user = userRepository.findByUserEmail(loginRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        String accessToken = jwtUtil.generateAccessToken(user.getUserEmail(), user.getUserRole());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUserEmail());

        LoginResponse.UserInfo userInfo = new LoginResponse.UserInfo();
        userInfo.setUserId(user.getUserId());
        userInfo.setUserName(user.getUserName());
        userInfo.setUserEmail(user.getUserEmail());
        userInfo.setUserRole(user.getUserRole());

        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setTokenType("Bearer");
        response.setExpiresIn(900);
        response.setUserInfo(userInfo);

        return response;
    }

    public String refreshAccessToken(String refreshToken) {
        if (!jwtUtil.validateToken(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        String tokenType = jwtUtil.getTokenType(refreshToken);
        if (!"refresh".equals(tokenType)) {
            throw new BadCredentialsException("Invalid token type");
        }

        String email = jwtUtil.extractUsername(refreshToken);
        User user = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return jwtUtil.generateAccessToken(user.getUserEmail(), user.getUserRole());
    }

    public User findByEmail(String email) {
        return userRepository.findByUserEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found with email: " + email));
    }

    public User createUser(String userName, String userEmail, String password, String userRole) {
        if (userRepository.existsByUserEmail(userEmail)) {
            throw new IllegalArgumentException("User already exists with email: " + userEmail);
        }

        User user = new User();
        user.setUserName(userName);
        user.setUserEmail(userEmail);
        user.setPassword(passwordEncoder.encode(password));
        user.setUserRole(userRole);

        return userRepository.save(user);
    }
}