package org.example.backend.exceptions;

public class OrderNotFoundException extends AIMSException{
    public OrderNotFoundException(String message) {
        super(message);
    }
}
