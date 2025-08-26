package com.sv.app.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "choices")
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "choice_id")
    private Long id;

    @Column(nullable = false)
    private String content; // 선택지 내용

    @Column(name = "choice_order")
    private int choiceOrder; // 선택지 순서

    // --- 연관 관계 ---

    // Choice(N) : Question(1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question; // 문항

    // --- 빌더 ---
    @Builder
    public Choice(String content, int choiceOrder) {
        this.content = content;
        this.choiceOrder = choiceOrder;
    }

    // --- 연관관계 편의 메서드 ---
    public void setQuestion(Question question) {
        this.question = question;
    }
}
