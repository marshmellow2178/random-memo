package com.init330.demo0811.memo;

import com.init330.demo0811.user.User;
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
    public Memo createMemo(MemoRequest request, User user){
        Memo memo = Memo.create(
                request.title(),
                request.content(),
                user
        );
        return memoRepository.save(memo);
    }

    @Transactional
    public Memo updateMemo(
            Long id,
            MemoRequest request,
            Long userId){
        Memo memo = findMemoById(id, userId);
        memo.update(
                request.title(),
                request.content()
        );
        return memoRepository.save(memo);
    }

    @Transactional
    public void deleteMemo(Long id, Long userId){
        memoRepository.delete(findMemoById(id, userId));
    }

    @Transactional
    public Memo pinMemo(Long id, Long userId){
        Memo memo = findMemoById(id, userId);
        memo.pin();
        return memoRepository.save(memo);
    }

    @Transactional
    public Memo doneMemo(Long id, Long userId){
        Memo memo = findMemoById(id, userId);
        memo.done();
        return memoRepository.save(memo);
    }

    @Transactional
    public Memo undoMemo(Long id, Long userId){
        Memo memo = findMemoById(id, userId);
        memo.undo();
        return memoRepository.save(memo);
    }

    public Memo findMemoById(Long id, Long userId){
        return memoRepository.findByIdAndUserId(id, userId).orElseThrow(MemoNotFound::new);
    }

    public Page<Memo> search(
            Pageable pageable,
            String keyword,
            Long userId
    ){
        if(StringUtils.hasText(keyword)){
            return memoRepository.findByUserIdAndTitleContaining(userId,keyword.trim(), pageable);
        }
        return memoRepository.findByUserId(userId, pageable);

    }
}
