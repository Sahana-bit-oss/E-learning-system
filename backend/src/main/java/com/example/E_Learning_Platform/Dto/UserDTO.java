package com.example.E_Learning_Platform.Dto;

public class UserDTO {

    private int userid;
    private String username;
    private String role;
    private String email;
    private String password;

    public UserDTO() {
    }

    public UserDTO(int userid, String username, String role, String email, String password) {
        this.userid = userid;
        this.role = role;
        this.username = username;
        this.email = email;
        this.password = password;
    }


    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "userid=" + userid +
                ", role=" + role +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}