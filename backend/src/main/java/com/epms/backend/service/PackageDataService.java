package com.epms.backend.service;

import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSavePackageDataDTO;
import com.epms.backend.dto.requests.RequestUpdatePackageDataDTO;
import com.epms.backend.entity.enums.PackageCategory;

import java.util.List;

public interface PackageDataService {
    String savePackageData(RequestSavePackageDataDTO requestSavePackageDataDTO);

    String updatePackageData(int packageId, RequestUpdatePackageDataDTO requestUpdatePackageDataDTO);

    List<PackageDataDTO> getAllPackages();

    String deletePackageById(int packageId);

    List<PackageDataDTO> getPackagesByCategory(PackageCategory packageCategory);
}
