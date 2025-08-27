package com.sv.app.domain.entity;

import com.sv.app.domain.enums.QuestionType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;
    
    @Column(nullable = false)
    private String content; // 질문

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type; // 질문 유형

    @Column(nullable = false)
    private boolean isRequired; // 필수 응답 여부

    @Column(name = "question_order")
    private int questionOrder; // 설문 내 문항 순서

    // --- 연관 관계 ---

    // Question(N) : Survey(1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    private Survey survey; // 설문

    // Question(1) : Choice(N)
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Choice> choices = new ArrayList<>();

    // --- 빌더 ---
    @Builder
    public Question(String content, QuestionType type, boolean isRequired, int questionOrder){
        this.content = content;
        this.type = type;
        this.isRequired = isRequired;
        this.questionOrder = questionOrder;
    }

    // --- 메소드 ---
    public void setSurvey(Survey survey){
        this.survey = survey;
    }

    public void addChoice(Choice choice) {
        this.choices.add(choice);
        choice.setQuestion(this);
    }
}
