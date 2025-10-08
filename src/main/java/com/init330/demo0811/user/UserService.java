package com.init330.demo0811.user;

import com.init330.demo0811.security.CustomUserDetailsService;
import com.init330.demo0811.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;

    public LoginResponse login(LoginRequest loginRequest) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

        if(!encoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
            throw new BadCredentialsException("무엇인가 틀렸습니다");
        }
        User user = (User) userDetails;
        String token = jwtUtil.generateToken(user.getUsername());
        log.info("{} 로그인 성공", user.getUsername());
        return LoginResponse.of(UserResponse.from(user), token);
    }

    @Transactional
    public User create(SignupRequest req) {
        if(!req.getPassword1().equals(req.getPassword2())) {
            throw new BadCredentialsException("password not match");
        }
        User user = User.create(req.getUsername(), encoder.encode(req.getPassword1()), req.getEmail());
        return userRepository.save(user);
    }
}
