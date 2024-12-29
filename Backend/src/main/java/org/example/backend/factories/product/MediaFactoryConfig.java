package org.example.backend.factories.product;

import org.example.backend.constants.enums.MediaType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class MediaFactoryConfig {

    @Bean
    public Map<MediaType, MediaFactory> mediaFactories(
            AudioBookFactory audioBookFactory,
            BookFactory bookFactory,
            CDFactory cdFactory,
            DVDFactory dvdFactory
    ) {
        Map<MediaType, MediaFactory> factories = new HashMap<>();
        factories.put(MediaType.AUDIO_BOOK, audioBookFactory);
        factories.put(MediaType.BOOK, bookFactory);
        factories.put(MediaType.CD, cdFactory);
        factories.put(MediaType.DVD, dvdFactory);
        return factories;
    }
}