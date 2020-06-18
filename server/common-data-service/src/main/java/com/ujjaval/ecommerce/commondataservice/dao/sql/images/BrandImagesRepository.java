package com.ujjaval.ecommerce.commondataservice.dao.sql.images;

import com.ujjaval.ecommerce.commondataservice.entity.sql.images.BrandImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BrandImagesRepository extends JpaRepository<BrandImages, Integer> {

    @Query(value = "SELECT DISTINCT b FROM BrandImages b")
    List<BrandImages> getAllData();
}
