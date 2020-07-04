package com.ujjaval.ecommerce.commondataservice.service.interfaces;

import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.model.FilterAttributesResponse;
import com.ujjaval.ecommerce.commondataservice.model.MainScreenResponse;
import org.javatuples.Pair;

import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;

public interface CommonDataService {

    ProductInfo findAddressById(Integer id);

    void save();

    MainScreenResponse getHomeScreenData() throws UnknownHostException;

    FilterAttributesResponse getFilterAttributesData();

    Pair<Long, List<ProductInfo>> getProducts(HashMap<String,
            String> conditionMap) throws UnknownHostException;
}

