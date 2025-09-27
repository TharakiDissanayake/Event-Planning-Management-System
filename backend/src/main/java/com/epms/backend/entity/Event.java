package com.epms.backend.entity;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "event")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "event_id", nullable = false)
    private int eventId;

    @Enumerated
    @Column(name = "event_category", nullable = false)
    private EventCategory eventCategory;

    @Column(name = "event_title", length = 200, nullable = false)
    private String eventTitle;

    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    @Column(name = "start_time", nullable = false)
    private String startTime;

    @Enumerated
    @Column(name = "status", nullable = false)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "identity_number", nullable = false)
    private Customer identityNumber;

//    public Event() {}
//
//    public Event(int eventId, EventCategory eventCategory, String eventTitle, LocalDate eventDate, String startTime, Status status, Customer identityNumber) {
//        this.eventId = eventId;
//        this.eventCategory = eventCategory;
//        this.eventTitle = eventTitle;
//        this.eventDate = eventDate;
//        this.startTime = startTime;
//        this.status = status;
//        this.identityNumber = identityNumber;
//    }
//
//    public int getEventId() {
//        return eventId;
//    }
//
//    public void setEventId(int eventId) {
//        this.eventId = eventId;
//    }
//
//    public EventCategory getEventCategory() {
//        return eventCategory;
//    }
//
//    public void setEventCategory(EventCategory eventCategory) {
//        this.eventCategory = eventCategory;
//    }
//
//    public String getEventTitle() {
//        return eventTitle;
//    }
//
//    public void setEventTitle(String eventTitle) {
//        this.eventTitle = eventTitle;
//    }
//
//    public LocalDate getEventDate() {
//        return eventDate;
//    }
//
//    public void setEventDate(LocalDate eventDate) {
//        this.eventDate = eventDate;
//    }
//
//    public String getStartTime() {
//        return startTime;
//    }
//
//    public void setStartTime(String startTime) {
//        this.startTime = startTime;
//    }
//
//    public Status getStatus() {
//        return status;
//    }
//
//    public void setStatus(Status status) {
//        this.status = status;
//    }
//
//    public Customer getIdentityNumber() {
//        return identityNumber;
//    }
//
//    public void setIdentityNumber(Customer identityNumber) {
//        this.identityNumber = identityNumber;
//    }
}
