package com.loginPage.service;

import com.loginPage.dto.LoginDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {
    public ResponseEntity<String>doRegister(LoginDto loginDto);

    public ResponseEntity<String>doLogin(String username,  String email,  String password);
}
