package com.example.restfulapistudent.exception;

public class CustomServiceException extends RuntimeException {
    public CustomServiceException(String message) {
        super(message);
    }

    // Khởi tạo với thông báo lỗi và nguyên nhân gốc rễ
    public CustomServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
