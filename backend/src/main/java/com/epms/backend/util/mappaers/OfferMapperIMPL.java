package com.epms.backend.util.mappaers;

import com.epms.backend.dto.OfferDTO;
import com.epms.backend.dto.PackageDataDTO;
import com.epms.backend.dto.requests.RequestSaveOfferDTO;
import com.epms.backend.dto.responses.ResponseGetAllOffers;
import com.epms.backend.entity.Customer;
import com.epms.backend.entity.Offer;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OfferMapperIMPL implements OfferMapper{
    @Override
    public Offer DTOToEntity(RequestSaveOfferDTO requestSaveOfferDTO) {
        if (requestSaveOfferDTO == null) {
            return null;
        }

        Offer offer = new Offer();
        offer.setOfferName(requestSaveOfferDTO.getOfferName());
        offer.setOfferDiscount(requestSaveOfferDTO.getOfferDiscount());
        offer.setStartDate(requestSaveOfferDTO.getStartDate());
        offer.setEndDate(requestSaveOfferDTO.getEndDate());
        offer.setPackageCategories(requestSaveOfferDTO.getPackageCategories());
        offer.setEventCategories(requestSaveOfferDTO.getEventCategories());
        offer.setOfferDescription(requestSaveOfferDTO.getOfferDescription());
        offer.setOfferImage(requestSaveOfferDTO.getOfferImage());
        offer.setOfferStatus(requestSaveOfferDTO.isOfferStatus());

        return offer;
    }

    @Override
    public List<ResponseGetAllOffers> EntityListToDTOList(List<Offer> offerList) {
        return offerList.stream().map(this::EntityToDTO).collect(Collectors.toList());
    }

    @Override
    public OfferDTO EntityToDTOOffer(Offer offer) {
        OfferDTO offerDTO = new OfferDTO();
        offerDTO.setOfferId(offer.getOfferId());
        offerDTO.setOfferName(offer.getOfferName());
        offerDTO.setOfferDiscount(offer.getOfferDiscount());
        offerDTO.setStartDate(offer.getStartDate());
        offerDTO.setEndDate(offer.getEndDate());
        offerDTO.setPackageCategories(offer.getPackageCategories());
        offerDTO.setEventCategories(offer.getEventCategories());
        offerDTO.setOfferDescription(offer.getOfferDescription());
        offerDTO.setOfferImage(offer.getOfferImage());
        offerDTO.setOfferStatus(offer.isOfferStatus());
        return offerDTO;
    }

    public ResponseGetAllOffers EntityToDTO(Offer offer) {
        ResponseGetAllOffers responseGetAllOffers = new ResponseGetAllOffers();

        responseGetAllOffers.setOfferId(offer.getOfferId());
        responseGetAllOffers.setOfferName(offer.getOfferName());
        responseGetAllOffers.setOfferDiscount(offer.getOfferDiscount());
        responseGetAllOffers.setPackageCategories(offer.getPackageCategories());
        responseGetAllOffers.setEventCategories(offer.getEventCategories());
        responseGetAllOffers.setOfferStatus(offer.isOfferStatus());

        return responseGetAllOffers;
    }
}
