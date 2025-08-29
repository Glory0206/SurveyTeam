package com.sv.app.service;

import com.sv.app.domain.entity.User;
import com.sv.app.domain.enums.Role;
import com.sv.app.dto.request.LoginRequestDto;
import com.sv.app.dto.request.SignUpRequestDto;
import com.sv.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void signUp(SignUpRequestDto requestDto){
        // 이메일 중복 확인
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()){
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        User user = User.builder()
                .email(requestDto.getEmail())
                .password(encodedPassword) // 암호화된 비밀번호
                .role(Role.USER) // 기본 권한: USER
                .build();

        userRepository.save(user);
    }

    public User login(LoginRequestDto requestDto){
        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        if(!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())){
            throw new IllegalArgumentException("잘못된 비밀번호입니다.");
        }

        return user;
    }
}
