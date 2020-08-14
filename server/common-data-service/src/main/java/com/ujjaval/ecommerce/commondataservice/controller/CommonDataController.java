package com.ujjaval.ecommerce.commondataservice.controller;

import com.ujjaval.ecommerce.commondataservice.dto.ProductInfoDTO;
import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.model.FilterAttributesResponse;
import com.ujjaval.ecommerce.commondataservice.model.HomeTabsDataResponse;
import com.ujjaval.ecommerce.commondataservice.model.MainScreenResponse;
import com.ujjaval.ecommerce.commondataservice.model.SearchSuggestionResponse;
import com.ujjaval.ecommerce.commondataservice.service.interfaces.CommonDataService;
import com.ujjaval.ecommerce.commondataservice.service.interfaces.LoadFakeDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Objects;

@RestController
public class CommonDataController {

    @Autowired
    Environment environment;

    @Autowired
    CommonDataService commonDataService;

    @Autowired
    LoadFakeDataService loadFakeDataService;

    public void fillWithTestData() {
        if (Objects.equals(environment.getProperty("ACTIVE_PROFILE"), "no_profile")) {
            loadFakeDataService.loadTestData();
        }
    }

    @GetMapping(value = "/products", params = "q")
    public ResponseEntity<?> getProductsByCategories(@RequestParam("q") String queryParams) {

        ProductInfoDTO productInfoDTO = commonDataService.getProductsByCategories(queryParams);

        if (productInfoDTO == null) {
            return ResponseEntity.badRequest().body("Query has not followed the required format.");
        }

        return ResponseEntity.ok(productInfoDTO);
    }

    @GetMapping(value = "/products", params = "product_id")
    public ResponseEntity<?> getProductsById(@RequestParam("product_id") String queryParams) {

        HashMap<Integer, ProductInfo> resultMap = commonDataService.getProductsById(queryParams);

        if (resultMap == null) {
            return ResponseEntity.badRequest().body("Query has not followed the required format.");
        }

        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/home")
    public ResponseEntity<?> getMainScreenData() {
        MainScreenResponse mainScreenInfoList = commonDataService.getHomeScreenData("homeAPI");
        if (mainScreenInfoList == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }

        return ResponseEntity.ok(mainScreenInfoList);
    }

    @GetMapping("/tabs")
    public ResponseEntity<?> getHomeTabsDataResponse() {
        HomeTabsDataResponse homeTabsDataResponse = commonDataService.getBrandsAndApparelsByGender("tabsAPI");
        if (homeTabsDataResponse == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }

        return ResponseEntity.ok(homeTabsDataResponse);
    }

    @GetMapping(value = "/filter", params = "q")
    public ResponseEntity<?> getFilterAttributesByProducts(@RequestParam("q") String queryParams) {

        FilterAttributesResponse result = commonDataService.getFilterAttributesByProducts(queryParams);

        if (result == null) {
            return ResponseEntity.badRequest().body("Query has not followed the required format.");
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/search-suggestion-list")
    public ResponseEntity<?> getSearchSuggestionList() {
        SearchSuggestionResponse searchSuggestionList = commonDataService.getSearchSuggestionList();
        if (searchSuggestionList == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }

        return ResponseEntity.ok(searchSuggestionList);
    }
}
