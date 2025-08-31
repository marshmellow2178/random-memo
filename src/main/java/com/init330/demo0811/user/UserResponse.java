package com.init330.demo0811.user;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserResponse {
    private String username;
    private LocalDateTime createdAt;

    public static UserResponse from(User user){
        UserResponse userResponse = new UserResponse();
        userResponse.username = user.getUsername();
        userResponse.createdAt = user.getCreatedDate();
        return userResponse;
    }
}
