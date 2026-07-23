package com.appdev.cutallbugsanditlogs.setinstone.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.appdev.cutallbugsanditlogs.setinstone.dto.UserDTO;
import com.appdev.cutallbugsanditlogs.setinstone.entity.UserEntity;
import com.appdev.cutallbugsanditlogs.setinstone.repository.UserRepository;

@Service
public class UserService {
    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<UserDTO> getAllUsers(){
        List<UserEntity> users = repository.findAll();
        List<UserDTO> newList = new ArrayList<>();
        for(UserEntity user : users){
            newList.add(new UserDTO(user.getUsername(),user.getEmail()));
        }
        return newList;

    }

    public UserEntity updateCurrentUser(UserDTO newUser){
        return repository.save(null);
    }

    public UserEntity getCurrentUser(String email){
        return repository.findByEmail(email);
    }



}
