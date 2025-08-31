package com.init330.demo0811.memo;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@DynamicUpdate
public class Memo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    private boolean pinned = false;
    private boolean favorite = false;

    private int viewCount = 0;

    @CreatedDate
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public static Memo create(MemoRequest request){
        Memo memo = new Memo();
        memo.title = request.title();
        memo.content = request.content();
        return memo;
    }

    public void update(MemoRequest request){
        this.title = request.title();
        this.content = request.content();
    }

    public void togglePinned(){
        this.pinned = !this.pinned;
    }

    public void toggleFavorite(){
        this.favorite = !this.favorite;
    }

    public void increaseViewCount(){
        this.viewCount++;
    }
}
