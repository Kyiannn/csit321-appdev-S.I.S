package com.zerofuku.auth.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zerofuku.auth.demo.dto.LoginRequest;
import com.zerofuku.auth.demo.dto.RegisterRequest;
import com.zerofuku.auth.demo.service.AuthService;
import com.zerofuku.auth.demo.utils.CookieUtils;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final CookieUtils cookieUtils;

    @Value("${jwt.secret.expiration}")
    private Long JWT_EXPIRATION_MS;

    public AuthController(
        AuthService authService,
        CookieUtils cookieUtils
    ){
        this.cookieUtils = cookieUtils;
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String>login(
        @RequestBody LoginRequest request,
        HttpServletResponse response
    ) {
        String token = authService.login(request);
        if (token == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        cookieUtils.addCookie(response, "jwt-token", token);
        return ResponseEntity.ok("Logged in Successfully!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
        @RequestBody RegisterRequest request,
        HttpServletResponse response
    ) {
        String token = authService.register(request);
        if (token == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        cookieUtils.addCookie(response, "jwt-token", token);
        return ResponseEntity.ok("Registered successfully!");
    }

}
