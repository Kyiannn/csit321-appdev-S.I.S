package com.zerofuku.auth.demo.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zerofuku.auth.demo.dto.LoginRequest;
import com.zerofuku.auth.demo.dto.RegisterRequest;
import com.zerofuku.auth.demo.entity.UserEntity;
import com.zerofuku.auth.demo.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthService(
        UserRepository userRepository, 
        PasswordEncoder passwordEncoder, 
        JwtService jwtService,
        AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public String login(LoginRequest loginRequest){
        try {
            Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), 
                    loginRequest.getPassword()
            ));

            return jwtService.generateToken(authentication.getName());

        } catch (AuthenticationException e) {
            return null;
        }
    }

    public String register(RegisterRequest registerRequest) {
        if (userRepository.findByEmail(registerRequest.getEmail()) != null) {
            return null;
        }
        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        userRepository.save(new UserEntity(
            registerRequest.getEmail(),
            registerRequest.getEmail(),
            hashedPassword
        ));
        return jwtService.generateToken(registerRequest.getEmail());
    }

    
    
}
