package com.zerofuku.auth.demo.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.zerofuku.auth.demo.entity.UserEntity;
import com.zerofuku.auth.demo.repository.UserRepository;

// THIS CLASS RUNS ONLY ONCE EVER AFTER AUTHENTICATION
// IT DIRECTLY REPLACES THE STANDARD USER DETAILS SERVICE

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity userEntity = userRepository.findByEmail(username);

        if (userEntity == null) {
            throw new UsernameNotFoundException("USER NOT FOUND WITH USERNAME: " + username);
        }

        return User.builder()
                .username(userEntity.getEmail())
                .password(userEntity.getPassword())
                .roles("USER")
                .build();
    }
}