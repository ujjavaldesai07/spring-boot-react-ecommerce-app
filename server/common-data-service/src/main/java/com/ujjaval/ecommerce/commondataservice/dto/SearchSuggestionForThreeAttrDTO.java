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
public class SearchSuggestionForThreeAttrDTO implements Serializable {
    Integer attr1_id;
    String attr1_type;
    Integer attr2_id;
    String attr2_type;
    Integer attr3_id;
    String attr3_type;
}

