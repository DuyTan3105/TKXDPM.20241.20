package org.example.backend.entities.order;


import lombok.*;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "order")
public class Order {
    @Id
    private String orderId;
    private String cartId;
    private List<OrderItem> listOrderItem;
    private DeliveryInfo deliveryInfo;
    private int totalAmount;
    private String status;
}
