package com.ujjaval.ecommerce.commondataservice.dao.sql.info;

import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ContactInfoRepository extends JpaRepository<ContactInfo, Integer> {
}
