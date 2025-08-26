package com.sv.app.domain.entity;

import com.sv.app.domain.enums.Role;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String email; // email(로그인 ID로 사용)

    @Column(nullable = false)
    private String password; // 비밀번호

    @Enumerated(EnumType.STRING) // Enum 타입을 문자열로 저장
    @Column(nullable = false)
    private Role role; // 사용자 권한(USER, ADMIN)

    // --- 연관 관계 ---

    // User(1) : Survey(N)
    @OneToMany(mappedBy = "creator")
    private List<Survey> surveys = new ArrayList<>();

    // --- 빌더 ---
    @Builder
    public User(String email, String password, String name, Role role){
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
