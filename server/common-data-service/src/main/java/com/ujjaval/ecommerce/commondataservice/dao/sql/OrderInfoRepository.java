package com.ujjaval.ecommerce.commondataservice.dao.sql;

import com.ujjaval.ecommerce.commondataservice.entity.sql.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Integer> {
}
