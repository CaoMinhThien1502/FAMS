package com.example.fams.dto.User;

import com.example.fams.models.user.UserPermission;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Component
public class UserDTO {
    private Long userId;
    private String name;
    private String email;
    private String password;
    private String phone;
    private LocalDate dob;
    private String gender;
    private Boolean status;
    private Long roleId;
    private UserPermission role;
}
