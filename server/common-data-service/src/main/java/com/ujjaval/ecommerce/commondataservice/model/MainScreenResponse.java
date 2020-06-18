package com.ujjaval.ecommerce.commondataservice.model;

import com.ujjaval.ecommerce.commondataservice.dto.BrandImagesDTO;
import com.ujjaval.ecommerce.commondataservice.dto.ClothesTypeImagesDTO;
import com.ujjaval.ecommerce.commondataservice.entity.sql.images.CarouselImages;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MainScreenResponse {

    private List<BrandImagesDTO> brands;
    private List<ClothesTypeImagesDTO> clothesTypes;
    private List<CarouselImages> carousels;

    public MainScreenResponse(List<BrandImagesDTO> brands,
                              List<ClothesTypeImagesDTO> clothesTypes,
                              List<CarouselImages> carousels) {
        this.brands = brands;
        this.clothesTypes = clothesTypes;
        this.carousels = carousels;
    }
}
