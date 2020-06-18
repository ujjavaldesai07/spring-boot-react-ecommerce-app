package com.ujjaval.ecommerce.commondataservice.dao.sql.images;

import com.ujjaval.ecommerce.commondataservice.entity.sql.images.ClothesTypeImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClothesTypeImagesRepository extends JpaRepository<ClothesTypeImages, Integer> {

    @Query(value = "SELECT DISTINCT c FROM ClothesTypeImages c")
    List<ClothesTypeImages> getAllData();
}
