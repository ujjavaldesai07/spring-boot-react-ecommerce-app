package com.ujjaval.ecommerce.commondataservice.dao.sql.categories;

import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ProductBrandCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductBrandCategoryRepository extends JpaRepository<ProductBrandCategory, Integer> {

    ProductBrandCategory findByBrand(String brand);

    @Query(value = "SELECT p FROM ProductBrandCategory p")
    List<ProductBrandCategory> getAllData();
}
