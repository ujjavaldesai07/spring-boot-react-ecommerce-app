package com.ujjaval.ecommerce.commondataservice.model;

import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.PriceRangeCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.SortByCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ProductBrandCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.GenderCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ClothesTypeCategory;
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
public class FilterAttributesComponentResponse implements Serializable {

    private List<ProductBrandCategory> brandList;
    private List<GenderCategory> genderList;
    private List<ClothesTypeCategory> clothesTypeList;
    private List<SortByCategory> sortByCategoryList;
    private List<PriceRangeCategory> priceRangeCategoryList;

    public FilterAttributesComponentResponse(List<ProductBrandCategory> brandList, List<GenderCategory> genderList,
                                             List<ClothesTypeCategory> clothesTypeList, List<SortByCategory> sortByCategoryList,
                                             List<PriceRangeCategory> priceRangeCategoryList) {
        this.brandList = brandList;
        this.genderList = genderList;
        this.clothesTypeList = clothesTypeList;
        this.sortByCategoryList = sortByCategoryList;
        this.priceRangeCategoryList = priceRangeCategoryList;
    }
}
