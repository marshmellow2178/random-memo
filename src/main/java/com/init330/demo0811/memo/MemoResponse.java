package com.init330.demo0811.memo;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MemoResponse {
    private Long id;
    private String title;
    private String content;
    private boolean pinned;
    private boolean favorite;
    private int viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static MemoResponse from(Memo memo){
        MemoResponse response = new MemoResponse();
        response.id = memo.getId();
        response.title = memo.getTitle();
        response.content = memo.getContent();
        response.createdAt = memo.getCreatedAt();
        response.modifiedAt = memo.getModifiedAt();
        response.pinned = memo.isPinned();
        response.favorite = memo.isFavorite();
        response.viewCount = memo.getViewCount();
        return response;
    }
}
