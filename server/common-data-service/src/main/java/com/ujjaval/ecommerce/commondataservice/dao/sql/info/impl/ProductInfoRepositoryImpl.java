package com.ujjaval.ecommerce.commondataservice.dao.sql.info.impl;

import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProductInfoRepositoryImpl {

    enum QueryType {
        gender, apparel, brand, price, category, sortby, page;

        enum MathOperator {
            bt, lt, gt
        }

        enum SortOperator {
            lh, hl, ratings, newest
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    class MapParameterKey {
        private Integer key = 1;

        public void increment() {
            ++key;
        }
    }

    @PersistenceContext
    private EntityManager entityManager;

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

    public List<ProductInfo> getProductInfoByCategories(HashMap<String, String> conditionMap) {
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
                case gender:
                    prepareConditionListById(mapParams, entry.getValue(), mapParametersKey,
                            conditions, "p.genderCategory.id");
                    break;

                case apparel:
                    prepareConditionListById(mapParams, entry.getValue(), mapParametersKey,
                            conditions, "p.apparelCategory.id");
                    break;

                case brand:
                    prepareConditionListById(mapParams, entry.getValue(), mapParametersKey,
                            conditions, "p.productBrandCategory.id");
                    break;

                case price:
                    // eg bt:100,1000
                    String extractedValue = entry.getValue().substring(3);
                    switch (QueryType.MathOperator.valueOf(entry.getValue().substring(0, 2))) {
                        case bt:
                            String[] range = extractedValue.split(",");
                            conditions.add(String.format(" (p.price between ?%d AND ?%d)", mapParametersKey.getKey(),
                                    mapParametersKey.getKey() + 1));
                            mapParams.put(mapParametersKey.getKey(), Double.parseDouble(range[0]));
                            mapParametersKey.increment();
                            mapParams.put(mapParametersKey.getKey(), Double.parseDouble(range[1]));
                            mapParametersKey.increment();
                            break;
                        case lt:
                            conditions.add(String.format(" (p.price <= ?%d)", mapParametersKey.getKey()));
                            mapParams.put(mapParametersKey.getKey(), Double.parseDouble(extractedValue));
                            mapParametersKey.increment();
                            break;
                        case gt:
                            conditions.add(String.format(" (p.price >= ?%d)", mapParametersKey.getKey()));
                            mapParams.put(mapParametersKey.getKey(), Double.parseDouble(extractedValue));
                            mapParametersKey.increment();
                            break;
                        default:
                            System.out.println("UnsupportedType");
                    }
                    break;

                case category:
                    if (entry.getValue().equals("all")) {
                        System.out.println("Coming here in the category......");
                        conditions.add(String.format(" (1 = ?%d)", mapParametersKey.getKey()));
                        mapParams.put(mapParametersKey.getKey(), 1);
                        mapParametersKey.increment();
                    }
                    break;

                case sortby:
                    switch (QueryType.SortOperator.valueOf(entry.getValue())) {
                        case lh:
                            sortBy = " order by p.price asc";
                            break;
                        case hl:
                            sortBy = " order by p.price desc";
                            break;
                        case ratings:
                            sortBy = " order by p.ratings desc";
                            break;
                        case newest:
                            sortBy = " order by p.publicationDate desc";
                            break;
                    }
                    break;

                case page:
                    pageInfo = entry.getValue().split(",");
                    System.out.println("pageInfo[0] = " + pageInfo[0] + ", pageInfo[1] = " + pageInfo[1]);
                    break;

                default:
                    System.out.println("UnsupportedType");
            }
        }

        System.out.println("condition = " + String.join(" AND ", conditions));

        if (conditions.isEmpty()) {
            return null;
        }

        TypedQuery<ProductInfo> query = entityManager.createQuery(
                "select p from ProductInfo p where "
                + String.join(" AND ", conditions) + sortBy, ProductInfo.class);

        mapParams.forEach(query::setParameter);

        if (pageInfo != null && pageInfo.length == 2) {
            return query.setFirstResult(Integer.parseInt(pageInfo[0]))
                    .setMaxResults(Integer.parseInt(pageInfo[1]))
                    .getResultList();
        }

        return query.getResultList();
    }
}
