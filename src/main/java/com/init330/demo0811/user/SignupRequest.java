package com.init330.demo0811.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "회원가입용 dto")
public class SignupRequest {
    @Schema(description = "사용자명", example = "user")
    @NotBlank(message = "아이디는 필수입니다")
    @Size(min=3, max=20, message="아이디는 3-20자 사이입니")
    private String username;

    @Schema(description = "비밀번호", example = "12345")
    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 6, max = 100, message = "비밀번호는 6자 이상이어야 합니다.")
    private String password1;

    @Schema(description = "비밀번호", example = "12345")
    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 6, max = 100, message = "비밀번호는 6자 이상이어야 합니다.")
    private String password2;

    @Schema(description = "이메일", example = "example@email.com")
    @NotBlank(message = "이메일은 필수입니다.")
    @Email
    private String email;
}
