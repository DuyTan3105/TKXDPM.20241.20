package org.example.backend.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.backend.dtos.requests.user.LoginAccountRequest;
import org.example.backend.dtos.requests.user.RegisterAccountRequest;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.services.UserService;
import org.example.backend.utils.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${api.prefix}/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<AIMSResponse<Object>> createAccount(@Valid @RequestBody RegisterAccountRequest request) {
        StringUtils.trimAllStringFields(request);

        return userService.createAccount(request);
    }

    @PostMapping("/login")
    public ResponseEntity<AIMSResponse<Object>> login(@Valid @RequestBody LoginAccountRequest request) {
        StringUtils.trimAllStringFields(request);

        return userService.loginAccount(request);
    }

}
