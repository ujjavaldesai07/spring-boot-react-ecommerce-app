package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ApparelImagesDTO implements Serializable {

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
class ApparelDTO implements Serializable {
    private int id;
}

@Getter
@Setter
@NoArgsConstructor
@ToString
class GenderDTO implements Serializable {
    private int id;
}

