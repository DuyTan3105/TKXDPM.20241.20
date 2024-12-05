package org.example.backend.entities.cart;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.example.backend.entities.BaseEntity;

import java.util.List;
@Entity
@Table(name = "carts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Cart extends BaseEntity {
    @OneToMany(mappedBy = "cart")
    private List<CartItem> listCartItem;

    private int totalPrice;

}
