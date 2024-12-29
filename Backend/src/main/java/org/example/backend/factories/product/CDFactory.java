package org.example.backend.factories.product;

import org.example.backend.constants.enums.MediaType;
import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.entities.product.CD;
import org.springframework.stereotype.Component;

@Component
public class CDFactory extends AbstractMediaFactory<CD> {

    @Override
    protected CD createEmptyMedia() {
        return new CD();
    }

    @Override
    protected void initializeDefaultValues(CD media) {
        media.setType(MediaType.CD.toString());
    }

    @Override
    protected void mapRequestToMedia(CD media, CreateProductRequest request) {
//        media.setArtist(request.getArtist());
//        media.setTitle(request.getTitle());
//        media.setPrice(request.getPrice());
//        media.setReleaseDate(request.getReleaseDate());
    }
}
