package com.epms.backend.dto.responses;

import com.epms.backend.entity.Customer;
import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
public class ResponseGetAllEvents {
    private int eventId;
    private EventCategory eventCategory;
    private String eventTitle;
    private LocalDate eventDate;
    private Customer identityNumber;
    private Status status;
    private String description;
    private String eventImage;
    
    // Explicit getter and setter methods
    public int getEventId() {
        return eventId;
    }
    
    public void setEventId(int eventId) {
        this.eventId = eventId;
    }
    
    public EventCategory getEventCategory() {
        return eventCategory;
    }
    
    public void setEventCategory(EventCategory eventCategory) {
        this.eventCategory = eventCategory;
    }
    
    public String getEventTitle() {
        return eventTitle;
    }
    
    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }
    
    public LocalDate getEventDate() {
        return eventDate;
    }
    
    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }
    
    public Customer getIdentityNumber() {
        return identityNumber;
    }
    
    public void setIdentityNumber(Customer identityNumber) {
        this.identityNumber = identityNumber;
    }
    
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEventImage() {
        return eventImage;
    }

    public void setEventImage(String eventImage) {
        this.eventImage = eventImage;
    }
}
