package com.example.fams.utils.exceptions;

public class TrainingProgramNotFoundException extends Exception {

    public TrainingProgramNotFoundException() {
        super("Training program not found");
    }

    public TrainingProgramNotFoundException(String message) {
        super(message);
    }

    public TrainingProgramNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
