package org.example.backend.entities.delivery;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.example.backend.entities.BaseEntity;

import java.time.LocalTime;

@Entity
@Table(name = "deliveryInfos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class DeliveryInfo extends BaseEntity {
    private String receiverName;
    private String phoneNumber;
    private String province;
    private String address;
    private String instruction;
    private boolean isRushDelivery;
    private LocalTime rushDeliveryTime;
    private int shippingFees;
}

