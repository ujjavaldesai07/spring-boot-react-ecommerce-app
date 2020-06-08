package com.ujjaval.ecommerce.commondataservice.dao.sql;

import com.ujjaval.ecommerce.commondataservice.entity.sql.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ContactInfoRepository extends JpaRepository<ContactInfo, Integer> {
}
