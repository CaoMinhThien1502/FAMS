package com.example.fams.utils.User;


import com.example.fams.dto.User.ChangePasswordDTORequest;
import com.example.fams.models.user.User;
import com.example.fams.repositories.user.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserUtils implements Validator {
    UserRepository userRepository;

    static String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    static int PASSWORD_LENGTH = 8;

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }


    @Override
    public void validate(Object target, Errors errors) {
        ChangePasswordDTORequest userDTOUpdateRequest = (ChangePasswordDTORequest) target;

        if (containsConsecutiveChars(userDTOUpdateRequest.getName(), userDTOUpdateRequest.getNewPassword())) {
            errors.rejectValue("newPassword", "error.newPassword",
                    "Password must not be the same as or contain a part of the username.");
        }
    }

    private static boolean containsConsecutiveChars(String username, String password) {
        String userName = username.toUpperCase();
        String passWord = password.toUpperCase();
        for (int i = 0; i < userName.length() - 2; i++) {
            String substring = userName.substring(i, i + 3);
            if (passWord.contains(substring)) {
                return true;
            }
        }
        return false;
    }

}
