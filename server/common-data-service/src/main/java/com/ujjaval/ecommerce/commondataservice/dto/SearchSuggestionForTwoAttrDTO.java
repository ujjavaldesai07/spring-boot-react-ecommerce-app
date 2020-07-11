package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchSuggestionForTwoAttrDTO {
    Integer attr1_Id;
    String attr1_Name;
    Integer attr2_Id;
    String attr2_Name;

    public SearchSuggestionForTwoAttrDTO(Integer attr1_Id, String attr1_Name, Integer attr2_Id, String attr2_Name) {
        this.attr1_Id = attr1_Id;
        this.attr1_Name = attr1_Name;
        this.attr2_Id = attr2_Id;
        this.attr2_Name = attr2_Name;
    }
}

