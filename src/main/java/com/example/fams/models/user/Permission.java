package com.example.fams.models.user;

public enum Permission {
    SYLLABUS_FULL_ACCESS,
    SYLLABUS_MODIFY,
    SYLLABUS_CREATE,
    SYLLABUS_VIEW,
    SYLLABUS_ACCESS_DENIED,

    TRAINING_PROGRAM_FULL_ACCESS,
    TRAINING_PROGRAM_MODIFY,
    TRAINING_PROGRAM_CREATE,
    TRAINING_PROGRAM_VIEW,
    TRAINING_PROGRAM_ACCESS_DENIED,

    CLASS_FULL_ACCESS,
    CLASS_MODIFY,
    CLASS_CREATE,
    CLASS_VIEW,
    CLASS_ACCESS_DENIED,

    LEARNING_MATERIAL_FULL_ACCESS,
    LEARNING_MATERIAL_MODIFY,
    LEARNING_MATERIAL_CREATE,
    LEARNING_MATERIAL_VIEW,
    LEARNING_MATERIAL_ACCESS_DENIED,

    USER_MANAGEMENT_FULL_ACCESS,
    USER_MANAGEMENT_MODIFY,
    USER_MANAGEMENT_CREATE,
    USER_MANAGEMENT_VIEW,
    USER_MANAGEMENT_ACCESS_DENIED,
}
