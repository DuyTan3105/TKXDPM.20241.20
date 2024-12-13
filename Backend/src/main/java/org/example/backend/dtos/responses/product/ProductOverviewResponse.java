package org.example.backend.dtos.responses.product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductOverviewResponse {
    private String id;
    private String title;
    private int importPrice;
    private int sellPrice;
    private int quantity;
    private String type;
    private String imageURL;
    private boolean rushDeliverySupport;
}
