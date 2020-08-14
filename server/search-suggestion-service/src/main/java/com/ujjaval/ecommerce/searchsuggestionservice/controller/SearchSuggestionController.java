package com.ujjaval.ecommerce.searchsuggestionservice.controller;

import com.ujjaval.ecommerce.searchsuggestionservice.dto.SearchSuggestionKeywordInfo;
import com.ujjaval.ecommerce.searchsuggestionservice.service.SearchSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class SearchSuggestionController {

    @Autowired
    SearchSuggestionService searchSuggestionService;

    @Autowired
    Environment environment;

    public void loadSearchSuggestions() {
        searchSuggestionService.loadSearchSuggestionToMap();
    }

    @GetMapping("/search-suggestion")
    public ResponseEntity<?> searchKeyword(@RequestParam String q) {
        return ResponseEntity.ok(searchSuggestionService.searchKeywordFromMap(q));
    }

    @GetMapping("/default-search-suggestion")
    public ResponseEntity<?> defaultSearchSuggestions() {
        List<SearchSuggestionKeywordInfo> resultList
                = searchSuggestionService.getDefaultSearchSuggestions();
        return ResponseEntity.ok(resultList);
    }
}
