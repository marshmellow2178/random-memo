package com.init330.demo0811.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(staticName = "of")
public class LoginResponse {
    private UserResponse user;
    private String accessToken;
}
