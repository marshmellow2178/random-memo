package com.init330.demo0811.memo;

import com.init330.demo0811.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Fetch;
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

    @Enumerated(EnumType.STRING)
    private MemoStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @CreatedDate
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public static Memo create(
            String title,
            String content,
            User user
    ){
        Memo memo = new Memo();
        memo.title = title;
        memo.content = content;
        memo.user = user;
        memo.status = MemoStatus.NORMAL;
        return memo;
    }

    public void update(
            String title,
            String content,
            MemoStatus status
    ){
        this.title =title;
        this.content = content;
        this.status = status;
    }
}
