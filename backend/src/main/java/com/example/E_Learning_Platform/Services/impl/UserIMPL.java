package com.example.E_Learning_Platform.Services.impl;

import com.example.E_Learning_Platform.Dto.UserDTO;
import com.example.E_Learning_Platform.Dto.LoginDTO;
import com.example.E_Learning_Platform.Entity.User;
import com.example.E_Learning_Platform.Repo.UserRepo;
import com.example.E_Learning_Platform.Responses.LoginResponse;
import com.example.E_Learning_Platform.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserIMPL implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDTO userDTO) {

        User user = new User(
                userDTO.getUserid(),
                userDTO.getRole(),
                userDTO.getUsername(),
                userDTO.getEmail(),
                this.passwordEncoder.encode(userDTO.getPassword())
        );

        userRepo.save(user);

        return user.getUsername();
    }

    UserDTO userDTO;

    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
        User user = userRepo.findByEmail(loginDTO.getEmail());
        if (user != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                // Check if the role matches
                if (Objects.equals(user.getRole(), loginDTO.getRole())) {
                    // Email, password, and role all match
                    return new LoginResponse("Login Success", true);
                } else {
                    // Role mismatch
                    return new LoginResponse("Access Denied - Role mismatch", false);
                }
            } else {
                return new LoginResponse("Password Not Match", false);
            }
        } else {
            return new LoginResponse("Email not exists", false);
        }
    }
}
