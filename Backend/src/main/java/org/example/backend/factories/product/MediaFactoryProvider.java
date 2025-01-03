package org.example.backend.factories.product;


import lombok.RequiredArgsConstructor;
import org.example.backend.constants.enums.MediaType;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class MediaFactoryProvider {
    private final Map<MediaType, MediaFactory> factories;

    public MediaFactory getFactory(MediaType mediaType) {
        MediaFactory factory = factories.get(mediaType);
        if (factory == null) {
            throw new IllegalArgumentException("No factory found for media type: " + mediaType);
        }
        return factory;
    }
}
