package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BrandImagesDTO implements Serializable {

    private String title;

    private String imageLocalPath;

    private String imageURL;

    private BrandCategoryDTO brandInfo;

}

@Getter
@Setter
@NoArgsConstructor
@ToString
class BrandCategoryDTO implements Serializable {
    private int id;
}

