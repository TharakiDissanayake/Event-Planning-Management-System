package com.epms.backend.service;

import com.epms.backend.dto.EventDTO;
import com.epms.backend.dto.responses.ResponseGetAllEvents;
import com.epms.backend.entity.enums.Status;

import java.util.List;

public interface EventService {

    String saveEvent(EventDTO eventDTO);

    List<ResponseGetAllEvents> getAllEvents();
    
    List<ResponseGetAllEvents> getEventsByStatus(Status status);

    String deleteEventById(int eventId);

    EventDTO getEventById(int eventId);
}
