package com.hipu.tasksubmitionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class TaskSubmitionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskSubmitionServiceApplication.class, args);
	}

}
