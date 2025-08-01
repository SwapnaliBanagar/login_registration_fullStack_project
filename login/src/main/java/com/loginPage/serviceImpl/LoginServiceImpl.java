package com.loginPage.serviceImpl;

import com.loginPage.dto.LoginDto;
import com.loginPage.entity.LoginEntity;
import com.loginPage.repository.LoginRepository;
import com.loginPage.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    LoginRepository loginRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public ResponseEntity<String> doRegister(LoginDto loginDto) {
        Optional<LoginEntity> byUsername = loginRepository.findByUsername(loginDto.getUsername());
        if (byUsername.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please use unique username.");
        }
        LoginEntity loginEntity = new LoginEntity();
        loginEntity.setUsername(loginDto.getUsername());
        loginEntity.setEmail(loginDto.getEmail());
        loginEntity.setPassword(passwordEncoder.encode(loginDto.getPassword()));
        loginRepository.save(loginEntity);
        return ResponseEntity.ok("Registration successfully done..");
    }


    @Override
    public ResponseEntity<String> doLogin(String username, String email, String password) {
        Optional<LoginEntity> byUsername = loginRepository.findByUsername(username);
        if (byUsername.isPresent()) {
            if (byUsername.get().getEmail().equals(email)) {
               if(passwordEncoder.matches(password,byUsername.get().getPassword()))
               {
                   return ResponseEntity.ok("Login successfully done..");
               }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid email..");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid username..");
    }
}
