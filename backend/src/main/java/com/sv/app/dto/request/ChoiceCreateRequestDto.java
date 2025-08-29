package com.sv.app.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChoiceCreateRequestDto {
    private String content;
    private int choiceOrder;
}
