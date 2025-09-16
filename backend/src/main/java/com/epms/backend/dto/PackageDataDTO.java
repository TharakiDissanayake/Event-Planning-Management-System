package com.epms.backend.dto;

import com.epms.backend.entity.enums.PackageCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PackageDataDTO {
    private int packageId;
    private PackageCategory packageCategory;
    private String packageName;
    private String packageDescription;
    private int packagePrice;
}
