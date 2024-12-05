package org.example.backend.entities.product;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.entities.BaseEntity;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "category")
public class Product extends BaseEntity {
    protected String title;
    protected int importPrice; // the real price of product (eg: 450)
    protected int sellPrice; // the price which will be displayed on browser (eg: 500)
    protected int quantity;
    protected String type;
    protected String imageURL;
    private boolean rushDeliverySupport;
}

