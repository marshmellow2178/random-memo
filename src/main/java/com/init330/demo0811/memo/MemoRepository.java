package com.init330.demo0811.memo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    @Query("""
            SELECT m 
            from Memo m 
            WHERE m.user.id=:userId
                and (:title is null or m.title like %:title%)
                and (:status is null or m.status =:status)
            """)
    Page<Memo> searchMemos(
            @Param("userId") Long userId,
            @Param("title") String title,
            @Param("status") MemoStatus status,
            Pageable pageable
    );

    Optional<Memo> findByIdAndUserId(Long id, Long userId);
}
