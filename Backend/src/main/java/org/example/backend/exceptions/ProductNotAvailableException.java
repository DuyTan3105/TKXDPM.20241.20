package org.example.backend.exceptions;;


public class ProductNotAvailableException extends AIMSException {

    public ProductNotAvailableException(String message) {
        super(message);
    }

}