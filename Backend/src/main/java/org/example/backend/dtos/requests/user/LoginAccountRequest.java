package org.example.backend.dtos.requests.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;
import org.example.backend.validations.ValidPassword;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
@Schema(description = "Thông tin đăng ký tài khoản người dùng mới")
public class LoginAccountRequest {
    @Length(min = 6, max = 20, message = "Username must be between 6 and 20 characters")
    @JsonProperty("username")
    private String username;

    @ValidPassword
    @JsonProperty("password")
    private String password;
}
