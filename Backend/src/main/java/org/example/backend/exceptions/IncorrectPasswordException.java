package org.example.backend.exceptions;

public class IncorrectPasswordException extends AIMSException{
    public IncorrectPasswordException(String message) {
        super(message);
    }
}
