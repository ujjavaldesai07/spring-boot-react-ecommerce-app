package com.ujjaval.ecommerce.searchsuggestionservice.service;

import com.ujjaval.ecommerce.searchsuggestionservice.dto.SearchSuggestionKeywordInfo;
import java.util.List;

public interface SearchSuggestionService {
    void loadSearchSuggestionToMap();

    List<SearchSuggestionKeywordInfo> searchKeywordFromMap(String q);

    List<SearchSuggestionKeywordInfo> getDefaultSearchSuggestions();
}

