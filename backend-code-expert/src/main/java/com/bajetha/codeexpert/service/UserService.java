package com.bajetha.codeexpert.service;

import com.bajetha.codeexpert.dto.LoginRequest;
import com.bajetha.codeexpert.entity.User;
import com.bajetha.codeexpert.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //    Registering a new user

    public User registerUser(User registerRequest) {

        User user = userRepository.findByEmail(registerRequest.getEmail());

        if ( user != null) {
            throw new RuntimeException("User already exists");
        }

        User result = userRepository.save(registerRequest);

        return result;
    }

    //    Login the user

    public User loginUser(LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail());

        if ( user != null) {
            if(user.getPassword().equals(loginRequest.getPassword())){
                return user;
            }
        }

        throw new RuntimeException("Invalid Email or Password");
    }
}
