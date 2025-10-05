package com.init330.demo0811.memo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    Page<Memo> findByUserId(Long userId, Pageable pageable);
    Page<Memo> findByUserIdAndTitleContaining(Long userId, String title, Pageable pageable);
    Optional<Memo> findByIdAndUserId(Long id, Long userId);
}
