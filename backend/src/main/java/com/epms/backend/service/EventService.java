package com.epms.backend.service;

import com.epms.backend.dto.EventDTO;
import com.epms.backend.dto.responses.ResponseGetAllEvents;

import java.util.List;

public interface EventService {

    String saveEvent(EventDTO eventDTO);

    List<ResponseGetAllEvents> getAllEvents();

    String deleteEventById(int eventId);

    EventDTO getEventById(int eventId);
}
