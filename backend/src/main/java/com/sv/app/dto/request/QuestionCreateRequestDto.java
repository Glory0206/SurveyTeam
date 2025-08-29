package com.sv.app.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sv.app.domain.enums.QuestionType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class QuestionCreateRequestDto {
    private String content;
    private QuestionType type;
    private int questionOrder;
    private List<ChoiceCreateRequestDto> choices;

    @JsonProperty("required")
    private boolean isRequired;
}
