package org.example.backend.entities.cart;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "cart")
public class Cart {
    @Id
    private String id;
    private List<CartItem> listCartItem;
    private int totalPrice;
}
