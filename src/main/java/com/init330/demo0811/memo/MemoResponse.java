package com.init330.demo0811.memo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.OffsetDateTime;

@Getter
@Schema(description = "메모 응답용 dto")
public class MemoResponse {
    @Schema(description = "id", example = "1")
    private Long id;
    @Schema(description = "제목", example = "title")
    private String title;
    @Schema(description = "내용", example = "content")
    private String content;
    @Schema(description = "상태", example = "NORMAL")
    private MemoStatus status;
    @Schema(description = "작성일")
    private OffsetDateTime createdAt;
    @Schema(description = "수정일")
    private OffsetDateTime modifiedAt;

    public static MemoResponse from(Memo memo){
        MemoResponse response = new MemoResponse();
        response.id = memo.getId();
        response.title = memo.getTitle();
        response.content = memo.getContent();
        response.createdAt = memo.getCreatedAt();
        response.modifiedAt = memo.getModifiedAt();
        response.status = memo.getStatus();
        return response;
    }
}
