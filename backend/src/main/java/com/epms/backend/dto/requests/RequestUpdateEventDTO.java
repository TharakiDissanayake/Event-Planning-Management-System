package com.epms.backend.dto.requests;

import com.epms.backend.entity.Customer;
import com.epms.backend.entity.Offer;
import com.epms.backend.entity.PackageData;
import com.epms.backend.entity.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
public class RequestUpdateEventDTO {
    private String eventTitle;
    private String startTime;
    private String description;
    private Status status;
    private String eventImage;
    
    // Explicit getters and setters
    public String getEventTitle() {
        return eventTitle;
    }
    
    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }
    
    public String getStartTime() {
        return startTime;
    }
    
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Status getStatus() {
        return status;
    }
    
    public void setStatus(Status status) {
        this.status = status;
    }
    
    public String getEventImage() {
        return eventImage;
    }
    
    public void setEventImage(String eventImage) {
        this.eventImage = eventImage;
    }
}
