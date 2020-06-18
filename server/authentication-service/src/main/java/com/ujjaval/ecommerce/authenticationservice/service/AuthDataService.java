package com.ujjaval.ecommerce.authenticationservice.service;

import com.ujjaval.ecommerce.authenticationservice.entity.UserInfo;

import java.security.NoSuchAlgorithmException;

public interface AuthDataService {

    public UserInfo findByUsername(String username);

    public UserInfo findByEmail(String email);

    public void deleteByUsernamePassword(String username, String password) throws NoSuchAlgorithmException;

    public void createUserProfile(UserInfo userInfo) throws NoSuchAlgorithmException;
}
