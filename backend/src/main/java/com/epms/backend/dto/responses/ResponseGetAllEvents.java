package com.epms.backend.dto.responses;

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

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ResponseGetAllEvents {
    private int eventId;
    private EventCategory eventCategory;
    private String eventTitle;
    private LocalDate eventDate;
    private Customer identityNumber;
}
