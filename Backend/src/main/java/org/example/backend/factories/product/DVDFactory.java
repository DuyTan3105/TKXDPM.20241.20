package org.example.backend.factories.product;

import org.example.backend.constants.enums.MediaType;
import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.entities.product.DVD;
import org.springframework.stereotype.Controller;

@Controller
public class DVDFactory extends AbstractMediaFactory<DVD> {

    @Override
    protected DVD createEmptyMedia() {
        return new DVD();
    }

    @Override
    protected void initializeDefaultValues(DVD media) {
        media.setType(MediaType.DVD.toString());
    }

    @Override
    protected void mapRequestToMedia(DVD media, CreateProductRequest request) {
//        media.setTitle(request.getTitle());
//        media.setPrice(request.getPrice());
//        media.setDuration(request.getDuration());
//        media.setDirector(request.getDirector());
    }
}
