package com.epms.backend.util.mappaers;

import com.epms.backend.dto.EventDTO;
import com.epms.backend.dto.responses.ResponseGetAllEvents;
import com.epms.backend.entity.Event;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EventMapperImpl implements EventMapper {

    @Override
    public Event DTOToEntity(EventDTO eventDTO) {
        if (eventDTO == null) {
            return null;
        }
        
        Event event = new Event();
        
        // Using getter/setter methods
        event.setEventCategory(eventDTO.getEventCategory());
        event.setEventTitle(eventDTO.getEventTitle());
        event.setEventDate(eventDTO.getEventDate());
        event.setStartTime(eventDTO.getStartTime());
        event.setStatus(eventDTO.getStatus());
        event.setIdentityNumber(eventDTO.getIdentityNumber());
        event.setEventImage(eventDTO.getEventImage());
        
        // Handle package and offer relationships
        if (eventDTO.getPackageId() > 0) {
            // We'll need to set these in the service layer with proper repository lookups
            // This will be handled in EventServiceIMPL
        }
        
        if (eventDTO.getOfferId() != null && eventDTO.getOfferId() > 0) {
            // We'll need to set these in the service layer with proper repository lookups
            // This will be handled in EventServiceIMPL
        }
        
        return event;
    }

    @Override
    public List<ResponseGetAllEvents> EntityListToDTOList(List<Event> eventList) {
        if (eventList == null) {
            return null;
        }

        List<ResponseGetAllEvents> responseList = new ArrayList<>(eventList.size());
        for (Event event : eventList) {
            ResponseGetAllEvents response = new ResponseGetAllEvents();
            
            // Using getter/setter methods
            response.setEventId(event.getEventId());
            response.setEventCategory(event.getEventCategory());
            response.setEventTitle(event.getEventTitle());
            response.setEventDate(event.getEventDate());
            response.setIdentityNumber(event.getIdentityNumber());
            
            responseList.add(response);
        }
        
        return responseList;
    }

    @Override
    public EventDTO EntityToDTO(Event event) {
        if (event == null) {
            return null;
        }
        
        EventDTO eventDTO = new EventDTO();
        
        // Using getter/setter methods
        eventDTO.setEventId(event.getEventId());
        eventDTO.setEventCategory(event.getEventCategory());
        eventDTO.setEventTitle(event.getEventTitle());
        eventDTO.setEventDate(event.getEventDate());
        eventDTO.setStartTime(event.getStartTime());
        eventDTO.setStatus(event.getStatus());
        eventDTO.setIdentityNumber(event.getIdentityNumber());
        eventDTO.setEventImage(event.getEventImage());
        
        // Handle package and offer IDs
        if (event.getPackageData() != null) {
            eventDTO.setPackageId(event.getPackageData().getPackageId());
        }
        
        if (event.getOffer() != null) {
            eventDTO.setOfferId(event.getOffer().getOfferId());
        }
        
        return eventDTO;
    }
}