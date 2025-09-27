package com.epms.backend.controller;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.EventDTO;
import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.responses.ResponseGetAllEvents;
import com.epms.backend.entity.enums.PackageCategory;
import com.epms.backend.service.EventService;
import com.epms.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(name = "api/v1/event")
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping(
            path = "/save-event"
    )
    public ResponseEntity<StandardResponse> saveEvent(@RequestBody EventDTO eventDTO){
        String message = eventService.saveEvent(eventDTO);
        return new ResponseEntity<StandardResponse>(new StandardResponse(201, "SUCCESS", message), HttpStatus.CREATED);
    }

    @GetMapping(
            path = {"/get-all-events"}
    )
    public ResponseEntity<StandardResponse> getAllEvents(){
        List<ResponseGetAllEvents> allEvents = eventService.getAllEvents();
        return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", allEvents), HttpStatus.OK);
    }

    @DeleteMapping(
            path = {"/delete-event/{id}"}
    )
    public ResponseEntity<StandardResponse> deleteEventById(@PathVariable(value = "id") int eventId){
        String message = eventService.deleteEventById(eventId);
        return new ResponseEntity<StandardResponse>(new StandardResponse(200, "SUCCESS", message), HttpStatus.OK);
    }

    @GetMapping(
            path = {"/get-event-by-id"},
            params = "id"
    )
    public ResponseEntity<StandardResponse> getEventById(@RequestParam(value = "id") int eventId){
        EventDTO eventDTO = eventService.getEventById(eventId);
        return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", eventDTO), HttpStatus.OK);
    }
}
