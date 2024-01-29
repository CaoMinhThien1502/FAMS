package com.example.fams.dto.clazz;

import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.models.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@RequiredArgsConstructor
@Component
public class ClassUserDTO {

    private String userType;
    private ClassSubject clazz;
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public ClassSubject getClazz() {
        return clazz;
    }

    public void setClazz(ClassSubject clazz) {
        this.clazz = clazz;
    }
}
