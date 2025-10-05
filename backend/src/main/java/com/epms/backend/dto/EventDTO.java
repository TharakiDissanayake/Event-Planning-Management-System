package com.epms.backend.dto;

import com.epms.backend.entity.Customer;
import com.epms.backend.entity.Offer;
import com.epms.backend.entity.PackageData;
import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
public class EventDTO {
    private int eventId;
    private EventCategory eventCategory;
    private String eventTitle;
    private LocalDate eventDate;
    private String startTime;
    private String description;
    private Status status;
    private String eventImage;
    private int packageId;
    private Integer offerId;
    private String customerId;
    private Customer identityNumber;
    
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
    
    public Customer getIdentityNumber() {
        return identityNumber;
    }
    
    public void setIdentityNumber(Customer identityNumber) {
        this.identityNumber = identityNumber;
    }
    
    public String getEventImage() {
        return eventImage;
    }
    
    public void setEventImage(String eventImage) {
        this.eventImage = eventImage;
    }
    
    public int getPackageId() {
        return packageId;
    }
    
    public void setPackageId(int packageId) {
        this.packageId = packageId;
    }
    
    public Integer getOfferId() {
        return offerId;
    }
    
    public void setOfferId(Integer offerId) {
        this.offerId = offerId;
    }
    
    public String getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
}
