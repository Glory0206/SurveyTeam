package com.sv.app.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class SurveyCreateRequestDto {
    private String title;
    private String description;
    private Long userId;
    private List<QuestionCreateRequestDto> questions;
}
