package com.hipu.tasksubmitionservice.dtos;

import lombok.Data;

@Data
public class UserDto {
    private Long id;

    private String fullName;
    private String email;
    private String mobile;

    private String role;
}
