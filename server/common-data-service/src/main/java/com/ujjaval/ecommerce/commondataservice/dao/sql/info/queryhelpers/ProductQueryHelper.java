package com.ujjaval.ecommerce.commondataservice.dao.sql.info.queryhelpers;

import com.ujjaval.ecommerce.commondataservice.dao.sql.info.queryhelpers.context.ParamsToQueryContext;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class ProductQueryHelper {
    enum QueryType {
        genders, apparels, brands, prices, category, sortby, page;
    }

    private final int NEWEST = 1;
    private final int POPULARITY = 2;
    private final int LOW_TO_HIGH = 3;
    private final int HIGH_TO_LOW = 4;

    @Getter
    @Setter
    @NoArgsConstructor
    class MapParameterKey {
        private Integer key = 1;

        public void increment() {
            ++key;
        }
    }

    public void prepareConditionListById(HashMap<Integer, Object> mapParameters, String data, MapParameterKey mapParametersKey,
                                         List<String> conditions, String field) {
        List<String> tempList = new ArrayList<>();

        for (String val : data.split(",")) {
            mapParameters.put(mapParametersKey.getKey(), Integer.parseInt(val));
            tempList.add("?" + mapParametersKey.getKey());
            mapParametersKey.increment();
        }
        if (data.length() > 0) {
            conditions.add(String.format("(%s IN (%s))", field, String.join(",", tempList)));
        }
    }

    public ParamsToQueryContext getParamsToQueryMap(HashMap<String, String> conditionMap) {
        if (conditionMap == null) {
            return null;
        }

        String[] pageInfo = null;
        List<String> conditions = new ArrayList<>();
        String sortBy = " order by p.ratings desc";
        HashMap<Integer, Object> mapParams = new HashMap<>();
        MapParameterKey mapParametersKey = new MapParameterKey();

        for (Map.Entry<String, String> entry : conditionMap.entrySet()) {
            switch (QueryType.valueOf(entry.getKey())) {
                case genders:
                    prepareConditionListById(mapParams, entry.getValue(), mapParametersKey,
                            conditions, "p.genderCategory.id");
                    break;

                case apparels:
                    prepareConditionListById(mapParams, entry.getValue(), mapParametersKey,
                            conditions, "p.apparelCategory.id");
                    break;

                case brands:
                    prepareConditionListById(mapParams, entry.getValue(), mapParametersKey,
                            conditions, "p.productBrandCategory.id");
                    break;

                case prices:
                    prepareConditionListById(mapParams, entry.getValue(), mapParametersKey,
                            conditions, "p.priceRangeCategory.id");
                    break;

                case category:
                    if (entry.getValue().equals("all")) {
                        conditions.add(String.format(" (1 = ?%d)", mapParametersKey.getKey()));
                        mapParams.put(mapParametersKey.getKey(), 1);
                        mapParametersKey.increment();
                    }
                    break;

                case sortby:
                    switch (Integer.parseInt(entry.getValue())) {
                        case NEWEST:
                            sortBy = " order by p.publicationDate desc";
                            break;
                        case POPULARITY:
                            sortBy = " order by p.ratings desc";
                            break;
                        case LOW_TO_HIGH:
                            sortBy = " order by p.price asc";
                            break;
                        case HIGH_TO_LOW:
                            sortBy = " order by p.price desc";
                            break;
                    }
                    break;

                case page:
                    pageInfo = entry.getValue().split(",");
                    break;
                default:
                    System.out.println("UnsupportedType");
            }
        }

        System.out.println("condition = " + String.join(" AND ", conditions));

        if (conditions.isEmpty()) {
            return null;
        }

        return new ParamsToQueryContext(sortBy, mapParams, conditions, pageInfo);
    }
}
