package org.example.backend.entities.product;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Entity
@Table(name = "cds")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue("CD")
@PrimaryKeyJoinColumn(name = "cd_id")
public class CD extends Product {
    String artist;
    String recordLabel;
    String musicType;
    Date releasedDate;
    String form;
}
