package com.ujjaval.ecommerce.commondataservice.controller;

import com.sun.net.httpserver.Authenticator;
import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.model.FilterAttributesComponentResponse;
import com.ujjaval.ecommerce.commondataservice.model.MainScreenResponse;
import com.ujjaval.ecommerce.commondataservice.service.interfaces.CommonDataService;
import com.ujjaval.ecommerce.commondataservice.service.interfaces.LoadFakeDataService;
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
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<Authenticator.Success>(HttpStatus.OK);
    }

    @GetMapping("/products")
    public ResponseEntity<?> getFilterProductsComponent(@RequestParam("q") String queryParams) throws UnknownHostException {
        HashMap<String, String> conditionMap = new HashMap<>();

        String[] separatedConditions = queryParams.split("::");

        if (separatedConditions.length == 0 && !queryParams.isEmpty()) {
            String[] categories = queryParams.split("=");
            if (categories.length > 1) {
                conditionMap.put(categories[0], categories[1]);
            }

        } else {

            for (String condition : separatedConditions) {
                String[] categories = condition.split("=");
                if (categories.length > 1) {
                    conditionMap.put(categories[0], categories[1]);
                }
            }
        }
        List<ProductInfo> productInfoList = commonDataService.getFilterProductsComponentList(conditionMap);
        if (productInfoList == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok(productInfoList);
    }

    @GetMapping(value = "/web-images/**")
    public ResponseEntity<InputStreamResource> getWebImage(HttpServletRequest request) throws IOException {
        String mediaType = "image/webp";
        String[] uriSplit =  request.getRequestURI().split("/", 3);
        var imgFile = new ClassPathResource(String.format("static/images/%s", uriSplit[2]));
        return ResponseEntity
                .ok()
                .contentType(MediaType.parseMediaType(mediaType))
                .body(new InputStreamResource(imgFile.getInputStream()));
    }

    @GetMapping("/main")
    public ResponseEntity<?> getMainScreenData() throws UnknownHostException {
        MainScreenResponse mainScreenInfoList = commonDataService.getMainScreenDataList();
        if (mainScreenInfoList == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok(mainScreenInfoList);
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getFilterAttributesComponent() throws UnknownHostException {
        FilterAttributesComponentResponse filterScreenInfoList = commonDataService.getFilterAttributesComponentList();
        if (filterScreenInfoList == null) {
            return new ResponseEntity<Error>(HttpStatus.CONFLICT);
        }
        return ResponseEntity.ok(filterScreenInfoList);
    }

    @GetMapping("/save")
    public Object save() {
        commonDataService.save();
        return ResponseEntity.status(HttpStatus.OK);
    }
}
