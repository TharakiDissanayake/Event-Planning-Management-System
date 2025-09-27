package com.epms.backend.repository;

import com.epms.backend.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface OfferRepository extends JpaRepository<Offer, Integer> {
}
