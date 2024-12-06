package org.example.backend.dtos.responses.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import org.example.backend.constants.enums.Role;

@Data
@Builder
public class LoginResponse {
    @JsonProperty("user_id")
    private String userId;
    @JsonProperty("token")
    private String token;
    @JsonProperty("refresh_token")
    private String refreshToken;
    @JsonProperty("username")
    private String username;
    @JsonProperty("role")
    private Role role;
    @JsonProperty("token_type")
    private String tokenType;
}
