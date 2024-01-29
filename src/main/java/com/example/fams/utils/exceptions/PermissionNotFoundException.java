package com.example.fams.utils.exceptions;

public class PermissionNotFoundException extends Exception {

    public PermissionNotFoundException() {
        super("Permission not found");
    }

    public PermissionNotFoundException(String message) {
        super(message);
    }

    public PermissionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
