package org.example.backend.validations;

import jakarta.validation.Constraint;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = NumberValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidNumber {
//    String message() default MessageValidateKeys.ATTRIBUTE_INVALID_PATTERN;
//
//    Class<?>[] groups() default {};
//
//    Class<? extends Payload>[] payload() default {};
}
