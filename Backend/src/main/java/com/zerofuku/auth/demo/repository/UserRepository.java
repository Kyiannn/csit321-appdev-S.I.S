package com.zerofuku.auth.demo.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zerofuku.auth.demo.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,UUID> {
    public UserEntity findByEmail(String email);
}
