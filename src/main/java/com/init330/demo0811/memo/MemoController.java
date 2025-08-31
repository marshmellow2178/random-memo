package com.init330.demo0811.memo;

import com.init330.demo0811.config.LocationUtils;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDate;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/memos")
public class MemoController {

    private final MemoService memoService;

    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestBody MemoRequest request
    ){
        MemoResponse response = MemoResponse.from(memoService.createMemo(request));
        URI location = LocationUtils.createURI(response.getId());
        return ResponseEntity.created(location).body(response);
    }

    @GetMapping("/list")
    public ResponseEntity<?> memoList(
            Pageable pageable,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ){
        var page = memoService.findMemo(pageable, keyword, from, to).map(MemoResponse::from);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMemo(
            @PathVariable Long id
    ){
        return ResponseEntity.ok(MemoResponse.from(memoService.increaseViewCount(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMemo(
            @PathVariable Long id,
            @Valid @RequestBody MemoRequest request
    ){
        return ResponseEntity.ok(MemoResponse.from(memoService.updateMemo(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMemo(
            @PathVariable Long id
    ){
        memoService.deleteMemo(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/pin")
    public ResponseEntity<?> pinMemo(
            @PathVariable Long id
    ){
        return ResponseEntity.ok(MemoResponse.from(memoService.togglePinned(id)));
    }

    @PatchMapping("/{id}/favorite")
    public ResponseEntity<?> favoriteMemo(
            @PathVariable Long id
    ){
        return ResponseEntity.ok(MemoResponse.from(memoService.toggleFavorite(id)));
    }
}
