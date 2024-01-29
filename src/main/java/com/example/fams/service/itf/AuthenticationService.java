package com.example.fams.service.itf;

import com.example.fams.dto.User.request.AuthenticationRequest;
import com.example.fams.dto.User.request.ResetPasswordRequest;
import com.example.fams.dto.User.request.VerifyCodeRequest;
import com.example.fams.dto.User.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthenticationService {
    public AuthenticationResponse authenticate(AuthenticationRequest request);

    public boolean resetPassword(ResetPasswordRequest request);

    public Long sendCode(String email);

    public Long verifyCode(VerifyCodeRequest request);
}
