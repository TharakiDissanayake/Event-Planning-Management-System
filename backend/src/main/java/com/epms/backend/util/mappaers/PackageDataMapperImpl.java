package com.epms.backend.util.mappaers;

import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSavePackageDataDTO;
import com.epms.backend.entity.PackageData;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PackageDataMapperImpl implements PackageDataMapper {

    @Override
    public PackageData DTOToEntity(RequestSavePackageDataDTO requestSavePackageDataDTO) {
        PackageData packageData = new PackageData();
        
        // Don't set packageId since it's auto-generated
        packageData.setPackageName(requestSavePackageDataDTO.getPackageName());
        packageData.setPackageCategory(requestSavePackageDataDTO.getPackageCategory());
        packageData.setCapacity(requestSavePackageDataDTO.getCapacity());
        packageData.setIncludes(requestSavePackageDataDTO.getIncludes());
        packageData.setEventCategories(requestSavePackageDataDTO.getEventCategories());
        packageData.setPackagePrice(requestSavePackageDataDTO.getPackagePrice());
        packageData.setPackageStatus(requestSavePackageDataDTO.isPackageStatus());
        
        return packageData;
    }

    @Override
    public List<PackageDataDTO> EntityListToDTOList(List<PackageData> packageDataList) {
        return packageDataList.stream().map(this::EntityToDTO).collect(Collectors.toList());
    }
    
    // Helper method to convert single entity to DTO
    public PackageDataDTO EntityToDTO(PackageData packageData) {
        PackageDataDTO packageDataDTO = new PackageDataDTO();
        
        packageDataDTO.setPackageId(packageData.getPackageId());
        packageDataDTO.setPackageName(packageData.getPackageName());
        packageDataDTO.setPackageCategory(packageData.getPackageCategory());
        packageDataDTO.setCapacity(packageData.getCapacity());
        packageDataDTO.setIncludes(packageData.getIncludes());
        packageDataDTO.setEventCategories(packageData.getEventCategories());
        packageDataDTO.setPackagePrice(packageData.getPackagePrice());
        packageDataDTO.setPackageStatus(packageData.isPackageStatus());
        
        return packageDataDTO;
    }
}