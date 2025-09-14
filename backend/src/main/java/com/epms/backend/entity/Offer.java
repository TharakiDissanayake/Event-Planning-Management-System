package com.epms.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "offer")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "offer_id", nullable = false)
    private int offerId;

    @Column(name = "offer_name",length = 100, nullable = false)
    private String offerName;

    @Column(name = "offer_description", nullable = false, columnDefinition = "TEXT")
    private String offerDescription;

    @Column(name = "discount_percentage", nullable = false)
    private int discountPercentage;

    @ManyToOne
    @JoinColumn(name = "package", nullable = false)
    private Package aPackage;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;
}
