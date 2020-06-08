package com.ujjaval.ecommerce.selleraccountservice.service;


import com.ujjaval.ecommerce.selleraccountservice.entity.nosql.SellerBulkInfo;
import com.ujjaval.ecommerce.selleraccountservice.entity.sql.SellerInfo;

public interface SellerAccountDataService {

    public SellerInfo findSellerById(Integer sellerId);

    public void save();

    public void saveInMongo();

    public SellerBulkInfo findMongoAddressById();
}

