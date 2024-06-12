package com.hipu.task.service.repo;

import com.hipu.task.service.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepo extends JpaRepository<Task,Long> {
    public List<Task> findByassignedUserId(Long userId);
}
