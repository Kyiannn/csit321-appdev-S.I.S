package com.zerofuku.auth.demo.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CookieUtils {
    
    private final Long jwtExpirationMs;

    public CookieUtils(@Value("${jwt.secret.expiration}") Long jwtExpirationMs) {
        this.jwtExpirationMs = jwtExpirationMs;
    }
    public void addCookie(HttpServletResponse response, String name, String value) {
        Cookie cookie = new Cookie(name, value);
        
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Remember: false for local HTTP testing
        cookie.setPath("/");
        cookie.setMaxAge((int) (this.jwtExpirationMs / 1000));
        cookie.setAttribute("SameSite", "Strict");
        
        response.addCookie(cookie);
    }
}