package com.epms.backend.service.impl;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.OfferDTO;
import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSaveOfferDTO;
import com.epms.backend.dto.requests.RequestUpdateOfferDTO;
import com.epms.backend.dto.responses.ResponseGetAllOffers;
import com.epms.backend.entity.Customer;
import com.epms.backend.entity.Offer;
import com.epms.backend.entity.PackageData;
import com.epms.backend.exceptions.NotFoundException;
import com.epms.backend.repository.OfferRepository;
import com.epms.backend.service.OfferService;
import com.epms.backend.util.mappaers.OfferMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferServiceIMPL implements OfferService {
    @Autowired
    private OfferRepository offerRepository;
    @Autowired
    private OfferMapper offerMapper;

    @Override
    public String saveOffer(RequestSaveOfferDTO requestSaveOfferDTO) {
        Offer offer = offerMapper.DTOToEntity(requestSaveOfferDTO);
        // For new packages, we don't need to check if ID exists since it's auto-generated
        // We could check for duplicate package names instead
        offerRepository.save(offer);
        return "Offer with name "+ offer.getOfferName() + " saved sucessfully.";
    }

    @Override
    public String updateOffer(int offerId, RequestUpdateOfferDTO requestUpdateOfferDTO) {
        if(offerRepository.existsById(offerId)){
            Offer offer = offerRepository.getReferenceById(offerId);
            
            // Update all fields from the DTO
            if (requestUpdateOfferDTO.getOfferName() != null) {
                offer.setOfferName(requestUpdateOfferDTO.getOfferName());
            }
            offer.setOfferDiscount(requestUpdateOfferDTO.getOfferDiscount());
            offer.setStartDate(requestUpdateOfferDTO.getStartDate());
            offer.setEndDate(requestUpdateOfferDTO.getEndDate());
            offer.setPackageCategories(requestUpdateOfferDTO.getPackageCategories());
            offer.setEventCategories(requestUpdateOfferDTO.getEventCategories());
            offer.setOfferDescription(requestUpdateOfferDTO.getOfferDescription());
            offer.setOfferStatus(requestUpdateOfferDTO.isOfferStatus()); // Added status update
            
            // Update image if provided
            if (requestUpdateOfferDTO.getOfferImage() != null && !requestUpdateOfferDTO.getOfferImage().isEmpty()) {
                offer.setOfferImage(requestUpdateOfferDTO.getOfferImage());
            }
            
            offerRepository.save(offer);
            return "Offer with ID "+ offerId + " updated successfully.";
        }else {
            throw new NotFoundException("Offer with ID "+ offerId + " Not found.");
        }
    }

    @Override
    public List<ResponseGetAllOffers> getAllOffers() {
        List<Offer> offerList = offerRepository.findAll();
        if(offerList.size() > 0){
            List<ResponseGetAllOffers> offerDTOList = offerMapper.EntityListToDTOList(offerList);
            return offerDTOList;
        }else{
            throw new NotFoundException("No offers found");
        }
    }

    @Override
    public String deleteOfferById(int offerId) {
        if(offerRepository.existsById(offerId)){
            offerRepository.deleteById(offerId);
            return offerId + " deleted successfully";
        }else {
            throw new NotFoundException("Offer with id " + offerId + " does not exist");
        }
    }

    @Override
    public OfferDTO getOfferById(int offerId) {
        if(offerRepository.existsById(offerId)){
            Offer offer = offerRepository.getReferenceById(offerId);
            OfferDTO offerDTO = offerMapper.EntityToDTOOffer(offer);
            return offerDTO;
        }else {
            throw new NotFoundException("Offer with ID "+ offerId + " Not found.");
        }
    }
    
    @Override
    public List<ResponseGetAllOffers> getOffersByCategories(String eventCategory, String packageCategory, String eventDateStr) {
        try {
            // Convert string to enum for proper comparison
            com.epms.backend.entity.enums.EventCategory eventCategoryEnum = 
                com.epms.backend.entity.enums.EventCategory.valueOf(eventCategory);
            com.epms.backend.entity.enums.PackageCategory packageCategoryEnum = 
                com.epms.backend.entity.enums.PackageCategory.valueOf(packageCategory);
                
            // Parse event date if provided
            java.util.Date eventDate = null;
            if (eventDateStr != null && !eventDateStr.isEmpty()) {
                try {
                    java.text.SimpleDateFormat dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd");
                    eventDate = dateFormat.parse(eventDateStr);
                    System.out.println("Parsed event date: " + eventDate);
                } catch (java.text.ParseException e) {
                    System.out.println("Error parsing event date: " + e.getMessage());
                    // Continue with null event date (won't filter by date)
                }
            }
            
            // Log search criteria
            System.out.println("Searching for offers with event category: " + eventCategoryEnum + 
                            ", package category: " + packageCategoryEnum +
                            ", event date: " + (eventDate != null ? eventDate : "not specified"));
                
            final java.util.Date finalEventDate = eventDate;
            
            List<Offer> offers = offerRepository.findAll().stream()
                .filter(offer -> {
                    boolean matchesEventCategory = offer.getEventCategories() != null && 
                                              offer.getEventCategories().contains(eventCategoryEnum);
                    boolean matchesPackageCategory = offer.getPackageCategories() != null && 
                                                offer.getPackageCategories().contains(packageCategoryEnum);
                    boolean isActive = offer.isOfferStatus();
                    
                    // Check if event date is within offer validity period
                    boolean isDateValid = true; // Default if no date specified
                    if (finalEventDate != null) {
                        isDateValid = (offer.getStartDate().before(finalEventDate) || offer.getStartDate().equals(finalEventDate)) &&
                                      (offer.getEndDate().after(finalEventDate) || offer.getEndDate().equals(finalEventDate));
                    }
                    
                    System.out.println("Offer: " + offer.getOfferName() + 
                                    ", matches event category: " + matchesEventCategory + 
                                    ", matches package category: " + matchesPackageCategory + 
                                    ", is active: " + isActive +
                                    ", valid for event date: " + isDateValid +
                                    ", start date: " + offer.getStartDate() +
                                    ", end date: " + offer.getEndDate());
                    
                    return matchesEventCategory && matchesPackageCategory && isActive && isDateValid;
                })
                .collect(java.util.stream.Collectors.toList());
                
            System.out.println("Found " + offers.size() + " matching offers");
                
            if(offers.size() > 0){
                List<ResponseGetAllOffers> offerDTOList = offerMapper.EntityListToDTOList(offers);
                return offerDTOList;
            }
            return List.of();
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid category value: " + e.getMessage());
            return List.of();
        } catch (Exception e) {
            System.out.println("Error in getOffersByCategories: " + e.getMessage());
            e.printStackTrace();
            return List.of();
        }
    }
}
