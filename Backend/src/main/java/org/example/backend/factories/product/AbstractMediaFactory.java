package org.example.backend.factories.product;

import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.entities.product.Product;
import org.springframework.stereotype.Component;

@Component
public abstract class AbstractMediaFactory<T extends Product> implements MediaFactory<T> {

    @Override
    public T createMedia() {
        T media = createEmptyMedia();
        initializeDefaultValues(media);
        return media;
    }

    @Override
    public T createFromRequest(CreateProductRequest request) {
        T media = createEmptyMedia();
        mapRequestToMedia(media, request);
        return media;
    }

    protected abstract T createEmptyMedia();
    protected abstract void initializeDefaultValues(T media);
    protected abstract void mapRequestToMedia(T media, CreateProductRequest request);
}
