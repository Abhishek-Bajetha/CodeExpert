package com.bajetha.codeexpert.service;


import com.bajetha.codeexpert.entity.History;
import com.bajetha.codeexpert.entity.User;
import com.bajetha.codeexpert.repository.HistoryRepository;
import com.bajetha.codeexpert.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryService {

    private final UserRepository userRepository;
    private final HistoryRepository historyRepository;

    public HistoryService(UserRepository userRepository, HistoryRepository historyRepository) {
        this.userRepository = userRepository;
        this.historyRepository = historyRepository;
    }


    public void saveRequest(Long userId, String toolType, String inputCode, String generatedOutput) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        History history = new History(
                toolType,
                inputCode,
                generatedOutput,
                LocalDateTime.now(),
                user);
        historyRepository.save(history);
    }

    public List<History> getHistoryByUserId(Long userId) {

        return historyRepository.findByUserId(userId);
    }

}





