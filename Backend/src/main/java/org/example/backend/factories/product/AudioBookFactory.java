package org.example.backend.factories.product;

import org.example.backend.constants.enums.MediaType;
import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.entities.product.AudioBook;
import org.springframework.stereotype.Component;

@Component
public class AudioBookFactory extends AbstractMediaFactory<AudioBook> {

    @Override
    protected AudioBook createEmptyMedia() {
        return new AudioBook();
    }

    @Override
    protected void initializeDefaultValues(AudioBook audioBook) {
        audioBook.setType(MediaType.AUDIO_BOOK.toString());
        audioBook.setFormat("MP3");
        // Set other default values
    }



    @Override
    protected void mapRequestToMedia(AudioBook audioBook, CreateProductRequest request) {
//        if (!(request instanceof AudioBookRequest)) {
//            throw new IllegalArgumentException("Invalid request type");
//        }
//        AudioBookRequest audioBookRequest = (AudioBookRequest) request;
//
//        audioBook.setTitle(audioBookRequest.getTitle());
//        audioBook.setAuthor(audioBookRequest.getAuthor());
//        audioBook.setFormat(audioBookRequest.getFormat());
//        audioBook.setLanguage(audioBookRequest.getLanguage());
//        audioBook.setAccent(audioBookRequest.getAccent());
//        audioBook.setLengthInMinutes(audioBookRequest.getLengthInMinutes());
    }
}
