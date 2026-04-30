package com.crm.core.auth;

import com.crm.core.auth.dto.AuthResponse;
import com.crm.core.auth.dto.LoginRequest;
import com.crm.core.auth.dto.RegisterRequest;
import com.crm.core.security.TokenService;
import com.crm.core.user.User;
import com.crm.core.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest data) {
        if (this.userRepository.existsByEmail(data.email())) {
            return ResponseEntity.badRequest().body("Email already registered"); // Or throw custom exception
        }

        String encryptedPassword = passwordEncoder.encode(data.password());
        User newUser = new User(data.name(), data.email(), encryptedPassword);

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
