package com.example.fams.dto.User;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Component
public class ChangePasswordDTORequest {

    private String name;

    @NotBlank(message = "Old password is required.")
    private String oldPassword;

    @Pattern.List({
        @Pattern(regexp = "(?=.*[0-9]).+", message = "Password must contain at least one digit."),
        @Pattern(regexp = "(?=.*[a-z]).+", message = "Password must contain at least one lowercase letter."),
        @Pattern(regexp = "(?=.*[A-Z]).+", message = "Password must contain at least one uppercase letter."),
        @Pattern(regexp = "(?=.*[_#?!@$%^&*-]).+", message = "Password must contain at least one special character."),
    })
    private String newPassword;

    private String confirmNewPassword;
}
