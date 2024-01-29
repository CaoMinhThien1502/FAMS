package com.example.fams.utils;

import org.passay.*;

import java.util.Arrays;
import java.util.List;

public class GenerateRandomPasswordUtils {

    public String generatePassword(String email, String name) {
        CharacterData specialChars = new CharacterData() {
            @Override
            public String getErrorCode() {
                return "";
            }

            public String getCharacters() {
                return "_#?!@$%^&*-";
            }
        };
        List rules = Arrays.asList(new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                new CharacterRule(EnglishCharacterData.Digit, 1),
                new CharacterRule(specialChars, 1));
        PasswordGenerator generator = new PasswordGenerator();
        String password;
        do {
            password = generator.generatePassword(10, rules);
        } while (!isPasswordValid(password, email, name));
        return password;
    }
    public boolean isPasswordValid(String password, String email, String name) {
        boolean isPasswordValid = false;
        PasswordValidator validator = new PasswordValidator(Arrays.asList(new LengthRule(8, Integer.MAX_VALUE),
                new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                new CharacterRule(EnglishCharacterData.Digit, 1),
                new CharacterRule(EnglishCharacterData.Special, 1),
                new WhitespaceRule()));

        RuleResult result = validator.validate(new PasswordData(password));
        if (result.isValid() && isNoconsecutiveCharacter(password, email, name)) {
            isPasswordValid = true;
            System.out.println("The supplied password - " + password + " is valid.");
        } else {
            System.out.println("The supplied password - " + password + " is invalid.");
        }
        return isPasswordValid;
    }
    public static boolean isNoconsecutiveCharacter(String password, String email, String name) {
        // Kiểm tra xem mật khẩu có chứa nhiều hơn 2 ký tự liên tiếp từ username hoặc name
        for (int i = 0; i < password.length() - 2; i++) {
            String substring = password.substring(i, i + 3);
            if (email.contains(substring) || name.contains(substring)) {
                return false;
            }
        }
        return true;
    }
}
