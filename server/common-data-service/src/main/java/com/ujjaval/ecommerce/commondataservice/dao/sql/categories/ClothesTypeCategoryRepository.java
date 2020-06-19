package com.ujjaval.ecommerce.commondataservice.dao.sql.categories;

import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ClothesTypeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClothesTypeCategoryRepository extends JpaRepository<ClothesTypeCategory, Integer> {

    @Query(value = "SELECT c FROM ClothesTypeImages c where c.clothesTypeCategory.type=?1 and" +
            " c.genderCategory.type=?2")
    ClothesTypeCategory findByClothesTypeAndGender(String clothesType, String Gender);

    @Query(value = "SELECT c FROM ClothesTypeCategory c")
    List<ClothesTypeCategory> getAllData();

    ClothesTypeCategory findByType(String title);
}
