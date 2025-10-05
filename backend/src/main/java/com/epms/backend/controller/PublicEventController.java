package com.epms.backend.controller;

import com.epms.backend.dto.EventDTO;
import com.epms.backend.service.EventService;
import com.epms.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/public")
public class PublicEventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/save-event")
    public ResponseEntity<StandardResponse> saveEventPublic(@RequestBody EventDTO eventDTO) {
        try {
            System.out.println("Received public event save request: " + eventDTO.getEventTitle());
            String message = eventService.saveEvent(eventDTO);
            return new ResponseEntity<>(new StandardResponse(201, "SUCCESS", message), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(
                new StandardResponse(500, "ERROR", "Error saving event: " + e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}