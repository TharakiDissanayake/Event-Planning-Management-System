package com.epms.backend.service.impl;

import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSavePackageDataDTO;
import com.epms.backend.dto.requests.RequestUpdatePackageDataDTO;
import com.epms.backend.entity.PackageData;
import com.epms.backend.entity.enums.PackageCategory;
import com.epms.backend.exceptions.NotFoundException;
import com.epms.backend.repository.PackageDataRepository;
import com.epms.backend.service.PackageDataService;
import com.epms.backend.util.mappaers.PackageDataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageDataServiceIMPL implements PackageDataService {
    @Autowired
    private PackageDataRepository packageDataRepository;
    @Autowired
    private PackageDataMapper packageDataMapper;

    @Override
    public String savePackageData(RequestSavePackageDataDTO requestSavePackageDataDTO) {
        PackageData packageData = packageDataMapper.DTOToEntity(requestSavePackageDataDTO);
        if(!packageDataRepository.existsById(packageData.getPackageId())){
            packageDataRepository.save(packageData);
            return "Package with name "+ packageData.getPackageName() + " saved sucessfully.";
        }else {
            throw new NotFoundException("Customer with ID "+ packageData.getPackageId() + " already exists.");
        }
    }

    @Override
    public String updatePackageData(int packageId, RequestUpdatePackageDataDTO requestUpdatePackageDataDTO) {
        if(packageDataRepository.existsById(packageId)){
            PackageData packageData = packageDataRepository.getReferenceById(packageId);
            packageData.setPackageCategory(requestUpdatePackageDataDTO.getPackageCategory());
            packageData.setPackageName(requestUpdatePackageDataDTO.getPackageName());
            packageData.setPackageDescription(requestUpdatePackageDataDTO.getPackageDescription());
            packageData.setPackagePrice(requestUpdatePackageDataDTO.getPackagePrice());
            packageDataRepository.save(packageData);
            return "Package with ID "+ packageId + " updated successfully.";
        }else {
            throw new NotFoundException("Package with ID "+ packageId + " Not found.");
        }
    }

    @Override
    public List<PackageDataDTO> getAllPackages() {
        List<PackageData> packageDataList = packageDataRepository.findAll();
        if(packageDataList.size() > 0){
            List<PackageDataDTO> packageDataDTOList = packageDataMapper.EntityListToDTOList(packageDataList);
            return packageDataDTOList;
        }else{
            throw new NotFoundException("No packages found");
        }
    }

    @Override
    public String deletePackageById(int packageId) {
        if(packageDataRepository.existsById(packageId)){
            packageDataRepository.deleteById(packageId);
            return packageId + " deleted successfully";
        }else {
            throw new NotFoundException("Package with id " + packageId + " does not exist");
        }
    }

    @Override
    public List<PackageDataDTO> getPackagesByCategory(PackageCategory packageCategory) {
        return List.of();
    }
}
