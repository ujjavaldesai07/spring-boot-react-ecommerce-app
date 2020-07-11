package com.ujjaval.ecommerce.commondataservice.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.ujjaval.ecommerce.commondataservice.dto.ApparelImagesDTO;
import com.ujjaval.ecommerce.commondataservice.dto.BrandImagesDTO;
import com.ujjaval.ecommerce.commondataservice.entity.sql.images.CarouselImages;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.StringJoiner;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SearchSuggestionResponse {
    private String title;
    private StringBuilder link;

    public SearchSuggestionResponse(StringJoiner title, StringBuilder link) {
        this.title = title.toString();
        this.link = link;
    }
}
