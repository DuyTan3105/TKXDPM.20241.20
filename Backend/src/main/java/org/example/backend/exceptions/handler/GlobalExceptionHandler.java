package org.example.backend.exceptions.handler;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.exceptions.DataNotFoundException;
import org.example.backend.exceptions.ExpiredTokenException;
import org.example.backend.exceptions.NoActionForOperationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<AIMSResponse<Object>> handle(IllegalArgumentException e) {
        return ResponseUtil.error400Response(e.getMessage());
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<AIMSResponse<Object>> handle(NoResourceFoundException e) {
        return ResponseUtil.error404Response(e.getMessage());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<AIMSResponse<Object>> handle(ConstraintViolationException e) {
        return ResponseUtil.errorValidationResponse(e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AIMSResponse<Object>> handle(Exception e) {
        log.error(e.getMessage());
        e.printStackTrace();
        return ResponseUtil.error500Response(e.getMessage());
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<AIMSResponse<Object>> handle(MissingServletRequestParameterException e) {
        return ResponseUtil.error400Response(e.getMessage());
    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<AIMSResponse<Object>> handle(DataNotFoundException e) {
        return ResponseUtil.error404Response(e.getMessage());
    }

    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<AIMSResponse<Object>> handle(ExpiredTokenException e) {
        return ResponseUtil.error401Response(e.getMessage());
    }

    @ExceptionHandler(NoActionForOperationException.class)
    public ResponseEntity<AIMSResponse<Object>> handle(NoActionForOperationException e) {
        return ResponseUtil.error400Response(e.getMessage());
    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<AIMSResponse<Object>> handleBindException(BindException e) {
        return ResponseUtil.error400Response(e.getBindingResult().getAllErrors().get(0).getDefaultMessage());
    }
}
