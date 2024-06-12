package com.hipu.task.service.model;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String password;
    private String email;
    private String role;
    private String fullName;
    private String mobile;
}
