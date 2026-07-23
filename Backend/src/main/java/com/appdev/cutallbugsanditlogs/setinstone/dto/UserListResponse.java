package com.appdev.cutallbugsanditlogs.setinstone.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserListResponse {
    private List<UserDTO> users;
}
