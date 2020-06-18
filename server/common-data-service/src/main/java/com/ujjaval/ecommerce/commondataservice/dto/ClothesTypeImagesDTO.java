package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ClothesTypeImagesDTO {

    private String title;

    private String filePath;

    private ClothesTypeDTO clothesTypeInfo;

    private GenderDTO genderInfo;

}

@Getter
@Setter
@NoArgsConstructor
@ToString
class ClothesTypeDTO {
    private int id;
}

@Getter
@Setter
@NoArgsConstructor
@ToString
class GenderDTO {
    private int id;
}

