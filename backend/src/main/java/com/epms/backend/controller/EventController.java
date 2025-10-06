package com.epms.backend.controller;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.EventDTO;
import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestUpdateEventDTO;
import com.epms.backend.dto.requests.RequestUpdatePackageDataDTO;
import com.epms.backend.dto.responses.ResponseGetAllEvents;
import com.epms.backend.entity.enums.PackageCategory;
import com.epms.backend.entity.enums.Status;
import com.epms.backend.service.EventService;
import com.epms.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/event")
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

    @PutMapping(
            path = {"/update-event"},
            params = "id"
    )
    public ResponseEntity<StandardResponse> updateEvent(@RequestParam(value = "id") int eventId, @RequestBody RequestUpdateEventDTO requestUpdateEventDTO){
        String message = eventService.updateEvent(eventId, requestUpdateEventDTO );
        return new ResponseEntity<StandardResponse>(new StandardResponse(201, "SUCCESS", message), HttpStatus.CREATED);
    }
    
    @GetMapping(
            path = {"/get-events-by-status"},
            params = "status"
    )
    public ResponseEntity<StandardResponse> getEventsByStatus(@RequestParam(value = "status") Status status){
        try {
            List<ResponseGetAllEvents> events = eventService.getEventsByStatus(status);
            return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", events), HttpStatus.OK);
        } catch (Exception e) {
            // Return an empty list instead of an error when no events are found
            return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", new ArrayList<>()), HttpStatus.OK);
        }
    }
}
