package org.example.backend.dtos.responses;

import org.example.backend.constants.MessageValidateKeys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Lớp tiện ích để tạo các phản hồi {@link ResponseEntity} với các mã trạng thái và thông điệp khác nhau.
 */
public class ResponseUtil {
    private ResponseUtil() {
    }

    /**
     * Tạo phản hồi thành công với mã trạng thái HTTP 200, thông điệp và dữ liệu.
     *
     * @param message Thông điệp trả về.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 200 và dữ liệu.
     */
    public static ResponseEntity<AIMSResponse<Object>> success200Response(String message) {
        return ResponseEntity
                .ok()
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.OK.value())
                        .status(HttpStatus.OK.getReasonPhrase())
                        .message(message)
                        .build());
    }

    /**
     * Tạo phản hồi thành công với mã trạng thái HTTP 200, thông điệp và dữ liệu.
     *
     * @param message Thông điệp trả về.
     * @param data    Dữ liệu trả về.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 200 và dữ liệu.
     */
    public static ResponseEntity<AIMSResponse<Object>> success200Response(String message, Object data) {
        return ResponseEntity
                .ok()
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.OK.value())
                        .status(HttpStatus.OK.getReasonPhrase())
                        .message(message)
                        .data(data)
                        .build());
    }

    /**
     * Tạo phản hồi thành công với mã trạng thái HTTP 201 và thông điệp.
     *
     * @param message Thông điệp trả về.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 201.
     */
    public static ResponseEntity<AIMSResponse<Object>> success201Response(String message) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.CREATED.value())
                        .status(HttpStatus.CREATED.getReasonPhrase())
                        .message(message)
                        .build());
    }

    /**
     * Tạo phản hồi thành công với mã trạng thái HTTP 201 và thông điệp.
     *
     * @param message Thông điệp trả về.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 201.
     */
    public static ResponseEntity<AIMSResponse<Object>> success201Response(String message, Object data) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.CREATED.value())
                        .status(HttpStatus.CREATED.getReasonPhrase())
                        .message(message)
                        .data(data)
                        .build());
    }

    /**
     * Tạo phản hồi lỗi với mã trạng thái HTTP 400 và thông điệp lỗi xác thực.
     *
     * @param message Thông điệp lỗi xác thực.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 400.
     */
    public static ResponseEntity<AIMSResponse<Object>> errorValidationResponse(String message) {
        return ResponseEntity
                .badRequest()
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.BAD_REQUEST.value())
                        .status(org.example.backend.constants.MessageValidateKeys.ERROR_VALIDATION)
                        .message(message)
                        .build());
    }

    /**
     * Tạo phản hồi lỗi với mã trạng thái HTTP 400 và thông điệp lỗi.
     *
     * @param message Thông điệp lỗi.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 400.
     */
    public static ResponseEntity<AIMSResponse<Object>> error400Response(String message) {
        return ResponseEntity
                .badRequest()
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.BAD_REQUEST.value())
                        .status(HttpStatus.BAD_REQUEST.getReasonPhrase())
                        .message(message)
                        .build());
    }

    /**
     * Tạo phản hồi lỗi với mã trạng thái HTTP 401 và thông điệp lỗi.
     *
     * @param message Thông điệp lỗi.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 401.
     */
    public static ResponseEntity<AIMSResponse<Object>> error401Response(String message) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.UNAUTHORIZED.value())
                        .status(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                        .message(message)
                        .build());
    }

    /**
     * Tạo phản hồi lỗi với mã trạng thái HTTP 404 và thông điệp lỗi.
     *
     * @param message Thông điệp lỗi.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 404.
     */
    public static ResponseEntity<AIMSResponse<Object>> error404Response(String message) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.NOT_FOUND.value())
                        .status(HttpStatus.NOT_FOUND.getReasonPhrase())
                        .message(message)
                        .build());
    }

    /**
     * Tạo phản hồi lỗi với mã trạng thái HTTP 500 và thông điệp lỗi.
     *
     * @param message Thông điệp lỗi.
     * @return Đối tượng {@link ResponseEntity} chứa {@link AIMSResponse} với mã trạng thái 500.
     */
    public static ResponseEntity<AIMSResponse<Object>> error500Response(String message) {
        return ResponseEntity
                .internalServerError()
                .body(AIMSResponse.<Object>builder()
                        .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .status(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
                        .message(message)
                        .build());
    }
}

