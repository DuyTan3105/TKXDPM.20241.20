package org.example.backend.entities.cart;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.entities.BaseEntity;
import org.example.backend.entities.product.Product;
@Entity
@Table(name = "cart_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartItem extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;
}
