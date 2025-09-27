package com.epms.backend.service;

import com.epms.backend.dto.OfferDTO;
import com.epms.backend.dto.requests.RequestSaveOfferDTO;
import com.epms.backend.dto.requests.RequestUpdateOfferDTO;
import com.epms.backend.dto.responses.ResponseGetAllOffers;

import java.util.List;

public interface OfferService {
    String saveOffer(RequestSaveOfferDTO requestSaveOfferDTO);

    String updateOffer(int offerId, RequestUpdateOfferDTO requestUpdateOfferDTO);

    List<ResponseGetAllOffers> getAllOffers();

    String deleteOfferById(int offerId);

    OfferDTO getOfferById(int offerId);
}
