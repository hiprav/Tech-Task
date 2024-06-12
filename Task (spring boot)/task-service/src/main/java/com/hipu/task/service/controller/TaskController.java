package com.hipu.task.service.controller;

import com.hipu.task.service.enums.TaskStatus;
import com.hipu.task.service.model.Task;
import com.hipu.task.service.model.UserDTO;
import com.hipu.task.service.service.TaskService;
import com.hipu.task.service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService=userService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        if(jwt==null){
            throw new Exception("jwt required...");
        }
        UserDTO user=userService.getUserProfileHandler(jwt);
        Task createdTask = taskService.createTask(task, user.getRole());
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id,
                                            @RequestHeader("Authorization") String jwt) throws Exception {
        if(jwt==null){
            throw new Exception("jwt required...");
        }
        Task task = taskService.getTaskById(id);
        return task != null ? new ResponseEntity<>(task, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Task>> getAssignedUsersTask(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) String sortByDeadline,
            @RequestParam(required = false) String sortByCreatedAt) throws Exception {
        UserDTO user=userService.getUserProfileHandler(jwt);
        List<Task> tasks = taskService.assignedUsersTask(user.getId(),status, sortByDeadline, sortByCreatedAt);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(
            @RequestHeader("Authorization") String jwt,
            @RequestParam(required = false) TaskStatus status,
            @RequestParam(required = false) String sortByDeadline,
            @RequestParam(required = false) String sortByCreatedAt
    ) throws Exception {
        if(jwt==null){
            throw new Exception("jwt required...");
        }
        List<Task> tasks = taskService.getAllTasks(status, sortByDeadline, sortByCreatedAt);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}/user/{userId}/assigned")
    public ResponseEntity<Task> assignedTaskToUser(
            @PathVariable Long id,
            @PathVariable Long userId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        UserDTO user=userService.getUserProfileHandler(jwt);
        Task task = taskService.assignedToUser(userId,id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task req,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        if(jwt==null){
            throw new Exception("jwt required...");
        }
        UserDTO user=userService.getUserProfileHandler(jwt);
        Task task = taskService.updateTask(id, req, user.getId());
        return task != null ? new ResponseEntity<>(task, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable Long id) throws Exception {
        Task task = taskService.completeTask(id);
        return new ResponseEntity<>(task, HttpStatus.NO_CONTENT);
    }
}
