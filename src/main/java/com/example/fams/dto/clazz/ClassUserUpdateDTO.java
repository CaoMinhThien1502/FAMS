package com.example.fams.dto.clazz;

import lombok.Data;

@Data
public class ClassUserUpdateDTO {
    private Long classId;
    private Long userId;
    private String userType;
}
