package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FilterAttributesDTO implements Serializable {
    Integer id;
    String value;
}

