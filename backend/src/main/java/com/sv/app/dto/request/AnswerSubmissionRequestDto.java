package com.sv.app.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AnswerSubmissionRequestDto {
    private Long questionId; // 질문 Id
    private Long choiceId; // 객관식일 경우 선택한 선택지의 id
    private String content; // 주관식일 경우 그 내용
}
