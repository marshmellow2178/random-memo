package com.init330.demo0811.memo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record MemoRequest (
        @NotBlank String title,
        @NotBlank @Size(max = 200) String content,
        MemoStatus status
){ }
