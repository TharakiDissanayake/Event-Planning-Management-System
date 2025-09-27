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

    // Getter methods
    public int getOfferDiscount() {
        return offerDiscount;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
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
    public void setOfferDiscount(int offerDiscount) {
        this.offerDiscount = offerDiscount;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
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
