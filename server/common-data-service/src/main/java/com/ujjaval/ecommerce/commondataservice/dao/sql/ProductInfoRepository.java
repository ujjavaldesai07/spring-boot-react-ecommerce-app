package com.ujjaval.ecommerce.commondataservice.dao.sql;

import com.ujjaval.ecommerce.commondataservice.entity.sql.ProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductInfoRepository extends JpaRepository<ProductInfo, Integer> {
}
