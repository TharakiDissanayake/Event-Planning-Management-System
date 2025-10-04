package com.epms.backend.repository;

import com.epms.backend.entity.PackageData;
import com.epms.backend.entity.enums.PackageCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface PackageDataRepository extends JpaRepository<PackageData,Integer> {
    List<PackageData> findByPackageCategory(PackageCategory packageCategory);
}
