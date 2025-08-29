package com.sv.app.controller;

import com.sv.app.domain.entity.User;
import com.sv.app.dto.request.LoginRequestDto;
import com.sv.app.dto.request.SignUpRequestDto;
import com.sv.app.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    public static final String USER_ID_SESSION_KEY = "LOGGED_IN_USER_ID";

    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody SignUpRequestDto requestDto){
        userService.signUp(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequestDto requestDto, HttpServletRequest request){
        // 로그인 성공시 User 객체 반환
        User loggedInUser = userService.login(requestDto);

        HttpSession session = request.getSession();

        session.setAttribute(USER_ID_SESSION_KEY, loggedInUser.getId());

        return ResponseEntity.ok().build();
    }
}
