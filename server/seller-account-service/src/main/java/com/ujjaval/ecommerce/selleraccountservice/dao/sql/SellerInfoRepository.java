package com.ujjaval.ecommerce.selleraccountservice.dao.sql;

import com.ujjaval.ecommerce.selleraccountservice.entity.sql.SellerInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerInfoRepository extends JpaRepository<SellerInfo, Integer> {
}
