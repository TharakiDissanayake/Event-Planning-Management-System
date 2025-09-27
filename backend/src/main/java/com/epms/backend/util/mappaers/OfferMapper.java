package com.epms.backend.util.mappaers;

import com.epms.backend.dto.OfferDTO;
import com.epms.backend.dto.requests.RequestSaveOfferDTO;
import com.epms.backend.dto.responses.ResponseGetAllOffers;
import com.epms.backend.entity.Offer;

import java.util.List;

public interface OfferMapper {
    Offer DTOToEntity(RequestSaveOfferDTO requestSaveOfferDTO);

    List<ResponseGetAllOffers> EntityListToDTOList(List<Offer> offerList);

    OfferDTO EntityToDTOOffer(Offer offer);
}
