package com.epms.backend.util.mappaers;

import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSavePackageDataDTO;
import com.epms.backend.entity.PackageData;

import java.util.List;

public interface PackageDataMapper {
    PackageData DTOToEntity(RequestSavePackageDataDTO requestSavePackageDataDTO);

    List<PackageDataDTO> EntityListToDTOList(List<PackageData> packageDataList);
}
