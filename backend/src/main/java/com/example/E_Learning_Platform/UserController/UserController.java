package com.example.E_Learning_Platform.UserController;

import com.example.E_Learning_Platform.Dto.UserDTO;
import com.example.E_Learning_Platform.Dto.LoginDTO;
import com.example.E_Learning_Platform.Responses.LoginResponse;
import com.example.E_Learning_Platform.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")

public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping(path = "/save")
    public String saveUsers(@RequestBody UserDTO userDTO)
    {
        String id = userService.addUser(userDTO);
        return id;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO)
    {
        LoginResponse loginResponse = userService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}