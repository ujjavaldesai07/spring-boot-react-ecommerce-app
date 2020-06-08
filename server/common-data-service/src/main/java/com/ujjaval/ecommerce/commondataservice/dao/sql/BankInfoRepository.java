package com.ujjaval.ecommerce.commondataservice.dao.sql;

import com.ujjaval.ecommerce.commondataservice.entity.sql.BankInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankInfoRepository extends JpaRepository<BankInfo, Integer> {

}
