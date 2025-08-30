package com.init330.demo0811.memo;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;

    @Transactional
    public Memo createMemo(MemoRequest request){
        Memo memo = Memo.create(request);
        return memoRepository.save(memo);
    }

    @Transactional
    public Memo updateMemo(
            Long id,
            MemoRequest request){
        Memo memo = findMemoById(id);
        memo.update(request);
        return memoRepository.save(memo);
    }

    @Transactional
    public void deleteMemo(Long id){
        memoRepository.delete(findMemoById(id));
    }

    @Transactional
    public Memo togglePinned(Long id){
        Memo memo = findMemoById(id);
        memo.togglePinned();
        return memoRepository.save(memo);
    }

    public Memo findMemoById(Long id){
        return memoRepository.findById(id).orElseThrow(MemoNotFound::new);
    }

    public Page<Memo> findMemo(Pageable pageable, String keyword,
                               LocalDate from, LocalDate to){
        if(StringUtils.hasText(keyword)){
            return memoRepository.findByTitleContainingIgnoreCase(keyword.trim(), pageable);
        }

        if(from != null && to != null){
            var start = from.atStartOfDay();
            var end = to.plusDays(1).atStartOfDay();
            return memoRepository.findByCreatedAtBetween(start, end, pageable);
        }else if(from != null){
            return memoRepository.findByCreatedAtGreaterThanEqual(from.atStartOfDay(), pageable);
        }else if(to != null){
            var end = to.plusDays(1).atStartOfDay();
            return memoRepository.findByCreatedAtLessThan(end, pageable);
        }

        return memoRepository.findAll(pageable);
    }
}
