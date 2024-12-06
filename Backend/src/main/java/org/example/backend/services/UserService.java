package org.example.backend.services;

import org.example.backend.dtos.requests.user.LoginAccountRequest;
import org.example.backend.dtos.requests.user.RegisterAccountRequest;
import org.example.backend.dtos.responses.AIMSResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<AIMSResponse<Object>> createAccount(RegisterAccountRequest request);

    ResponseEntity<AIMSResponse<Object>> loginAccount(LoginAccountRequest request);
}
