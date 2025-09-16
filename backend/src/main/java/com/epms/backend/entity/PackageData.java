package com.epms.backend.entity;

import com.epms.backend.entity.enums.PackageCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "packageData")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PackageData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "package_id", nullable = false)
    private int packageId;

    @Enumerated
    @Column(name = "package_category", nullable = false)
    private PackageCategory packageCategory;

    @Column(name = "package_name",length = 100, nullable = false)
    private String packageName;

    @Column(name = "package_description", nullable = false, columnDefinition = "TEXT")
    private String packageDescription;

    @Column(name = "package_price", nullable = false)
    private int packagePrice;
}
