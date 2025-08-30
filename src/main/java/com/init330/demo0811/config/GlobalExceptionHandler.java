package com.init330.demo0811.config;

import com.init330.demo0811.memo.MemoNotFound;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        String msg = ex.getBindingResult().getFieldError().getDefaultMessage();
        return ResponseEntity.badRequest().body(Map.of("code", "VALIDATION_ERR", "message", msg));
    }

    @ExceptionHandler(MemoNotFound.class)
    public ResponseEntity<?> handleMemoNotFound(){
        return ResponseEntity.status(404).body(Map.of("code", "NOT_FOUND", "message", "memo not found"));
    }
}
