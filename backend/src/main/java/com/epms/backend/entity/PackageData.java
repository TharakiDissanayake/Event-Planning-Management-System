package com.epms.backend.entity;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.PackageCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "packageData")
public class PackageData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "package_id", nullable = false)
    private int packageId;

    @Column(name = "package_name",length = 100, nullable = false)
    private String packageName;

    @Enumerated
    @Column(name = "package_category", nullable = false)
    private PackageCategory packageCategory;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "includes", nullable = false, columnDefinition = "TEXT")
    private String includes;

    @ElementCollection(targetClass = EventCategory.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "package_event_categories", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "event_category", nullable = false)
    private List<EventCategory> eventCategories = new ArrayList<>();

    @Column(name = "package_price", nullable = false)
    private int packagePrice;

    @Column(name = "package_status", nullable = false)
    private boolean packageStatus = true;

   public PackageData() {}

   public PackageData(int packageId, String packageName, PackageCategory packageCategory, int capacity, String includes, EventCategory eventCategory, int packagePrice, boolean packageStatus) {
       this.packageId = packageId;
       this.packageName = packageName;
       this.packageCategory = packageCategory;
       this.capacity = capacity;
       this.includes = includes;
       this.eventCategories = eventCategories;
       this.packagePrice = packagePrice;
       this.packageStatus = packageStatus;
   }

   public int getPackageId() {
       return packageId;
   }

   public void setPackageId(int packageId) {
       this.packageId = packageId;
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
}
