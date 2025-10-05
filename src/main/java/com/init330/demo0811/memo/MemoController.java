package com.init330.demo0811.memo;

import com.init330.demo0811.config.LocationUtils;
import com.init330.demo0811.user.User;
import com.init330.demo0811.user.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/memos")
public class MemoController {

    private final MemoService memoService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestBody MemoRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userService.findByUsername(userDetails.getUsername());
        MemoResponse response = MemoResponse.from(memoService.createMemo(request, user));
        URI location = LocationUtils.createURI(response.getId());
        return ResponseEntity.created(location).body(response);
    }

    @GetMapping
    public ResponseEntity<?> memoList(
            Pageable pageable,
            @RequestParam(required = false) String keyword,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userService.findByUsername(userDetails.getUsername());
        var page = memoService.search(pageable, keyword, user.getId()).map(MemoResponse::from);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMemo(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userService.findByUsername(userDetails.getUsername());
        return ResponseEntity.ok(MemoResponse.from(memoService.findMemoById(id, user.getId())));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateMemo(
            @PathVariable Long id,
            @Valid @RequestBody MemoRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userService.findByUsername(userDetails.getUsername());
        return ResponseEntity.ok(MemoResponse.from(memoService.updateMemo(id, request, user.getId())));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMemo(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userService.findByUsername(userDetails.getUsername());
        memoService.deleteMemo(id, user.getId());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/pin")
    public ResponseEntity<?> pinMemo(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userService.findByUsername(userDetails.getUsername());
        return ResponseEntity.ok(MemoResponse.from(memoService.pinMemo(id, user.getId())));
    }

    @PatchMapping("/{id}/done")
    public ResponseEntity<?> doneMemo(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userService.findByUsername(userDetails.getUsername());
        return ResponseEntity.ok(MemoResponse.from(memoService.doneMemo(id, user.getId())));
    }

    @PatchMapping("/{id}/undo")
    public ResponseEntity<?> undoMemo(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ){
        User user = userService.findByUsername(userDetails.getUsername());
        return ResponseEntity.ok(MemoResponse.from(memoService.undoMemo(id, user.getId())));
    }
}
