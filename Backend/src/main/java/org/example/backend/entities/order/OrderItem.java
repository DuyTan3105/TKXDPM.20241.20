package org.example.backend.entities.order;

import lombok.*;
import org.example.backend.entities.product.Product;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    // Vấn đề 1: Truy cập trực tiếp product làm tăng Stamp Coupling.
    // Giải pháp: Có thể đổi cách lưu trữ (chỉ lưu bằng id) hoặc cung cấp các phương thức thêm, xóa, hoặc truy xuất an toàn.
    private Product product;
    private int quantity;
    private int price;
}

