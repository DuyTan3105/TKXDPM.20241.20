package org.example.backend.entities.cart;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "cart")
public class Cart {
    @Id
    private String id;

    // Vấn đề 1: Truy cập trực tiếp listCartItem làm tăng Stamp Coupling.
    // Giải pháp: Có thể đổi cách lưu trữ (chỉ lưu bằng id) hoặc cung cấp các phương thức thêm, xóa, hoặc truy xuất an toàn.
    private List<CartItem> listCartItem;

    // Vấn đề 2: totalPrice hiện không tự động cập nhật khi listCartItem thay đổi, giảm Cohesion.
    // Giải pháp: Thêm phương thức tính toán totalPrice bên trong class để duy trì tính gắn kết.
    private int totalPrice;
}
