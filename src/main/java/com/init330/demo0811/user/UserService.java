package com.init330.demo0811.user;

import com.init330.demo0811.security.CustomUserDetailsService;
import com.init330.demo0811.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final CustomUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;

    public String login(LoginRequest loginRequest) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

        if(!encoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
            throw new BadCredentialsException("password not match");
        }
        return jwtUtil.generateToken(userDetails.getUsername());
    }

    @Transactional
    public User create(SignupRequest req) {
        if(!req.getPassword1().equals(req.getPassword2())) {
            throw new BadCredentialsException("password not match");
        }
        User user = User.create(req.getUsername(), encoder.encode(req.getPassword1()));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("username not found"));
    }
}
