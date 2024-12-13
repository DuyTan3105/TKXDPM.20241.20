package org.example.backend.entities.cart;

import lombok.*;
import org.example.backend.entities.product.Product;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "cart_item")
public class CartItem {
    // Vấn đề 1: Truy cập trực tiếp product làm tăng Stamp Coupling.
    // Giải pháp: Có thể đổi cách lưu trữ (chỉ lưu bằng id)
    private Product product;
    private int quantity;
}
