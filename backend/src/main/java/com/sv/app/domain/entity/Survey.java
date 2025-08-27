package com.sv.app.domain.entity;

import com.sv.app.domain.enums.SurveyStatus;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "surveys")
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "survey_id")
    private Long id;

    @Column(nullable = false, length = 255)
    private String title; // 설문 제목

    @Column(columnDefinition = "TEXT") // TEXT 타입 지정
    private String description; // 설문 설명

    @Enumerated(EnumType.STRING) // Enum 타입을 문자열로 저장
    @Column(nullable = false)
    private SurveyStatus status; // 설문 상태(DRAFT, PUBLISHED, CLOSED)

    private LocalDateTime startDate; // 설문 시작일

    private LocalDateTime endDate; // 설문 종료일
    
    @CreationTimestamp // 엔티티 생성 시 자동으로 현재 시간 저장
    private LocalDateTime createdAt; // 생성 시간
    
    @UpdateTimestamp // 엔티티 수정 시 자동으로 현재 시간 저장
    private LocalDateTime updatedAt; // 수정 시간
    
    // --- 연관 관계 ---

    // Survey(N) : User(1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User creator; // 설문 생성자

    // Survey(1) : Question(N)
    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Question> questions = new ArrayList<>();

    // --- 빌더 ---
    @Builder
    public Survey(String title, String description, SurveyStatus status, LocalDateTime startDate, LocalDateTime endDate, User creator){
        this.title = title;
        this.description = description;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.creator = creator;
    }

    // --- 메소드 ---
    public void addQuestion(Question question){
        this.questions.add(question);
        question.setSurvey(this);
    }
}
