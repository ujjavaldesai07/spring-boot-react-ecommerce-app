package com.ujjaval.ecommerce.selleraccountservice.dao.nosql;

import com.ujjaval.ecommerce.selleraccountservice.entity.nosql.SellerBulkInfo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SellerBulkInfoRepository extends MongoRepository<SellerBulkInfo, Integer> {
}
