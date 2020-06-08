package com.ujjaval.ecommerce.authenticationservice.service;

import com.ujjaval.ecommerce.authenticationservice.dao.UserInfoRepository;
import com.ujjaval.ecommerce.authenticationservice.entity.UserInfo;
import com.ujjaval.ecommerce.authenticationservice.util.Md5Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class AuthDataServiceImpl implements AuthDataService {

    @Autowired
    private UserInfoRepository UserInfoRepository;

    public UserInfo findByUsername(String username) {
        Optional<UserInfo> result = UserInfoRepository.findByUsername(username);

        UserInfo userInfo = null;

        if(result.isPresent()) {
            userInfo = result.get();
        } else {
            return null;
        }

        return userInfo;
    }

    public void deleteByUsernamePassword(String username, String password) throws NoSuchAlgorithmException {
        UserInfoRepository.deleteByUsernamePassword(username, Md5Util.getInstance().getMd5Hash(password));
    }

    public void saveUserProfile(UserInfo userInfo) throws NoSuchAlgorithmException {
        UserInfoRepository.saveUserProfile(userInfo.getUserName(),
                userInfo.getFirstName(), userInfo.getLastName(),
                userInfo.getEmail(), Md5Util.getInstance().getMd5Hash(userInfo.getPassword()));
    }
}
