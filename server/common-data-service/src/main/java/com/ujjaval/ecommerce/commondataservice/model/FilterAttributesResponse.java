package com.ujjaval.ecommerce.commondataservice.model;

import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.PriceRangeCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.SortByCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ProductBrandCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.GenderCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ApparelCategory;
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

    private List<ProductBrandCategory> brands;
    private List<GenderCategory> genders;
    private List<ApparelCategory> apparels;
    private List<SortByCategory> sorts;
    private List<PriceRangeCategory> priceRanges;

    public FilterAttributesResponse(List<ProductBrandCategory> brands, List<GenderCategory> genders,
                                    List<ApparelCategory> apparels, List<SortByCategory> sorts,
                                    List<PriceRangeCategory> priceRanges) {
        this.brands = brands;
        this.genders = genders;
        this.apparels = apparels;
        this.sorts = sorts;
        this.priceRanges = priceRanges;
    }
}
