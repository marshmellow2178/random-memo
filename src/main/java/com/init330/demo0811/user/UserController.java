package com.init330.demo0811.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/user")
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping("/login") //로그인
    public ResponseEntity<?> login(
            @RequestBody @Valid LoginRequest loginRequest
    ){
        return ResponseEntity.ok().body(userService.login(loginRequest));
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(
            @Valid @RequestBody SignupRequest req
    ){
        UserResponse res = UserResponse.from(userService.create(req));
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(
            @AuthenticationPrincipal UserDetails userDetails
    ){
        UserResponse response = UserResponse.from((User) userDetails);
        return ResponseEntity.ok(response);
    }
}
