package com.init330.demo0811.memo;

import com.init330.demo0811.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;

    @Transactional
    public Memo createMemo(MemoRequest request, User user){
        Memo memo = Memo.create(
                request.title(),
                request.content(),
                request.status(),
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
                request.content(),
                request.status()
        );
        return memoRepository.save(memo);
    }

    @Transactional
    public void deleteMemo(Long id, Long userId){
        memoRepository.delete(findMemoById(id, userId));
    }

    public Memo findMemoById(Long id, Long userId){
        return memoRepository.findByIdAndUserId(id, userId)
                .orElseThrow(()->new MemoNotFound(id));
    }

    public Page<Memo> search(
            Pageable pageable,
            String keyword,
            Long userId,
            MemoStatus status
    ){
        if(StringUtils.hasText(keyword)){
            keyword = keyword.trim();
        }else{
            keyword=null; //빈 문자열 대응
        }
        return memoRepository.searchMemos(userId, keyword, status, pageable);

    }
}
