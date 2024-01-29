package com.example.fams.utils.exceptions;

public class AlreadyExistException extends Exception {

    public AlreadyExistException() {
        super("Already exist");
    }

    public AlreadyExistException(String message) {
        super(message);
    }

    public AlreadyExistException(String message, Throwable cause) {
        super(message, cause);
    }
}
