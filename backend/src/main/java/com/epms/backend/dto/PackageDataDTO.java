package com.epms.backend.dto;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.PackageCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PackageDataDTO {
    private int packageId;
    private String packageName;
    private PackageCategory packageCategory;
    private int capacity;
    private String includes;
    private EventCategory eventCategory;
    private int packagePrice;
    private boolean packageStatus;
}
