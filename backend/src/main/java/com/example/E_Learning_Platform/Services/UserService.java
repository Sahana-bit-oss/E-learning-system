package com.example.E_Learning_Platform.Services;

import com.example.E_Learning_Platform.Responses.LoginResponse;
import com.example.E_Learning_Platform.Dto.UserDTO;
import com.example.E_Learning_Platform.Dto.LoginDTO;

public interface UserService {
    String addUser(UserDTO userDTO);

    LoginResponse loginUser(LoginDTO loginDTO);

}