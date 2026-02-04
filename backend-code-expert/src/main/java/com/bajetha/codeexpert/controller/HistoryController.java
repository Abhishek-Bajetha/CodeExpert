package com.bajetha.codeexpert.controller;

import com.bajetha.codeexpert.entity.History;
import com.bajetha.codeexpert.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "https://code-expert-2719.netlify.app")
public class HistoryController {

    private final HistoryService historyService;
    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<History>> getUserHistory(@PathVariable Long userId) {
        List<History> historyList = historyService.getHistoryByUserId(userId);
        return ResponseEntity.ok(historyList);
    }
}
