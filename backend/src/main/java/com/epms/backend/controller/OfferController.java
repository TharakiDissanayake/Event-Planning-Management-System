package com.epms.backend.controller;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.OfferDTO;
import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSaveOfferDTO;
import com.epms.backend.dto.requests.RequestUpdateOfferDTO;
import com.epms.backend.dto.requests.RequestUpdatePackageDataDTO;
import com.epms.backend.dto.responses.ResponseGetAllOffers;
import com.epms.backend.service.OfferService;
import com.epms.backend.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/v1/offer")
public class OfferController {
    @Autowired
    private OfferService offerService;

    @PostMapping(
            path = {"/save-offer"}
    )
    public ResponseEntity<StandardResponse> saveOffer(@RequestBody RequestSaveOfferDTO requestSaveOfferDTO){
        String message = offerService.saveOffer(requestSaveOfferDTO);
        return new ResponseEntity<StandardResponse>(new StandardResponse(201, "SUCCESS", message), HttpStatus.CREATED);
    }

    @PutMapping(
            path = {"update-offer"},
            params = "id"
    )
    public ResponseEntity<StandardResponse> updateOffer(@RequestParam(value = "id") int offerId, @RequestBody RequestUpdateOfferDTO requestUpdateOfferDTO){
        String message = offerService.updateOffer(offerId, requestUpdateOfferDTO);
        return new ResponseEntity<StandardResponse>(new StandardResponse(201, "SUCCESS", message), HttpStatus.CREATED);
    }

    @GetMapping(
            path = {"get-all-offers"}
    )
    public ResponseEntity<StandardResponse> getAllOffers(){
        List<ResponseGetAllOffers> allOffers = offerService.getAllOffers();
        return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", allOffers), HttpStatus.OK);
    }

    @DeleteMapping(
            path = {"delete-offer/{id}"}
    )
    public ResponseEntity<StandardResponse> deleteOfferById(@PathVariable(value = "id") int offerId){
        String message = offerService.deleteOfferById(offerId);
        return new ResponseEntity<StandardResponse>(new StandardResponse(200, "SUCCESS", message), HttpStatus.OK);
    }

    @GetMapping(
            path = {"get-offer-by-id"},
            params = "id"
    )
    public ResponseEntity<StandardResponse> getOfferById(@RequestParam(value = "id") int offerId){
        OfferDTO offerDTO = offerService.getOfferById(offerId);
        return new ResponseEntity<StandardResponse>(new StandardResponse(200, "SUCCESS", offerDTO), HttpStatus.OK);
    }
}
