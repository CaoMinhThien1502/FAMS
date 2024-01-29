package com.example.fams.service.impl.Auth;

import com.example.fams.dto.User.request.AuthenticationRequest;
import com.example.fams.dto.User.request.ResetPasswordRequest;
import com.example.fams.dto.User.request.VerifyCodeRequest;
import com.example.fams.dto.User.response.AuthenticationResponse;
import com.example.fams.models.token.Token;
import com.example.fams.models.token.TokenType;
import com.example.fams.models.user.User;
import com.example.fams.repositories.token.TokenRepository;
import com.example.fams.repositories.user.UserRepository;
import com.example.fams.security.token.JwtTokenProvider;
import com.example.fams.service.itf.AuthenticationService;
import com.example.fams.utils.SendMailUtils;
import com.example.fams.utils.VerificationCodeUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final JwtTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final VerificationCodeUtils verificationCodeUtils;
    private final SendMailUtils sendMailUtils;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        if (user.getStatus()){
            var jwtToken = tokenProvider.generateToken(user);
            var refreshToken = tokenProvider.generateRefreshToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, refreshToken);
            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .refreshToken(refreshToken)
                    .build();
        } else {
            throw new LockedException("");
        }
    }


    @Override
    public boolean resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByUserId(request.getUserId());
        if (user != null){
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public Long sendCode(String email) {
        Optional<User> user =  userRepository.findByEmail(email);
        if (user.isPresent()){
            if (user.get().getStatus()){
                String code = verificationCodeUtils.generateVerificationCode(user.get().getUserId());
                sendMailUtils.sendSimpleEmail(
                        email,
                        "Verification code - FAMS",
                        "Xin chào,\n" +
                                "\n" +
                                "Bạn đã yêu cầu đổi mật khẩu cho tài khoản của mình trên FAMS. Dưới đây là mã xác nhận của bạn:\n" +
                                "\n" +
                                "Mã Xác Nhận: "+ code + "\n" +
                                "\n" +
                                "Vui lòng sử dụng mã này để xác nhận quy trình đổi mật khẩu. Hãy nhớ rằng mã xác nhận chỉ có hiệu lực trong một khoảng thời gian ngắn.\n" +
                                "\n" +
                                "Nếu bạn không yêu cầu đổi mật khẩu, vui lòng bỏ qua email này. Để bảo vệ tài khoản của bạn, không chia sẻ mã xác nhận với người khác.\n" +
                                "\n" +
                                "Trân trọng,\n" +
                                "FAMS"
                );
                return user.get().getUserId();
            } else {
                throw new LockedException("");
            }
        }
        return 0L;
    }

    @Override
    public Long verifyCode(VerifyCodeRequest request) {
        if (verificationCodeUtils.isValidCode(request.getCode())){
            Long idOfCode = verificationCodeUtils.getUserIdByCode(request.getCode());
            if (Objects.equals(idOfCode, request.getUserId())){
                return idOfCode;
            }
            return 0L;
        } else {
            return 0L;
        }
    }

    public void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
