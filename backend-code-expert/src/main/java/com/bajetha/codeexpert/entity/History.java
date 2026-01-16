package com.bajetha.codeexpert.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "history")
@Data
public class History {

    public History() {
    }

    public History(String toolType,
                   String inputCode,
                   String generatedOutput,
                   LocalDateTime timestamp,
                   User user) {

        this.toolType = toolType;
        this.inputCode = inputCode;
        this.generatedOutput = generatedOutput;
        this.timestamp = timestamp;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String toolType;

    @Column(columnDefinition = "TEXT")
    private String inputCode;

    @Column(columnDefinition = "TEXT")
    private String generatedOutput;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
