package com.hipu.task.service.service;

import com.hipu.task.service.enums.TaskStatus;
import com.hipu.task.service.model.Task;
import com.hipu.task.service.repo.TaskRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskSercieImp implements TaskService {

    private final TaskRepo taskRepo;
    public TaskSercieImp(TaskRepo taskRepo){
        this.taskRepo=taskRepo;
    }

    @Override
    public Task createTask(Task task, String requesterRole) throws Exception {
        if (!requesterRole.equals("ROLE_ADMIN")) {
            throw new Exception("Only admins can create tasks.");
        }
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepo.save(task);
    }

    @Override
    public Task getTaskById(Long id) throws Exception {
        return taskRepo.findById(id).orElseThrow(()->new Exception(("task not found with id"+id)));
    }

    @Override
    public List<Task> getAllTasks(TaskStatus status, String sortByDeadline, String sortByCreatedAt) {
        List<Task> allTasks = taskRepo.findAll();

        List<Task> filteredTasks = allTasks.stream()
                .filter(task -> status == null || task.getStatus().name().equalsIgnoreCase(status.toString()))
                .collect(Collectors.toList());

        if (sortByDeadline != null && !sortByDeadline.isEmpty()) {
            filteredTasks.sort(Comparator.comparing(Task::getDeadline));
        } else if (sortByCreatedAt != null && !sortByCreatedAt.isEmpty()) {
            filteredTasks.sort(Comparator.comparing(Task::getCreatedAt));
        }

        return filteredTasks;
    }

    @Override
    public Task updateTask(Long id, Task updatedTask, Long userId) throws Exception {
        Task existingTask = getTaskById(id);

        if(updatedTask.getTitle()!=null){
            existingTask.setTitle(updatedTask.getTitle());
        }
        if(updatedTask.getImage()!=null){
            existingTask.setImage(updatedTask.getImage());
        }
        if (updatedTask.getDescription()!=null){
            existingTask.setDescription(updatedTask.getDescription());
        }
        if(updatedTask.getStatus()!=null){
            existingTask.setStatus(updatedTask.getStatus());
        }
        if(updatedTask.getDeadline()!=null){
            existingTask.setDeadline(updatedTask.getDeadline());
        }
        return taskRepo.save(existingTask);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }

    @Override
    public Task assignedToUser(Long userId, Long taskId) throws Exception {
        Task task = getTaskById(taskId);
        task.setAssignedUserId(userId);
        task.setStatus(TaskStatus.ASSIGNED);

        return taskRepo.save(task);
    }

    @Override
    public List<Task> assignedUsersTask(Long userId, TaskStatus status, String sortByDeadline, String sortByCreatedAt) {
        List<Task> allTasks = taskRepo.findByassignedUserId(userId);
        List<Task> filteredTasks = allTasks.stream()
                .filter(task -> status == null || task.getStatus().name().equalsIgnoreCase(status.toString()))
                .collect(Collectors.toList());
        if (sortByDeadline != null && !sortByDeadline.isEmpty()) {
            filteredTasks.sort(Comparator.comparing(Task::getDeadline));
        } else if (sortByCreatedAt != null && !sortByCreatedAt.isEmpty()) {
            filteredTasks.sort(Comparator.comparing(Task::getCreatedAt));
        }
        return filteredTasks;
    }

    @Override
    public Task completeTask(Long taskId) throws Exception {
        Task task = getTaskById(taskId);
        task.setStatus(TaskStatus.DONE);
        return taskRepo.save(task);
    }
}
