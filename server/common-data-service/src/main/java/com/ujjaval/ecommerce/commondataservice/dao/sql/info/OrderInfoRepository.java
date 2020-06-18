package com.ujjaval.ecommerce.commondataservice.dao.sql.info;

import com.ujjaval.ecommerce.commondataservice.entity.sql.info.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Integer> {
}
