/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.dtm.jewelrystore.dto.request.LoginRequestDTO;
import com.dtm.jewelrystore.dto.response.TokenResponse;
import com.dtm.jewelrystore.exception.InvalidDataException;
import com.dtm.jewelrystore.repository.UserRepository;
import com.dtm.jewelrystore.service.AuthenticationService;
import com.dtm.jewelrystore.service.JwtService;
import com.dtm.jewelrystore.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

/**
 *
 * @author ACER
 */
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;

    @Override
    public TokenResponse authentication(LoginRequestDTO request) {
        try {
            // Xác thực người dùng
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.getUsername(), request.getPassword()));

            var user = userService.getByUsername(request.getUsername());
            if (user == null) {
                return TokenResponse.builder()
                        .token(null)
                        .message("Username or password invalid")
                        .build();
            }

            // Tạo token mới
            String accessToken = jwtService.generateToken(user);

            return TokenResponse.builder()
                    .token(accessToken)
                    .message("Authentication successfully")
                    .build();
        } catch (AuthenticationException e) {
            // Xử lý ngoại lệ khi xác thực không thành công
            return TokenResponse.builder()
                    .token(null)
                    .message("Username or password invalid")
                    .build();
        }

    }

}
