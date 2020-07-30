package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ApparelImagesDTO {

    private String title;

    private String imageLocalPath;

    private String imageURL;

    private ApparelDTO apparelInfo;

    private GenderDTO genderInfo;

}

@Getter
@Setter
@NoArgsConstructor
@ToString
class ApparelDTO {
    private int id;
}

@Getter
@Setter
@NoArgsConstructor
@ToString
class GenderDTO {
    private int id;
}

