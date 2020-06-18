package com.ujjaval.ecommerce.commondataservice.service.interfaces;

import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.model.FilterAttributesComponentResponse;
import com.ujjaval.ecommerce.commondataservice.model.MainScreenResponse;

import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;

public interface CommonDataService {

    public ProductInfo findAddressById(Integer id);

    public void save();

    public MainScreenResponse getMainScreenDataList() throws UnknownHostException;

    public FilterAttributesComponentResponse getFilterAttributesComponentList();

    public List<ProductInfo> getFilterProductsComponentList(HashMap<String, String> conditionMap) throws UnknownHostException;
}

