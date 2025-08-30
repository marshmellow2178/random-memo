package com.init330.demo0811.memo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    Page<Memo> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Memo> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<Memo> findByCreatedAtGreaterThanEqual(LocalDateTime start, Pageable pageable);
    Page<Memo> findByCreatedAtLessThan(LocalDateTime end, Pageable pageable);
}
