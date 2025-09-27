package com.epms.backend.util.mappaers;

import com.epms.backend.dto.EventDTO;
import com.epms.backend.dto.responses.ResponseGetAllEvents;
import com.epms.backend.entity.Event;

import java.util.List;

public interface EventMapper {
    Event DTOToEntity(EventDTO eventDTO);

    List<ResponseGetAllEvents> EntityListToDTOList(List<Event> eventList);

    EventDTO EntityToDTO(Event event);
}
