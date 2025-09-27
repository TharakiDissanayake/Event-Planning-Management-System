package com.epms.backend.entity;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.PackageCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "offer")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "offer_id", nullable = false)
    private int offerId;

    @Column(name = "offer_name", nullable = false)
    private String offerName;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date", nullable = false)
    private Date endDate;

    @Column(name = "offer_discount", nullable = false)
    private int offerDiscount;

    @ElementCollection(targetClass = PackageCategory.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "offer_package_categories", joinColumns = @JoinColumn(name = "offer_id"))
    @Column(name = "package_category", nullable = false)
    private List<PackageCategory> packageCategories = new ArrayList<>();

    @ElementCollection(targetClass = EventCategory.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "offer_event_categories", joinColumns = @JoinColumn(name = "offer_id"))
    private List<EventCategory> eventCategories = new ArrayList<>();

    @Column(name = "offer_description", nullable = false, columnDefinition = "TEXT")
    private String offerDescription;

    @Column(name = "offer_status", nullable = false)
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
