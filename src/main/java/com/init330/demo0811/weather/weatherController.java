package com.init330.demo0811.weather;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/weather")
public class weatherController {

    @GetMapping("/today")
    public ResponseEntity<?> getWeather(){
        String msg = "오늘의 날씨";
        return ResponseEntity.ok(msg);
    }
}
