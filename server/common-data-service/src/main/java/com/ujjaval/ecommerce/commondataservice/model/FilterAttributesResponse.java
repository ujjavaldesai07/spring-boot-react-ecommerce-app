package com.ujjaval.ecommerce.commondataservice.model;

import com.ujjaval.ecommerce.commondataservice.dto.FilterAttributeDTO;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.SortByCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class FilterAttributesResponse implements Serializable {

    private List<FilterAttributeDTO> brands;
    private List<FilterAttributeDTO> genders;
    private List<FilterAttributeDTO> apparels;
    private List<SortByCategory> sorts;
    private List<FilterAttributeDTO> prices;

    public FilterAttributesResponse(List<FilterAttributeDTO> brands, List<FilterAttributeDTO> genders,
                                    List<FilterAttributeDTO> apparels, List<FilterAttributeDTO> prices) {
        this.brands = brands;
        this.genders = genders;
        this.apparels = apparels;
        this.prices = prices;
    }
}
