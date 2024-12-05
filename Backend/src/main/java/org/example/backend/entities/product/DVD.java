package org.example.backend.entities.product;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "dvds")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DiscriminatorValue("DVD")
@PrimaryKeyJoinColumn(name = "dvd_id")
public class DVD extends Product {
    String discType;
    String director;
    String runtime;
    String studio;
    String subtitles;
    Date releasedDate;
    String filmType;
}
