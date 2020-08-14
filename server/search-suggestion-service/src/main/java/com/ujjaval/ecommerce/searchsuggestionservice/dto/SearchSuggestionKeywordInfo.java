package com.ujjaval.ecommerce.searchsuggestionservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchSuggestionKeywordInfo {
    String keyword;
    StringBuilder link;
    Integer rank;

    public SearchSuggestionKeywordInfo(String keyword, StringBuilder link, Integer rank) {
        this.keyword = keyword;
        this.link = new StringBuilder(link);
        this.rank = rank;
    }
}
