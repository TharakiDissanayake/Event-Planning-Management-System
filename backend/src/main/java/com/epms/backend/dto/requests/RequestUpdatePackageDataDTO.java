package com.epms.backend.dto.requests;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.PackageCategory;
import java.util.List;

public class RequestUpdatePackageDataDTO {
    private String packageName;
    private PackageCategory packageCategory;
    private int capacity;
    private String includes;
    private List<EventCategory> eventCategories;
    private int packagePrice;
    private boolean packageStatus;
    private String packageImage;

    public RequestUpdatePackageDataDTO() {}

    public RequestUpdatePackageDataDTO(String packageName, PackageCategory packageCategory, int capacity, String includes, List<EventCategory> eventCategories, int packagePrice, boolean packageStatus, String packageImage) {
        this.packageName = packageName;
        this.packageCategory = packageCategory;
        this.capacity = capacity;
        this.includes = includes;
        this.eventCategories = eventCategories;
        this.packagePrice = packagePrice;
        this.packageStatus = packageStatus;
        this.packageImage = packageImage;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public PackageCategory getPackageCategory() {
        return packageCategory;
    }

    public void setPackageCategory(PackageCategory packageCategory) {
        this.packageCategory = packageCategory;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getIncludes() {
        return includes;
    }

    public void setIncludes(String includes) {
        this.includes = includes;
    }

    public List<EventCategory> getEventCategories() {
        return eventCategories;
    }

    public void setEventCategories(List<EventCategory> eventCategories) {
        this.eventCategories = eventCategories;
    }

    public int getPackagePrice() {
        return packagePrice;
    }

    public void setPackagePrice(int packagePrice) {
        this.packagePrice = packagePrice;
    }

    public boolean isPackageStatus() {
        return packageStatus;
    }

    public void setPackageStatus(boolean packageStatus) {
        this.packageStatus = packageStatus;
    }

    public String getPackageImage() {
        return packageImage;
    }

    public void setPackageImage(String packageImage) {
        this.packageImage = packageImage;
    }
}
