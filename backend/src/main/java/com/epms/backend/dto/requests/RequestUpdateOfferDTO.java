package com.epms.backend.dto.requests;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.PackageCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RequestUpdateOfferDTO {
    private int offerDiscount;
    private Date startDate;
    private Date endDate;
    private List<PackageCategory> packageCategories;
    private List<EventCategory> eventCategories;
    private String offerDescription;
    private boolean offerStatus;
}
