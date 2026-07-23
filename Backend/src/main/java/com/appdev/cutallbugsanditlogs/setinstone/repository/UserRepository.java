package com.appdev.cutallbugsanditlogs.setinstone.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.cutallbugsanditlogs.setinstone.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,UUID> {
    public UserEntity findByEmail(String email);
}
