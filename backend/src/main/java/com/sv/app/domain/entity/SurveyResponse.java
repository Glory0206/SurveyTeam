package com.sv.app.domain.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "survey_responses")
public class SurveyResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id")
    private Long id;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime submittedAt; // 제출 시각

    // --- 연관 관계 ---

    // SurveyResponse(N) : User(1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User respondent; // 제출자

    // SurveyResponse(N) : Survey(1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id")
    private Survey survey; // 설문

    @OneToMany(mappedBy = "SurveyResponse", cascade = CascadeType.ALL)
    private final List<Answer> answers = new ArrayList<>();

    // --- 빌더 ---
    @Builder
    public SurveyResponse(User respondent, Survey survey) {
        this.respondent = respondent;
        this.survey = survey;
    }

    // --- 메소드 ---
    public void addAnswer(Answer answer) {
        this.answers.add(answer);
        answer.setSurveyResponse(this);
    }
}
