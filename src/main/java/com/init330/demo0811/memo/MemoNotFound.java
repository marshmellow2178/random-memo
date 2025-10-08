package com.init330.demo0811.memo;

import com.init330.demo0811.error.CustomException;
import org.springframework.http.HttpStatus;

public class MemoNotFound extends CustomException {
    public MemoNotFound(Long id) {
        super(HttpStatus.NOT_FOUND, "MEMO_NOT_FOUND", "메모 "+id+" 를 찾을 수 없습니다");
    }
}
