package com.hipu.userservice.exception;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetais {
	
	private String error;
	private String message;
	private LocalDateTime timestamp;

}
