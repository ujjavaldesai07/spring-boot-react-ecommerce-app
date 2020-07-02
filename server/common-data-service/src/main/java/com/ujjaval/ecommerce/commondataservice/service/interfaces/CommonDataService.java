package com.ujjaval.ecommerce.commondataservice.service.interfaces;

import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.model.FilterAttributesResponse;
import com.ujjaval.ecommerce.commondataservice.model.MainScreenResponse;
import org.javatuples.Pair;

import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.List;

public interface CommonDataService {

    public ProductInfo findAddressById(Integer id);

    public void save();

    public MainScreenResponse getHomeScreenData() throws UnknownHostException;

    public FilterAttributesResponse getFilterAttributesData();

    public Pair<Long, List<ProductInfo>> getSelectedProducts(HashMap<String,
            String> conditionMap) throws UnknownHostException;

    public ProductInfo getSelectedProducts(int id) throws UnknownHostException;
}

