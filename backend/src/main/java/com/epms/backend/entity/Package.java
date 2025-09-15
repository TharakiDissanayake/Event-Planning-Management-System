package com.epms.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "package")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "package_id", nullable = false)
    private int packageId;

    @Column(name = "package_name",length = 100, nullable = false)
    private String packageName;

    @Column(name = "package_description", nullable = false, columnDefinition = "TEXT")
    private String packageDescription;

    @Column(name = "package_price", nullable = false)
    private int packagePrice;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
}
