package org.example.backend.factories.product;

import org.example.backend.constants.enums.MediaType;
import org.example.backend.dtos.requests.product.CreateProductRequest;
import org.example.backend.entities.product.Book;
import org.springframework.stereotype.Component;

@Component
public class BookFactory extends AbstractMediaFactory<Book> {

    @Override
    protected Book createEmptyMedia() {
        return new Book();
    }

    @Override
    protected void initializeDefaultValues(Book media) {
        media.setType(MediaType.BOOK.toString());
    }

    @Override
    protected void mapRequestToMedia(Book media, CreateProductRequest request) {
//        media.setAuthor(request.getAuthor());
//        media.setTitle(request.getTitle());
//        media.setIsbn(request.getIsbn());
    }
}
