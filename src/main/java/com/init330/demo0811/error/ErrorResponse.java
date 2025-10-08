package com.init330.demo0811.error;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Builder
@Schema(description = "에러 응답 형식")
public class ErrorResponse {
    @Schema(description = "상태코드", example = "404")
    private int status;
    @Schema(description = "에러코드", example = "NOT_FOUND")
    private String code;
    @Schema(description = "메시지", example = "찾을 수 없습니다")
    private String message;
    @Schema(description = "발생시각")
    private LocalDateTime timestamp;
}
