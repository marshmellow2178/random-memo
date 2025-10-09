package com.init330.demo0811.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.OffsetDateTime;

@Schema(description = "유저정보 응답용 dto")
@Getter
public class UserResponse {
    @Schema(description = "사용자명", example = "user")
    private String username;
    @Schema(description = "이메일", example = "example@email.com")
    private String email;
    @Schema(description = "권한", example = "USER_ROLE")
    private String role;
    @Schema(description = "가입일")
    private OffsetDateTime createdAt;

    public static UserResponse from(User user){
        UserResponse userResponse = new UserResponse();
        userResponse.username = user.getUsername();
        userResponse.email = user.getEmail();
        userResponse.role = user.getRole();
        userResponse.createdAt = user.getCreatedDate();
        return userResponse;
    }
}
