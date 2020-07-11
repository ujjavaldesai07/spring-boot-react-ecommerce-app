package com.ujjaval.ecommerce.commondataservice.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchSuggestionForThreeAttrDTO {
    Integer genderId;
    String genderName;
    Integer apparelId;
    String apparelName;
    Integer brandId;
    String brandName;

    public SearchSuggestionForThreeAttrDTO(Integer genderId, String genderName, Integer apparelId,
                                           String apparelName, Integer brandId, String brandName) {
        this.genderId = genderId;
        this.genderName = genderName;
        this.apparelId = apparelId;
        this.apparelName = apparelName;
        this.brandId = brandId;
        this.brandName = brandName;
    }
}

