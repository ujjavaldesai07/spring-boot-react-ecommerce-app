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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class CommonDataController {

    @Autowired
    CommonDataService commonDataService;

    @Autowired
    LoadFakeDataService loadFakeDataService;

    @GetMapping("/load")
    public ResponseEntity<?> loadTestData() {

        if (!loadFakeDataService.loadTestData()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("An error has " +
                    "occurred while loading the data in database");
        }

        return ResponseEntity.ok("Success");
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

    @GetMapping("/search-suggestions")
    public ResponseEntity<?> getSearchSuggestionList() {
        List<SearchSuggestionResponse> searchSuggestionList = commonDataService.getSearchSuggestionList();
        if (searchSuggestionList == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }

        return ResponseEntity.ok(searchSuggestionList);
    }

//    @GetMapping("/save")
//    public Object save() {
//        commonDataService.save();
//        return ResponseEntity.status(HttpStatus.OK);
//    }
}
