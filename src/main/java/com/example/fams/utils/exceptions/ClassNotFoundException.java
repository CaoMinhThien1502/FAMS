package com.example.fams.utils.exceptions;

public class ClassNotFoundException extends Exception {

    public ClassNotFoundException() {
        super("Class not found");
    }

    public ClassNotFoundException(String message) {
        super(message);
    }

    public ClassNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
