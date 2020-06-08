package com.ujjaval.ecommerce.authenticationservice.dao;

import com.ujjaval.ecommerce.authenticationservice.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
    @Query(value="SELECT user_id, user_name, first_name, last_name, email, password " +
            "FROM user_info where user_name = :USERNAME ",
            nativeQuery = true)
    Optional<UserInfo> findByUsername(@Param("USERNAME") String USERNAME);

    @Query(value="DELETE FROM user_info where user_name = :USERNAME and password = :PASSWORD",
            nativeQuery = true)
    void deleteByUsernamePassword(@Param("USERNAME") String USERNAME, @Param("PASSWORD") String PASSWORD);

    @Query(value="INSERT INTO `user_info` VALUES ('',:USERNAME, :FIRSTNAME, :LASTNAME, :EMAIL, :PASSWORD",
            nativeQuery = true)
    void saveUserProfile(String USERNAME, String FIRSTNAME, String LASTNAME, String EMAIL, String PASSWORD);
}