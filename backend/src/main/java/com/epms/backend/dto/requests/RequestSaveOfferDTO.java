package com.epms.backend.dto.requests;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.PackageCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RequestSaveOfferDTO {
    private String offerName;
    private int offerDiscount;
    private Date startDate;
    private Date endDate;
    private List<PackageCategory> packageCategories = new ArrayList<>();
    private List<EventCategory> eventCategories = new ArrayList<>();
    private String offerDescription;
    private boolean offerStatus;
}
