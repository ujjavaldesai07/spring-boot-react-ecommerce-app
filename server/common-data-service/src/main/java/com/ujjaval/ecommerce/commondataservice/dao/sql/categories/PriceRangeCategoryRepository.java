package com.ujjaval.ecommerce.commondataservice.dao.sql.categories;

import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.PriceRangeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PriceRangeCategoryRepository extends JpaRepository<PriceRangeCategory, Integer> {

    PriceRangeCategory findByPriceRange(String priceRange);

    @Query(value = "SELECT p FROM PriceRangeCategory p")
    List<PriceRangeCategory> getAllData();
}
