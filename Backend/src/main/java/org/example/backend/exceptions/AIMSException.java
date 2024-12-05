package org.example.backend.exceptions;;

public class AIMSException extends RuntimeException {

    public AIMSException() {
        super("Something went wrong!");
    }
    public AIMSException(String message) {
        super(message);
    }
}