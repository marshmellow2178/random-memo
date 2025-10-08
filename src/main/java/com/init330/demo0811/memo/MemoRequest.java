package com.init330.demo0811.memo;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "메모 작성용 dto")
public record MemoRequest (
        @Schema(description = "제목", example = "title")
        @NotBlank String title,
        @Schema(description = "내용", example = "content")
        @NotBlank @Size(max = 200) String content,
        @Schema(description = "상태", example = "NORMAL")
        MemoStatus status
){ }
