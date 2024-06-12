package com.hipu.task.service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @RequestMapping("/tasks")
    public ResponseEntity<String> getUserAssignedTask(){
        return new ResponseEntity<>("Welcome to task service", HttpStatus.OK);
    }
}
