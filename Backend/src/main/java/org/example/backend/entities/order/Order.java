package org.example.backend.entities.order;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.example.backend.constants.enums.OrderStatus;
import org.example.backend.entities.BaseEntity;
import org.example.backend.entities.cart.Cart;
import org.example.backend.entities.delivery.DeliveryInfo;

import java.util.List;
@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Order extends BaseEntity {
    @OneToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> listOrderItem;

    @OneToOne
    @JoinColumn(name = "delivery_info_id")
    private DeliveryInfo deliveryInfo;
    private int totalAmount;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;
}
