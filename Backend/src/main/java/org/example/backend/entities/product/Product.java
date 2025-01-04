package org.example.backend.entities.product;

import lombok.*;
import org.example.backend.factories.shipping.ShippingFactory;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "product")
public class Product {
    //    private static Logger LOGGER = Utils.getLogger(Product.class.getName());
    @Id
    protected String id;
    protected String title;
    protected String category;
    protected int importPrice; // the real price of product (eg: 450)
    protected int sellPrice; // the price which will be displayed on browser (eg: 500)
    protected int quantity;
    protected String type;
    protected String imageURL;
    private boolean rushDeliverySupport;

    protected int length;
    protected int width;
    protected int height;
    protected int weight;

    public int getWeight() {
        ShippingFactory.WeightCalculator calculator = new ShippingFactory.WeightCalculatorFactory()
                .getCalculator(weight, length, width, height);
        return (int) calculator.calculateWeight(weight, length, width, height);
    }
}

