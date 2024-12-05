package org.example.backend.entities;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Random;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {
    @Id
    private String id;

    @PrePersist
    protected void onCreate() {
        if (this.id == null || this.id.isEmpty()) {
            this.id = generateSixDigitId(); // Tạo ID 6 chữ số
        }
        customPrePersist();
    }

    // Phương thức tạo ID 6 chữ số ngẫu nhiên
    private String generateSixDigitId() {
        Random random = new Random();
        int number = random.nextInt(900000) + 100000; // Số từ 100000 đến 999999
        return String.valueOf(number);
    }

    protected void customPrePersist() {
        // Logic tuỳ chỉnh, nếu cần
    }

}
