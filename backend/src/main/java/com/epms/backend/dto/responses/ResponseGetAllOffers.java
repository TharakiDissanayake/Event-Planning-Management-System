package com.epms.backend.dto.responses;

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
public class ResponseGetAllOffers {
    private int offerId;
    private String offerName;
    private int offerDiscount;
    private List<PackageCategory> packageCategories = new ArrayList<>();
    private List<EventCategory> eventCategories = new ArrayList<>();
    private boolean offerStatus;
}
