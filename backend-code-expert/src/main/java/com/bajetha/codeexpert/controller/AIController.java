package com.bajetha.codeexpert.controller;

import com.bajetha.codeexpert.service.AIService;
import com.bajetha.codeexpert.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;
    private final HistoryService historyService;

    public AIController(AIService aiService, HistoryService historyService) {
        this.aiService = aiService;
        this.historyService = historyService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateCode(@RequestBody Map<String ,String > payload){
        Long userId = Long.parseLong(payload.get("userId"));
        String toolType = payload.get("toolType");
        String originalCode = payload.get("inputCode");
        String prompt = payload.get("prompt");
        String result = aiService.getContent(prompt);

        historyService.saveRequest(userId, toolType, originalCode, result);

        return ResponseEntity.ok(result);
    }
}
