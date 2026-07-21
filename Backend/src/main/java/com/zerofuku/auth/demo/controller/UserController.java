package com.zerofuku.auth.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zerofuku.auth.demo.dto.UserListResponse;
import com.zerofuku.auth.demo.entity.UserEntity;
import com.zerofuku.auth.demo.service.UserService;
import com.zerofuku.auth.demo.dto.UserDTO;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("get/all")
    public ResponseEntity<UserListResponse> getAllUsers(@AuthenticationPrincipal UserDetails userDetails) {
        List<UserDTO> allUsers = service.getAllUsers();
        return ResponseEntity.ok(new UserListResponse(allUsers));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        UserEntity currentUser = service.getCurrentUser(userDetails.getUsername());
        return ResponseEntity.ok(new UserDTO(currentUser.getUsername(),currentUser.getEmail()));
    }
    
    
}
