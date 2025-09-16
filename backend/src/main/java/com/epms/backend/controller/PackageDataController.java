package com.epms.backend.controller;

import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSavePackageDataDTO;
import com.epms.backend.dto.requests.RequestUpdatePackageDataDTO;
import com.epms.backend.entity.enums.PackageCategory;
import com.epms.backend.service.PackageDataService;
import com.epms.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/package_data")
public class PackageDataController {
    @Autowired
    private PackageDataService packageDataService;

    @PostMapping(
            path = {"/save-package-data"}
    )
    public ResponseEntity<StandardResponse> savePackageData(@RequestBody RequestSavePackageDataDTO requestSavePackageDataDTO){
        String message = packageDataService.savePackageData(requestSavePackageDataDTO);
        return new ResponseEntity<StandardResponse>(new StandardResponse(200, "SUCCESS", message), HttpStatus.OK);
    }

    @PutMapping(
            path = {"/update-package-data"},
            params = "id"
    )
    public ResponseEntity<StandardResponse> updatePackageData(@RequestParam(value = "id") int packageId, @RequestBody RequestUpdatePackageDataDTO requestUpdatePackageDataDTO){
        String message = packageDataService.updatePackageData(packageId, requestUpdatePackageDataDTO);
        return new ResponseEntity<StandardResponse>(new StandardResponse(201, "SUCCESS", message), HttpStatus.CREATED);
    }

    @GetMapping(
            path = {"/get-all-packages"}
    )
    public ResponseEntity<StandardResponse> getAllPackages(){
        List<PackageDataDTO> allPackages = packageDataService.getAllPackages();
        return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", allPackages), HttpStatus.OK);
    }

    @DeleteMapping(
            path = {"/delete-package/{id}"}
    )
    public ResponseEntity<StandardResponse> deletePackageById(@PathVariable(value = "id") int packageId){
        String message = packageDataService.deletePackageById(packageId);
        return new ResponseEntity<StandardResponse>(new StandardResponse(200, "SUCCESS", message), HttpStatus.OK);
    }

    @GetMapping(
            path = {"/get-package-by-category"},
            params = "category"
    )
    public ResponseEntity<StandardResponse> getPackagesByCategory(@RequestParam(value = "category")PackageCategory packageCategory){
        List<PackageDataDTO> packagesByCategory = packageDataService.getPackagesByCategory(packageCategory);
        return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", packagesByCategory), HttpStatus.OK);
    }
}
