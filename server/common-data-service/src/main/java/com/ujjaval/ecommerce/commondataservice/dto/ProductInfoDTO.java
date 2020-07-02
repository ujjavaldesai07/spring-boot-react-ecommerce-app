package com.ujjaval.ecommerce.commondataservice.dto;

import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ProductInfoDTO {

    private Long totalCount;

    private List<ProductInfo> products;

    public ProductInfoDTO(Long totalCount, List<ProductInfo> products) {
        this.totalCount = totalCount;
        this.products = products;
    }
}