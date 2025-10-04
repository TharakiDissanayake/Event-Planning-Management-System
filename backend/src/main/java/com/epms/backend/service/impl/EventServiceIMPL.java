package com.epms.backend.service.impl;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.EventDTO;
import com.epms.backend.dto.responses.ResponseGetAllEvents;
import com.epms.backend.entity.Customer;
import com.epms.backend.entity.Event;
import com.epms.backend.exceptions.NotFoundException;
import com.epms.backend.repository.EventRepository;
import com.epms.backend.service.EventService;
import com.epms.backend.util.mappaers.EventMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceIMPL implements EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private EventMapper eventMapper;

    @Override
    public String saveEvent(EventDTO eventDTO) {
        Event event = eventMapper.DTOToEntity(eventDTO);
        // For a new event, we don't check if ID exists since it will be auto-generated
        eventRepository.save(event);
        return "Event saved successfully.";
    }

    @Override
    public List<ResponseGetAllEvents> getAllEvents() {
        List<Event> eventList = eventRepository.findAll();
        if(eventList.size() > 0){
            List<ResponseGetAllEvents> eventDTOList = eventMapper.EntityListToDTOList(eventList);
            return eventDTOList;
        }else{
            throw new NotFoundException("No packages found");
        }
    }

    @Override
    public String deleteEventById(int eventId) {
        if(eventRepository.existsById(eventId)){
            eventRepository.deleteById(eventId);
            return eventId + " deleted successfully";
        }else {
            throw new NotFoundException("Event with id " + eventId + " does not exist");
        }
    }

    @Override
    public EventDTO getEventById(int eventId) {
        if(eventRepository.existsById(eventId)){
            Event event = eventRepository.getReferenceById(eventId);
            EventDTO eventDTO = eventMapper.EntityToDTO(event);
            return eventDTO;
        }else {
            throw new NotFoundException("Event with ID "+ eventId + " Not found.");
        }
    }
}
