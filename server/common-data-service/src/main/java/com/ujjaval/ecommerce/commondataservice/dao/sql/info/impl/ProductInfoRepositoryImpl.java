package com.ujjaval.ecommerce.commondataservice.dao.sql.info.impl;

import com.ujjaval.ecommerce.commondataservice.dto.FilterAttributeDTO;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ProductBrandCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.model.FilterAttributesResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.transform.ResultTransformer;
import org.javatuples.Pair;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.*;

public class ProductInfoRepositoryImpl {

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

    @Getter
    @Setter
    @NoArgsConstructor
    class ParamsToQueryContext {
        String sortBy;
        HashMap<Integer, Object> mapParams;
        List<String> conditions;
        String[] pageInfo;

        public ParamsToQueryContext(String sortBy, HashMap<Integer, Object> mapParams, List<String> conditions, String[] pageInfo) {
            this.sortBy = sortBy;
            this.mapParams = mapParams;
            this.conditions = conditions;
            this.pageInfo = pageInfo;
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
                    String[] prices = entry.getValue().split(",");
                    for (String price : prices) {
                        switch (Integer.parseInt(price)) {
                            case 1:
                                conditions.add(" (p.price <= 50)");
                                break;
                            case 2:
                                conditions.add(" (p.price between 50 AND 100)");
                                break;
                            case 3:
                                conditions.add(" (p.price between 100 AND 200)");
                                break;
                            case 4:
                                conditions.add(" (p.price between 200 AND 300)");
                                break;
                            case 5:
                                conditions.add(" (p.price between 300 AND 400)");
                                break;
                            case 6:
                                conditions.add(" (p.price >= 500)");
                                break;
                        }
                    }
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

        return new ParamsToQueryContext(sortBy, mapParams, conditions, pageInfo);
    }

    public Pair<Long, List<ProductInfo>> getProductsByCategories(HashMap<String, String> conditionMap) {
        ParamsToQueryContext paramsToQueryContext = getParamsToQueryMap(conditionMap);

        String sortBy = paramsToQueryContext.getSortBy();
        HashMap<Integer, Object> mapParams = paramsToQueryContext.getMapParams();
        List<String> conditions = paramsToQueryContext.getConditions();
        String[] pageInfo = paramsToQueryContext.getPageInfo();

        TypedQuery<Long> totalCountQuery = (TypedQuery<Long>) entityManager.createQuery(
                "select count(*) from ProductInfo p where "
                        + String.join(" AND ", conditions));

        mapParams.forEach(totalCountQuery::setParameter);

        List<Long> totalCountQueryResultList = totalCountQuery.getResultList();

        if (totalCountQueryResultList != null && totalCountQueryResultList.get(0) > 0) {
            Long totalCount = totalCountQueryResultList.get(0);

            TypedQuery<ProductInfo> query = entityManager.createQuery(
                    "select p from ProductInfo p where "
                            + String.join(" AND ", conditions) + sortBy, ProductInfo.class);

            mapParams.forEach(query::setParameter);

            if (pageInfo != null && pageInfo.length == 2) {
                return new Pair<>(totalCount, query.setFirstResult(Integer.parseInt(pageInfo[0]))
                        .setMaxResults(Integer.parseInt(pageInfo[1]))
                        .getResultList());
            }

            return new Pair<>(totalCount, query.getResultList());
        }
        return null;
    }

    public List<ProductInfo> getProductsById(String[] product_ids_str) {
//        System.out.println("product_ids_str = " + product_ids_str[0]);
        List<Integer> productIds = new ArrayList<>();

        for (String id : product_ids_str) {
            productIds.add(Integer.valueOf(id));
        }

        TypedQuery<ProductInfo> query = entityManager.createQuery(
                "SELECT p FROM ProductInfo p WHERE p.id IN (?1)", ProductInfo.class);
        query.setParameter(1, productIds);

        return query.getResultList();
    }

    private List<FilterAttributeDTO> getFilterAttributeResultTransformer(String queryStr,
                                                                         HashMap<Integer, Object> mapParams,
                                                                         List<String> conditions) {

        Query query = entityManager.createQuery(queryStr);
        mapParams.forEach(query::setParameter);
        return query.unwrap(org.hibernate.query.Query.class)
                .setResultTransformer(
                        new ResultTransformer() {
                            @Override
                            public Object transformTuple(
                                    Object[] tuple,
                                    String[] aliases) {
                                return new FilterAttributeDTO((Integer) tuple[0], (String) tuple[1], (Long) tuple[2]);
                            }

                            @Override
                            public List transformList(List tuples) {
                                return tuples;
                            }
                        }
                )
                .getResultList();
    }

    public FilterAttributesResponse getFilterAttributesByProducts(HashMap<String, String> conditionMap) {
        ParamsToQueryContext paramsToQueryContext = getParamsToQueryMap(conditionMap);

        HashMap<Integer, Object> mapParams = paramsToQueryContext.getMapParams();
        List<String> conditions = paramsToQueryContext.getConditions();

        List<FilterAttributeDTO> brandList = getFilterAttributeResultTransformer(
                "SELECT p.productBrandCategory.id, p.productBrandCategory.type, count(*) as totalItems " +
                        "from ProductInfo p where " + String.join(" AND ", conditions) +
                        "group by p.productBrandCategory.id, p.productBrandCategory.type order by totalItems desc",
                mapParams, conditions);

        List<FilterAttributeDTO> genderList = getFilterAttributeResultTransformer(
                "SELECT p.genderCategory.id, p.genderCategory.type, count(*) as totalItems " +
                        "from ProductInfo p where " + String.join(" AND ", conditions) +
                        "group by p.genderCategory.id, p.genderCategory.type order by totalItems desc",
                mapParams, conditions);

        List<FilterAttributeDTO> apparelList = getFilterAttributeResultTransformer(
                "SELECT p.apparelCategory.id, p.apparelCategory.type, count(*) as totalItems " +
                        "from ProductInfo p where " + String.join(" AND ", conditions) +
                        "group by p.apparelCategory.id, p.apparelCategory.type order by totalItems desc",
                mapParams, conditions);

        List<FilterAttributeDTO> priceList = getFilterAttributeResultTransformer(
                "SELECT p.priceRangeCategory.id, p.priceRangeCategory.type, count(*) as totalItems " +
                        "from ProductInfo p where " + String.join(" AND ", conditions) +
                        "group by p.priceRangeCategory.id, p.priceRangeCategory.type order by p.priceRangeCategory.id",
                mapParams, conditions);

        FilterAttributesResponse filterAttributesResponse = new FilterAttributesResponse();
        filterAttributesResponse.setBrands(brandList);
        filterAttributesResponse.setGenders(genderList);
        filterAttributesResponse.setApparels(apparelList);
        filterAttributesResponse.setPrices(priceList);

        return filterAttributesResponse;
    }

}