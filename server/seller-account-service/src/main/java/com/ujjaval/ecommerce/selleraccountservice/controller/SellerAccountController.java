package com.ujjaval.ecommerce.selleraccountservice.controller;

import com.ujjaval.ecommerce.selleraccountservice.entity.nosql.SellerBulkInfo;
import com.ujjaval.ecommerce.selleraccountservice.entity.sql.SellerInfo;
import com.ujjaval.ecommerce.selleraccountservice.service.SellerAccountDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SellerAccountController {

    @Autowired
    private SellerAccountDataService sellerAccountDataService;

    @GetMapping("/save")
    public void saveAddress() {
        sellerAccountDataService.save();
    }

    @GetMapping("/seller/{id}")
    public SellerInfo getAddress(@PathVariable int id) {
        return sellerAccountDataService.findSellerById(id);
    }

    @GetMapping("/seller-bulk/{id}")
    public SellerBulkInfo getAddress() {
        sellerAccountDataService.saveInMongo();
        return sellerAccountDataService.findMongoAddressById();
    }
}
