package com.hipu.task.service.service;

import com.hipu.task.service.model.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "USER-SERVICE",url = "http://localhost:5001")
public interface UserService {
    @GetMapping("/api/users/profile")
    public UserDTO getUserProfileHandler(@RequestHeader("Authorization") String jwt);
}
