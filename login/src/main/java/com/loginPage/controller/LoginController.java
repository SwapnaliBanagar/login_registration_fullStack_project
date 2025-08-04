package com.loginPage.controller;

import com.loginPage.dto.LoginDto;
import com.loginPage.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class LoginController {
    @Autowired
    LoginService loginService;

    @PostMapping("/registration")
    public ResponseEntity<String>doRegister(@RequestBody LoginDto loginDto)
    {
        return loginService.doRegister(loginDto);
    }


    @GetMapping("/login/{username}/{email}/{password}")
    public ResponseEntity<String>doLogin(@PathVariable String username,@PathVariable String email,@PathVariable String password)
    {
        return loginService.doLogin(username, email, password);
    }

}
