package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BrandImagesDTO {

    private String title;

    private String filePath;

    private BrandCategoryDTO brandInfo;

}

@Getter
@Setter
@NoArgsConstructor
@ToString
class BrandCategoryDTO {
    private int id;
}

