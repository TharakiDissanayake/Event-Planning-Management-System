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

    // Getter methods
    public int getOfferId() {
        return offerId;
    }

    public String getOfferName() {
        return offerName;
    }

    public int getOfferDiscount() {
        return offerDiscount;
    }

    public List<PackageCategory> getPackageCategories() {
        return packageCategories;
    }

    public List<EventCategory> getEventCategories() {
        return eventCategories;
    }

    public boolean isOfferStatus() {
        return offerStatus;
    }

    // Setter methods
    public void setOfferId(int offerId) {
        this.offerId = offerId;
    }

    public void setOfferName(String offerName) {
        this.offerName = offerName;
    }

    public void setOfferDiscount(int offerDiscount) {
        this.offerDiscount = offerDiscount;
    }

    public void setPackageCategories(List<PackageCategory> packageCategories) {
        this.packageCategories = packageCategories;
    }

    public void setEventCategories(List<EventCategory> eventCategories) {
        this.eventCategories = eventCategories;
    }

    public void setOfferStatus(boolean offerStatus) {
        this.offerStatus = offerStatus;
    }
}
