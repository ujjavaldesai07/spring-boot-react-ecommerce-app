package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FilterAttributeDTO {

    Integer id;
    String value;
    Long totalItems;

    public FilterAttributeDTO(Integer id, String value, Long totalItems) {
        this.id = id;
        this.value = value;
        this.totalItems = totalItems;
    }
}

