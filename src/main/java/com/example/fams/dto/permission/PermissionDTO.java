package com.example.fams.dto.permission;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PermissionDTO {
    private Long permissionId;
    @NotBlank
    private String role;
    private String syllabus;
    private String trainingProgram;
    private String clazz;
    private String learningMaterial;
    private String userManagement;
}
