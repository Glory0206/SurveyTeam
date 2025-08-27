package com.sv.app.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content; // 주관식 답변 내용

    // --- 연관 관계 ---

    // Answer(N) : Question(1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question; // 문항

    // Answer(N) : Choice(1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "choice_id")
    private Choice choice;

    // --- 빌더 ---

    // 주관식 답변 생성을 위한 빌더
    @Builder(builderMethodName = "forText")
    public Answer(Question question, String content) {
        this.question = question;
        this.content = content;
    }

    // 객관식 답변 생성을 위한 빌더
    @Builder(builderMethodName = "forChoice")
    public Answer(Question question, Choice choice) {
        this.question = question;
        this.choice = choice;
    }
}
