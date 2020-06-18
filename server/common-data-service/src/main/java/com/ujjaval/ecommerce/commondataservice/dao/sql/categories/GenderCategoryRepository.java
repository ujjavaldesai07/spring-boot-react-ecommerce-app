package com.ujjaval.ecommerce.commondataservice.dao.sql.categories;

import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.GenderCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GenderCategoryRepository extends JpaRepository<GenderCategory, Integer> {

    GenderCategory findByGender(String gender);

    @Query(value = "SELECT g FROM GenderCategory g")
    List<GenderCategory> getAllData();
}
