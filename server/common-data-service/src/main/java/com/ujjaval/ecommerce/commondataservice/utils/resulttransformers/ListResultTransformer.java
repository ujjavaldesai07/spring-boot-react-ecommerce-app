package com.ujjaval.ecommerce.commondataservice.utils.resulttransformers;

import com.ujjaval.ecommerce.commondataservice.dto.FilterAttributesDTO;
import com.ujjaval.ecommerce.commondataservice.dto.FilterAttributesWithTotalItemsDTO;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class ListResultTransformer {

    public List<FilterAttributesWithTotalItemsDTO>
    getFilterAttributesWithTotalItemsResultTransformer(String queryStr, HashMap<Integer, Object> mapParams,
                                                       EntityManager entityManager) {

        Query query = entityManager.createQuery(queryStr);
        mapParams.forEach(query::setParameter);

        return query.unwrap(org.hibernate.query.Query.class)
                .setResultTransformer((IListResultTransformer)
                        (tuple, aliases) -> new FilterAttributesWithTotalItemsDTO((Integer) tuple[0],
                                (String) tuple[1], (Long) tuple[2]
                        )
                ).getResultList();
    }

    public List<FilterAttributesDTO>
    getFilterAttributesResultTransformer(String queryStr, HashMap<Integer, Object> mapParams,
                                         EntityManager entityManager) {

        Query query = entityManager.createQuery(queryStr);
        mapParams.forEach(query::setParameter);

        return query.unwrap(org.hibernate.query.Query.class)
                .setResultTransformer((IListResultTransformer)
                        (tuple, aliases) -> new FilterAttributesDTO((Integer) tuple[0], (String) tuple[1]
                        )
                ).setMaxResults(10)
                .getResultList();
    }
}
