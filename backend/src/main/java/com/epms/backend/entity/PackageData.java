package com.epms.backend.entity;

import com.epms.backend.entity.enums.EventCategory;
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

    @Column(name = "package_name",length = 100, nullable = false)
    private String packageName;

    @Enumerated
    @Column(name = "package_category", nullable = false)
    private PackageCategory packageCategory;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "includes", nullable = false, columnDefinition = "TEXT")
    private String includes;

    @Enumerated
    @Column(name = "event_category", nullable = false)
    private EventCategory eventCategory;

    @Column(name = "package_price", nullable = false)
    private int packagePrice;

    @Column(name = "packge_status", columnDefinition = "default 1", nullable = false)
    private boolean packageStatus;
}
