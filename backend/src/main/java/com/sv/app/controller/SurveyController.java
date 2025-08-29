package com.sv.app.controller;

import com.sv.app.dto.request.SurveyCreateRequestDto;
import com.sv.app.dto.request.SurveySubmissionRequestDto;
import com.sv.app.service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/surveys")
@RequiredArgsConstructor
public class SurveyController {
    private final SurveyService surveyService;

    @PostMapping("/create")
    public ResponseEntity<Void> createSurvey(@RequestBody SurveyCreateRequestDto requestDto){
        surveyService.createSurvey(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/responses")
    public ResponseEntity<Void> submitSurvey(@RequestBody SurveySubmissionRequestDto requestDto){
        surveyService.submitSurvey(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
