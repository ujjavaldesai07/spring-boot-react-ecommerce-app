package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FilterAttributesDTO {

    Integer id;
    String value;

    public FilterAttributesDTO(Integer id, String value) {
        this.id = id;
        this.value = value;
    }
}

