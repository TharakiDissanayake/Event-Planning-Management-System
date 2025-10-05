package com.epms.backend.service.impl;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.EventDTO;
import com.epms.backend.dto.responses.ResponseGetAllEvents;
import com.epms.backend.entity.Customer;
import com.epms.backend.entity.Event;
import com.epms.backend.entity.Offer;
import com.epms.backend.entity.PackageData;
import com.epms.backend.entity.enums.Status;
import com.epms.backend.exceptions.NotFoundException;
import com.epms.backend.repository.CustomerRepository;
import com.epms.backend.repository.EventRepository;
import com.epms.backend.repository.OfferRepository;
import com.epms.backend.repository.PackageDataRepository;
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
    @Autowired
    private PackageDataRepository packageDataRepository;
    @Autowired
    private OfferRepository offerRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public String saveEvent(EventDTO eventDTO) {
        Event event = eventMapper.DTOToEntity(eventDTO);
        
        // Set the customer
        if (eventDTO.getCustomerId() != null && !eventDTO.getCustomerId().isEmpty()) {
            Customer customer = customerRepository.findById(eventDTO.getCustomerId())
                .orElseThrow(() -> new NotFoundException("Customer not found with ID: " + eventDTO.getCustomerId()));
            event.setIdentityNumber(customer);
        }
        
        // Set the package
        if (eventDTO.getPackageId() > 0) {
            PackageData packageData = packageDataRepository.findById(eventDTO.getPackageId())
                .orElseThrow(() -> new NotFoundException("Package not found with ID: " + eventDTO.getPackageId()));
            event.setPackageData(packageData);
        }
        
        // Set the offer if provided
        if (eventDTO.getOfferId() != null && eventDTO.getOfferId() > 0) {
            Offer offer = offerRepository.findById(eventDTO.getOfferId())
                .orElseThrow(() -> new NotFoundException("Offer not found with ID: " + eventDTO.getOfferId()));
            event.setOffer(offer);
        }
        
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
    public List<ResponseGetAllEvents> getEventsByStatus(Status status) {
        List<Event> eventList = eventRepository.findByStatus(status);
        if(eventList.size() > 0){
            List<ResponseGetAllEvents> eventDTOList = eventMapper.EntityListToDTOList(eventList);
            return eventDTOList;
        }else{
            throw new NotFoundException("No events found with status: " + status);
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
