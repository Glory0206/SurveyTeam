package com.sv.app.service;

import com.sv.app.domain.entity.*;
import com.sv.app.domain.enums.QuestionType;
import com.sv.app.domain.enums.SurveyStatus;
import com.sv.app.dto.request.*;
import com.sv.app.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyService {
    private final UserRepository userRepository;
    private final SurveyRepository surveyRepository;
    private final QuestionRepository questionRepository;
    private final ChoiceRepository choiceRepository;
    private final AnswerRepository answerRepository;

    @Transactional
    public void createSurvey(SurveyCreateRequestDto requestDto){
        // 설문을 생성하는 User
        User creator = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("유저를 찾을 수 없습니다."));

        // Survey Entity 생성
        Survey survey = Survey.builder()
                .title(requestDto.getTitle())
                .description(requestDto.getDescription())
                .creator(creator)
                .status(SurveyStatus.DRAFT) // 생성 시 '임시저장' 상태
                .build();
        
        // 질문 문항의 Type에 따른 문제 추가
        for (QuestionCreateRequestDto questionDto: requestDto.getQuestions()){
            Question question = Question.builder()
                    .content(questionDto.getContent())
                    .type(questionDto.getType())
                    .isRequired(questionDto.isRequired())
                    .questionOrder(questionDto.getQuestionOrder())
                    .build();

            // 객관식일 경우, 선택지를 질문 문항에 추가
            if (questionDto.getChoices() != null){
                for (ChoiceCreateRequestDto choiceDto: questionDto.getChoices()){
                    Choice choice = Choice.builder()
                            .content(choiceDto.getContent())
                            .choiceOrder(choiceDto.getChoiceOrder())
                            .build();
                    // question에 choice(선택지) 저장
                    question.addChoice(choice);
                }
            }

            // Survey에 question(질문 문항) 저장
            survey.addQuestion(question);
        }

        // Survey 저장
        surveyRepository.save(survey);
    }

    public void submitSurvey(SurveySubmissionRequestDto requestDto){
        List<Answer> answerToSave = new ArrayList<>(); // Answer Entity들을 담을 리스트

        for(AnswerSubmissionRequestDto answerRequest: requestDto.getAnswers()){
            Question question = questionRepository.findById(answerRequest.getQuestionId()).orElseThrow();

            Answer answer;

            if(question.getType() == QuestionType.TEXT){
                // 주관식
                answer = Answer.forText()
                        .question(question)
                        .content(answerRequest.getContent())
                        .build();
            }else{
                // 객관식
                Choice choice = choiceRepository.findById(answerRequest.getChoiceId()).orElseThrow();
                answer = Answer.forChoice()
                        .question(question)
                        .choice(choice)
                        .build();
            }
            answerToSave.add(answer);
        }
        answerRepository.saveAll(answerToSave); // Answer DB 저장
    }
}
