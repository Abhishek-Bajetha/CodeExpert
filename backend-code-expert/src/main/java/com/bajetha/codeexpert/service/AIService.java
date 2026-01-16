package com.bajetha.codeexpert.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
public class AIService {

    @Value("${gemini.api.url}")
    private String apiUrl;

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public AIService() {
        this.restTemplate = new RestTemplate();
    }

    private final ObjectMapper mapper = new ObjectMapper();

    public String getContent(String prompt) {

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );
//        String requestBody = "{\n" +
//                "  \"contents\": [\n" +
//                "    {\n" +
//                "      \"parts\": [\n" +
//                "        { \"text\": \"" + prompt + "\" }\n" +
//                "      ]\n" +
//                "    }\n" +
//                "  ]\n" +
//                "}";


        String requestUrl = apiUrl + apiKey;

        String jsonBody = mapper.writeValueAsString(requestBody);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(requestUrl, entity, String.class);

            JsonNode rootNode = mapper.readTree(response.getBody());

            String answer = rootNode.path("candidates")
                                    .get(0)
                                    .path("content")
                                    .path("parts")
                                    .get(0)
                                    .path("text")
                                    .asText();
            System.out.println(answer);
            return answer;

        } catch (Exception e) {
            return "Error processing AI response: " + e.getMessage();
        }

    }
}
