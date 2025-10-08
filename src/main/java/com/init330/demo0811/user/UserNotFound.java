package com.init330.demo0811.user;

import com.init330.demo0811.error.CustomException;
import org.springframework.http.HttpStatus;

public class UserNotFound extends CustomException {
    public UserNotFound(String username) {
        super(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "사용자" +username+" 를 찾을 수 없습니다");
    }
}
