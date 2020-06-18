package com.ujjaval.ecommerce.commondataservice.entity.sql.images;

import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ProductBrandCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class BrandImages {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String title;

    private String filePath;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private ProductBrandCategory productBrandCategory;

    public BrandImages(String title, String filePath) {
        this.title = title;
        this.filePath = filePath;
    }
}
