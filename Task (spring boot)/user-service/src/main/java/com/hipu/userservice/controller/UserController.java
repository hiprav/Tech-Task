package com.hipu.userservice.controller;

import com.hipu.userservice.exception.UserException;
import com.hipu.userservice.model.User;
import com.hipu.userservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class UserController {
	
	
	private UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/api/users/profile")
	public ResponseEntity<User> getUserProfileHandler(
			@RequestHeader("Authorization") String jwt) throws UserException {

		User user = userService.findUserProfileByJwt(jwt);
		user.setPassword(null);

		return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/api/users/{userId}")
	public ResponseEntity<User> findUserById(
			@PathVariable Long userId,
			@RequestHeader("Authorization") String jwt) throws UserException {

		User user = userService.findUserById(userId);
		user.setPassword(null);

		return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
	}

	@GetMapping("/api/users")
	public ResponseEntity<List<User>> findAllUsers(

			@RequestHeader("Authorization") String jwt)  {

		List<User> users = userService.findAllUsers();


		return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
	}



}
