package com.epms.backend.dto;

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
public class OfferDTO {
    private int offerId;
    private String offerName;
    private Date startDate;
    private Date endDate;
    private int offerDiscount;
    private List<PackageCategory> packageCategories = new ArrayList<>();
    private List<EventCategory> eventCategories = new ArrayList<>();
    private String offerDescription;
    private boolean offerStatus;

    // Getter methods
    public int getOfferId() {
        return offerId;
    }

    public String getOfferName() {
        return offerName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
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

    public String getOfferDescription() {
        return offerDescription;
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

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
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

    public void setOfferDescription(String offerDescription) {
        this.offerDescription = offerDescription;
    }

    public void setOfferStatus(boolean offerStatus) {
        this.offerStatus = offerStatus;
    }
}
