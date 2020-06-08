package com.ujjaval.ecommerce.commondataservice.service;

import com.ujjaval.ecommerce.commondataservice.entity.sql.ProductInfo;

public interface CommonDataService {

    public ProductInfo findAddressById(Integer id);

    public void save();
}

