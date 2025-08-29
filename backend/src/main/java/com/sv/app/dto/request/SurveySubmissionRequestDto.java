package com.sv.app.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class SurveySubmissionRequestDto {
    private Long surveyId; // 설문 Id
    private List<AnswerSubmissionRequestDto> answers; // 답변 목록
}
