package com.init330.demo0811.user;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "로그인 요청 dto")
public class LoginRequest {
    @Schema(description = "사용자", example = "user")
    private String username;
    @Schema(description = "비밀번호", example = "12345")
    private String password;
}
