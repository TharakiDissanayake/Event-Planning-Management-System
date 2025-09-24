package com.epms.backend.dto.requests;

import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.PackageCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RequestUpdatePackageDataDTO {
    private PackageCategory packageCategory;
    private int capacity;
    private String includes;
    private EventCategory eventCategory;
    private int packagePrice;
    private boolean packageStatus;
}
