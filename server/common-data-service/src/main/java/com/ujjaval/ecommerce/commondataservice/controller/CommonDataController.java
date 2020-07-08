package com.ujjaval.ecommerce.commondataservice.controller;

import com.sun.net.httpserver.Authenticator;
import com.ujjaval.ecommerce.commondataservice.dto.ProductInfoDTO;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ProductBrandCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.model.FilterAttributesResponse;
import com.ujjaval.ecommerce.commondataservice.model.HomeTabsDataResponse;
import com.ujjaval.ecommerce.commondataservice.model.MainScreenResponse;
import com.ujjaval.ecommerce.commondataservice.service.interfaces.CommonDataService;
import com.ujjaval.ecommerce.commondataservice.service.interfaces.LoadFakeDataService;
import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
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

    public HashMap<String, String> getConditionMapFromQuery(String queryParams) {
        // append :: at the end so that we can split even if there is just one condition
        // for eg ?q=brand=1::
        queryParams = queryParams.concat("::");
        String[] separatedConditions = queryParams.split("::");

        if (separatedConditions.length > 0) {
            HashMap<String, String> conditionMap = new HashMap<>();
            for (String condition : separatedConditions) {
                System.out.println("condition = " + condition);
                String[] categories = condition.split("=");
                if (categories.length > 1) {
                    System.out.println("categories[0] = " + categories[0]);
                    System.out.println("categories[0] = " + categories[1]);
                    conditionMap.put(categories[0], categories[1]);
                }
            }
            return conditionMap;
        }
        return null;
    }

    @GetMapping(value = "/products", params = "q")
    public ResponseEntity<?> getProductsByCategories(@RequestParam("q") String queryParams) throws UnknownHostException {

        HashMap<String, String> conditionMap = getConditionMapFromQuery(queryParams);
        if (!conditionMap.isEmpty()) {

            Pair<Long, List<ProductInfo>> result = commonDataService.getProductsByCategories(conditionMap);

            if (result == null) {
                return new ResponseEntity<>(
                        "No search results are found",
                        HttpStatus.NO_CONTENT);
            }

            ProductInfoDTO productInfoDTO = new ProductInfoDTO(result.getValue0(), result.getValue1());

            return ResponseEntity.ok(productInfoDTO);
        }
        return ResponseEntity.badRequest().body("Query has not followed the required format.");
    }

    @GetMapping(value = "/products", params = "product_id")
    public ResponseEntity<?> getProductsById(@RequestParam("product_id") String queryParams) throws UnknownHostException {
            String[] productIds = queryParams.split(",");

            if(productIds.length > 0) {
                HashMap<Integer, ProductInfo> resultMap = commonDataService.getProductsById(productIds);

            if (resultMap == null) {
                return new ResponseEntity<>(
                        "No search results are found",
                        HttpStatus.NO_CONTENT);
            }

            return ResponseEntity.ok(resultMap);
        }
        return ResponseEntity.badRequest().body("Query has not followed the required format.");
    }

    @GetMapping(value = "/web-images/**")
    public ResponseEntity<InputStreamResource> getWebImage(HttpServletRequest request) throws IOException {
        String mediaType = "image/webp";
        String[] uriSplit = request.getRequestURI().split("/", 3);
        var imgFile = new ClassPathResource(String.format("static/images/%s", uriSplit[2]));
        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(mediaType))
                .body(new InputStreamResource(imgFile.getInputStream()));
    }

    @GetMapping("/home")
    public ResponseEntity<?> getMainScreenData() throws UnknownHostException {
        MainScreenResponse mainScreenInfoList = commonDataService.getHomeScreenData();
        if (mainScreenInfoList == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok(mainScreenInfoList);
    }

    @GetMapping("/tabs")
    public ResponseEntity<?> getHomeTabsDataResponse() {
        HomeTabsDataResponse homeTabsDataResponse = commonDataService.getBrandsAndApparelsByGender();
        if (homeTabsDataResponse == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok(homeTabsDataResponse);
    }

    @GetMapping(value = "/filter", params = "q")
    public ResponseEntity<?> getFilterAttributesByProducts(@RequestParam("q") String queryParams) throws UnknownHostException {

        HashMap<String, String> conditionMap = getConditionMapFromQuery(queryParams);
        if (!conditionMap.isEmpty()) {

            FilterAttributesResponse result = commonDataService.getFilterAttributesByProducts(conditionMap);

            if (result == null) {
                return new ResponseEntity<>(
                        "No search results are found",
                        HttpStatus.NO_CONTENT);
            }

            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body("Query has not followed the required format.");
    }

    @GetMapping("/save")
    public Object save() {
        commonDataService.save();
        return ResponseEntity.status(HttpStatus.OK);
    }
}
