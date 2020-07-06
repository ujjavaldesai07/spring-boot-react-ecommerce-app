package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BrandsAndApparelsDTO {
    List<FilterAttributesDTO> brands;
    List<FilterAttributesDTO> apparels;

    public BrandsAndApparelsDTO(List<FilterAttributesDTO> brands, List<FilterAttributesDTO> apparels) {
        this.brands = brands;
        this.apparels = apparels;
    }
}
