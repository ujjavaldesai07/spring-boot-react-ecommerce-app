package com.ujjaval.ecommerce.commondataservice.entity.sql.images;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class CarouselImages {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String link;

    private String filePath;

    public CarouselImages(String link, String filePath) {
        this.link = link;
        this.filePath = filePath;
    }
}
