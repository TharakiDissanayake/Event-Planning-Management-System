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
    
    /**
     * Get all active offers filtered by event category, package category, and event date
     * Only returns offers that are active and valid for the event date
     */
    @GetMapping(
            path = {"get-offers-by-categories"},
            params = {"eventCategory", "packageCategory", "eventDate"}
    )
    public ResponseEntity<StandardResponse> getOffersByCategories(
            @RequestParam(value = "eventCategory") String eventCategory,
            @RequestParam(value = "packageCategory") String packageCategory,
            @RequestParam(value = "eventDate", required = false) String eventDate){
        System.out.println("Received request for offers - Event Category: " + eventCategory + 
                         ", Package Category: " + packageCategory + 
                         ", Event Date: " + eventDate);
        
        List<ResponseGetAllOffers> offers = offerService.getOffersByCategories(eventCategory, packageCategory, eventDate);
        
        System.out.println("Returning " + offers.size() + " active offers for the specified criteria");
        return new ResponseEntity<>(new StandardResponse(200, "SUCCESS", offers), HttpStatus.OK);
    }
}
