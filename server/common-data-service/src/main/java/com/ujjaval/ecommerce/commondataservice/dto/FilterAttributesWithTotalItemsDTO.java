package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class FilterAttributesWithTotalItemsDTO implements Serializable {

    Integer id;
    String value;
    Long totalItems;

    public FilterAttributesWithTotalItemsDTO(Integer id, String value, Long totalItems) {
        this.id = id;
        this.value = value;
        this.totalItems = totalItems;
    }
}

