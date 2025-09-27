package com.epms.backend.service.impl;

import com.epms.backend.dto.CustomerDTO;
import com.epms.backend.dto.OfferDTO;
import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSaveOfferDTO;
import com.epms.backend.dto.requests.RequestUpdateOfferDTO;
import com.epms.backend.dto.responses.ResponseGetAllOffers;
import com.epms.backend.entity.Customer;
import com.epms.backend.entity.Offer;;
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
            offer.setOfferDiscount(requestUpdateOfferDTO.getOfferDiscount());
            offer.setStartDate(requestUpdateOfferDTO.getStartDate());
            offer.setEndDate(requestUpdateOfferDTO.getEndDate());
            offer.setPackageCategories(requestUpdateOfferDTO.getPackageCategories());
            offer.setEventCategories(requestUpdateOfferDTO.getEventCategories());
            offer.setOfferDescription(requestUpdateOfferDTO.getOfferDescription());
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
}
