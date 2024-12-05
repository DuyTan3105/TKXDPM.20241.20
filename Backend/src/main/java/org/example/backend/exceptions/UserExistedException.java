package org.example.backend.exceptions;

public class UserExistedException extends AIMSException{
    public UserExistedException(String message) {
        super(message);
    }
}
