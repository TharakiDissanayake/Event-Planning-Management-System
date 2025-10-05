package com.epms.backend.repository;

import com.epms.backend.entity.Event;
import com.epms.backend.entity.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByStatus(Status status);
}
