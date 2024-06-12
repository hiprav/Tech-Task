package com.hipu.tasksubmitionservice.dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.time.LocalDateTime;

public class TaskDto {
    private Long id;

    private String title;

    private String description;

    private String image;

    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime deadline;
}
