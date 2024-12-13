package org.example.backend.entities.delivery;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "delivery_info")
public class DeliveryInfo {
    @Id
    private String deliveryId;
    private String receiverName;
    private String phoneNumber;
    private String province;
    private String address;
    private String instruction;
    private boolean isRushDelivery;
    private LocalTime rushDeliveryTime;
    private int shippingFees;
}

