package com.example.fams.controller;

import com.example.fams.dto.User.request.AuthenticationRequest;
import com.example.fams.dto.User.request.ResetPasswordRequest;
import com.example.fams.dto.User.request.SendCodeRequest;
import com.example.fams.dto.User.request.VerifyCodeRequest;
import com.example.fams.dto.User.response.AuthenticationResponse;
import com.example.fams.dto.User.response.SendCodeResponse;
import com.example.fams.dto.User.response.VerifyCodeResponse;
import com.example.fams.service.impl.Auth.AuthenticationServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthenticationController {
    @Autowired
    AuthenticationManager authenticationManager;

    private final AuthenticationServiceImpl service;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthenticationRequest loginRequest) {
        AuthenticationResponse authenticationResponse;
        try {
            authenticationResponse = service.authenticate(loginRequest);
        } catch (AuthenticationException e){
            if (e instanceof LockedException){
                return ResponseEntity.status(400)
                        .body("Your account was disabled!");
            } else {
                return ResponseEntity.status(400)
                        .body("The Username or Password is Incorrect!");
            }
        }

        ResponseCookie accessTokenCookie = ResponseCookie.from("access_token", authenticationResponse.getAccessToken())
                .httpOnly(true)
                .maxAge(604800) // 1 week
                .path("/")
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh_token", authenticationResponse.getRefreshToken())
                .httpOnly(true)
                .maxAge(604800) // 1 week
                .path("/")
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        boolean result = service.resetPassword(resetPasswordRequest);
        if (result){
            return ResponseEntity.ok("Success!");
        }
        return ResponseEntity.badRequest().body("Đã xảy ra lỗi");
    }
    @PostMapping("/send")
    public ResponseEntity<?> sendCode(@Valid @RequestBody SendCodeRequest email) {
        SendCodeResponse sendCodeResponse = new SendCodeResponse();
        try {
            Long userId = service.sendCode(email.getEmail());
            if (userId != 0){
                sendCodeResponse.setUserId(userId);
                return ResponseEntity.ok(sendCodeResponse);
            } else {
                sendCodeResponse.setMessage("The email account does not exist in the system!");
                return ResponseEntity.badRequest().body(sendCodeResponse);
            }
        } catch (Exception e){
            if (e instanceof LockedException) {
                sendCodeResponse.setMessage("This email account has been disabled!");
                return ResponseEntity.badRequest().body(sendCodeResponse);
            } else {
                e.printStackTrace();
                sendCodeResponse.setMessage("Error!");
                return ResponseEntity.badRequest().body(sendCodeResponse);
            }
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@Valid @RequestBody VerifyCodeRequest code) {
        VerifyCodeResponse verifyCodeResponse = new VerifyCodeResponse();
        Long userId = service.verifyCode(code);
        if (userId != 0){
            verifyCodeResponse.setUserId(userId);
            return ResponseEntity.ok(verifyCodeResponse);
        } else {
            verifyCodeResponse.setMessage("Code is incorrect or has expired.");
            return ResponseEntity.badRequest().body(verifyCodeResponse);
        }
    }
}
