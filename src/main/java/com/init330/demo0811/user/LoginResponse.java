package com.init330.demo0811.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(staticName = "of")
@Schema(description = "로그인 응답 dto")
public class LoginResponse {
    @Schema(description = "사용자")
    private UserResponse user;
    @Schema(description = "로그인 토큰", example = "some jwt token")
    private String accessToken;
}
