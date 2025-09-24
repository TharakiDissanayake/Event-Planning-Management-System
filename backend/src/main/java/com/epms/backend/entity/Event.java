package com.epms.backend.entity;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

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
}
