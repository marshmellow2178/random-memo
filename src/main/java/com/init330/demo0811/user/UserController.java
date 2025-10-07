package com.init330.demo0811.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping("/user/login") //로그인
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginRequest loginRequest,
            BindingResult result
    ){
        if(result.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아이디와 비밀번호를 입력하세요");
        }
        String token = userService.login(loginRequest);
        return ResponseEntity.ok().body("Bearer "+token);
    }

    @GetMapping("/me") //로그인 유지
    public ResponseEntity<?> me(
            @AuthenticationPrincipal UserDetails userDetails
    ){
        return ResponseEntity.ok(Map.of("name", userDetails.getUsername()));
    }

    @PostMapping("/user/create")
    public ResponseEntity<?> create(
            @RequestBody SignupRequest req
    ){
        UserResponse res = UserResponse.from(userService.create(req));
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(
            @AuthenticationPrincipal UserDetails userDetails
    ){
        UserResponse response = UserResponse.from(userService.findByUsername(userDetails.getUsername()));
        return ResponseEntity.ok(response);
    }
}
