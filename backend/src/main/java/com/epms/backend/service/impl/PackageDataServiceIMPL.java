package com.epms.backend.service.impl;

import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSavePackageDataDTO;
import com.epms.backend.dto.requests.RequestUpdatePackageDataDTO;
import com.epms.backend.entity.PackageData;
import com.epms.backend.entity.enums.EventCategory;
import com.epms.backend.entity.enums.PackageCategory;
import com.epms.backend.exceptions.NotFoundException;
import com.epms.backend.repository.PackageDataRepository;
import com.epms.backend.service.PackageDataService;
import com.epms.backend.util.mappaers.PackageDataMapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageDataServiceIMPL implements PackageDataService {
    @Autowired
    private PackageDataRepository packageDataRepository;
    @Autowired
    private PackageDataMapperImpl packageDataMapper;

    @Override
    public String savePackageData(RequestSavePackageDataDTO requestSavePackageDataDTO) {
        PackageData packageData = packageDataMapper.DTOToEntity(requestSavePackageDataDTO);
        // For new packages, we don't need to check if ID exists since it's auto-generated
        // We could check for duplicate package names instead
        packageDataRepository.save(packageData);
        return "Package with name "+ packageData.getPackageName() + " saved sucessfully.";
    }

    @Override
    public String updatePackageData(int packageId, RequestUpdatePackageDataDTO requestUpdatePackageDataDTO) {
        if(packageDataRepository.existsById(packageId)){
            PackageData packageData = packageDataRepository.getReferenceById(packageId);
            packageData.setPackageName(requestUpdatePackageDataDTO.getPackageName());
            packageData.setPackageCategory(requestUpdatePackageDataDTO.getPackageCategory());
            packageData.setCapacity(requestUpdatePackageDataDTO.getCapacity());
            packageData.setIncludes(requestUpdatePackageDataDTO.getIncludes());
            packageData.setEventCategories(requestUpdatePackageDataDTO.getEventCategories());
            packageData.setPackagePrice(requestUpdatePackageDataDTO.getPackagePrice());
            packageData.setPackageStatus(requestUpdatePackageDataDTO.isPackageStatus());
            packageData.setPackageImage(requestUpdatePackageDataDTO.getPackageImage());
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
        List<PackageData> packageDataList = packageDataRepository.findByPackageCategory(packageCategory);
        if(packageDataList.size() > 0){
            List<PackageDataDTO> packageDataDTOList = packageDataMapper.EntityListToDTOList(packageDataList);
            return packageDataDTOList;
        } else {
            return List.of();
        }
    }
    
    @Override
    public List<PackageDataDTO> getPackagesByEventCategory(String eventCategory) {
        try {
            System.out.println("getPackagesByEventCategory called with: " + eventCategory);
            
            // Convert the string to the corresponding enum value
            EventCategory eventCategoryEnum = EventCategory.valueOf(eventCategory);
            System.out.println("Converted to enum value: " + eventCategoryEnum);
            
            // Get all packages
            List<PackageData> allPackages = packageDataRepository.findAll();
            System.out.println("Total packages found: " + allPackages.size());
            
            // Filter packages by event category AND active status
            List<PackageData> packageDataList = allPackages.stream()
                .filter(pkg -> {
                    boolean containsCategory = pkg.getEventCategories() != null && pkg.getEventCategories().contains(eventCategoryEnum);
                    boolean isActive = pkg.isPackageStatus(); // Check if package is active
                    
                    System.out.println("Package " + pkg.getPackageName() + 
                                     " event categories: " + (pkg.getEventCategories() != null ? pkg.getEventCategories() : "null") + 
                                     ", contains " + eventCategoryEnum + ": " + containsCategory +
                                     ", active: " + isActive);
                    
                    // Only include packages that match both criteria: correct category AND active status
                    return containsCategory && isActive;
                })
                .collect(java.util.stream.Collectors.toList());
            
            System.out.println("Filtered active packages count: " + packageDataList.size());
                
            if(packageDataList.size() > 0){
                List<PackageDataDTO> packageDataDTOList = packageDataMapper.EntityListToDTOList(packageDataList);
                return packageDataDTOList;
            } else {
                return List.of();
            }
        } catch (IllegalArgumentException e) {
            // Handle case where the string doesn't match any enum value
            System.out.println("Invalid event category: " + eventCategory);
            e.printStackTrace();
            return List.of();
        } catch (Exception e) {
            System.out.println("Error in getPackagesByEventCategory: " + e.getMessage());
            e.printStackTrace();
            return List.of();
        }
    }
}
