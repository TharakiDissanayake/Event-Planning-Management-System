package com.epms.backend.dto;

import com.epms.backend.entity.Customer;
import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class EventDTO {
    private EventCategory eventCategory;
    private String eventTitle;
    private LocalDate eventDate;
    private String startTime;
    private Status status;
    private Customer identityNumber;
}
