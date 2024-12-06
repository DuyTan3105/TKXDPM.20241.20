package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.requests.user.LoginAccountRequest;
import org.example.backend.dtos.requests.user.RegisterAccountRequest;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.dtos.responses.user.LoginResponse;
import org.example.backend.entities.user.User;
import org.example.backend.exceptions.DataNotFoundException;
import org.example.backend.mappers.UserMapper;
import org.example.backend.repositories.UserRepo;
import org.example.backend.services.UserService;
import org.example.backend.utils.JwtTokenUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepository;
    private final UserMapper userMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<AIMSResponse<Object>> createAccount(RegisterAccountRequest request) {

        try {
            Optional<User> oUser = userRepository.findByUsername(request.getUsername());

            if(oUser.isPresent()) {
                return ResponseUtil.errorValidationResponse("Username is already existed");
            }

            User newUser =userMapper.mapToEntity(request);
            newUser.setBlockStatus(false);
            newUser.setPassword(passwordEncoder.encode(request.getPassword()));

            userRepository.save(newUser);

            return ResponseUtil.success201Response("Create account successfully");
        } catch (Exception e) {
            return ResponseUtil.error500Response("Internal server error");
        }

    }

    @Override
    public ResponseEntity<AIMSResponse<Object>> loginAccount(LoginAccountRequest request) {
        try {
            Optional<User> existingUserOptional = userRepository.findByUsername(request.getUsername());
            if (existingUserOptional.isEmpty()) {
                throw new DataNotFoundException("User not found with username: " + request.getUsername());
            }

            User existingUser = existingUserOptional.get();
            if (existingUser.getBlockStatus()) {
                return ResponseUtil.error400Response("User is blocked");
            }

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
            authenticationManager.authenticate(authenticationToken);

            String token = jwtTokenUtil.generateToken(existingUser);
            String refreshToken = jwtTokenUtil.generateRefreshToken(existingUser);

            LoginResponse loginResponse = LoginResponse.builder()
                    .userId(existingUser.getId())
                    .username(existingUser.getUsername())
                    .token(token)
                    .refreshToken(refreshToken)
                    .tokenType(jwtTokenUtil.getTokenType())
                    .role(existingUser.getRole())
                    .build();

            return ResponseUtil.success200Response("Login Successfully", loginResponse);
        } catch (BadCredentialsException e) {
            // Xử lý lỗi đăng nhập, ví dụ như mật khẩu sai
            return ResponseUtil.error400Response("Invalid username or password");
        } catch (Exception e) {
            // Xử lý các lỗi không mong muốn
            return ResponseUtil.error500Response(e.getMessage());
        }
    }
}
