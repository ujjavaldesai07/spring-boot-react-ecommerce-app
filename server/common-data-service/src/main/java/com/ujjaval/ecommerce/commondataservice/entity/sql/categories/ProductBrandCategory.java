package com.ujjaval.ecommerce.commondataservice.entity.sql.categories;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.entity.sql.images.BrandImages;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class ProductBrandCategory {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String brand;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "productBrandCategory")
    @JsonIgnore
    private List<ProductInfo> productInfos;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "productBrandCategory")
    @JsonIgnore
    private List<BrandImages> brandImages;

    public ProductBrandCategory(String brand) {
        this.brand = brand;
    }
}
