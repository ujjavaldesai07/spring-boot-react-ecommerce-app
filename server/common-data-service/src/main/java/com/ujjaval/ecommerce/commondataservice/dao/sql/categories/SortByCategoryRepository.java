package com.ujjaval.ecommerce.commondataservice.dao.sql.categories;

import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.SortByCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SortByCategoryRepository extends JpaRepository<SortByCategory, Integer> {

    @Query(value = "SELECT s FROM SortByCategory s")
    List<SortByCategory> getAllData();

    SortByCategory findByType(String type);
}
