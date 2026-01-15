package com.bajetha.codeexpert.controller;

import com.bajetha.codeexpert.dto.LoginRequest;
import com.bajetha.codeexpert.entity.User;
import com.bajetha.codeexpert.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }


//    Register user
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {

        User createdUser = userService.registerUser(user);

        return ResponseEntity.ok(createdUser);
    }



//    Login user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        User user = userService.loginUser(loginRequest);

        if (user != null) {
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body("Invalid credentials provided.");
    }
}
