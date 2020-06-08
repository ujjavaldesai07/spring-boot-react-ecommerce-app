package com.ujjaval.ecommerce.selleraccountservice.service;

import com.ujjaval.ecommerce.selleraccountservice.dao.nosql.SellerBulkInfoRepository;
import com.ujjaval.ecommerce.selleraccountservice.dao.sql.*;
import com.ujjaval.ecommerce.selleraccountservice.entity.nosql.*;
import com.ujjaval.ecommerce.selleraccountservice.entity.sql.SellerInfo;
import com.ujjaval.ecommerce.selleraccountservice.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

@Service
public class SellerAccountDataServiceImpl implements SellerAccountDataService {

    @Autowired
    private SellerInfoRepository sellerInfoRepository;

    @Autowired
    private SellerBulkInfoRepository sellerBulkInfoRepository;

    public SellerInfo findSellerById(Integer sellerId) {
        Optional<SellerInfo> result = sellerInfoRepository.findById(sellerId);

        SellerInfo sellerInfo = null;

        if(result.isPresent()) {
            sellerInfo = result.get();
        } else {
            throw new RuntimeException("Seller Id is not present " + sellerId);
        }

        return sellerInfo;
    }

    public void save() {
//        AddressInfo addressInfo1 = new AddressInfo("2600 bay area blvd.", "Apt. 304", "77058", "Tx", "USA");
//        ContactInfo contactInfo = new ContactInfo("jmiller@gmail.com", "534636453", "345345353", null);
//        BankInfo bankInfo1 = new BankInfo("john", "miller", "Chase bank", "34345834", "0003424653");
//        BankInfo bankInfo2 = new BankInfo("john", "Filler", "Chase bank", "34345834", "0003424653");
//        bankInfo1.setAddressInfo(addressInfo1);
//        bankInfo1.setContactInfo(contactInfo);
//        bankInfo2.setContactInfo(contactInfo);
//        addressInfoRepository.save(addressInfo1);
//        contactInfoRepository.save(contactInfo);
//        bankInfoRepository.save(bankInfo1);
//        bankInfoRepository.save(bankInfo2);
    }

    public void createSellerAccount(UserInfo userInfo) {
        SellerInfo sellerInfo = new SellerInfo();
    }

    public void saveInMongo() {

        SellerReview sellerReview = new SellerReview(4.5, "Its really good!!",
                "2020-01-01 10:10:10");

        SellerAccountNotification sellerAccountNotification = new SellerAccountNotification(0,
                false, "Your product #32425 is delivered", "2020-01-01 10:10:10");

        SellerMessageDetails sellerMessageDetails = new SellerMessageDetails(1, 1,
                "This is message body", "This is message subject",
                "John Miller", "2020-01-01 10:10:10", true);
        SellerMessage sellerMessage = new SellerMessage();

        sellerMessage.getMsgThreadMap().put(1, new ArrayList<SellerMessageDetails>(Arrays.asList(sellerMessageDetails)));
        SellerBulkInfo sellerBulkInfo = new SellerBulkInfo(324, sellerMessage,
                new ArrayList<SellerReview>(Arrays.asList(sellerReview)),
                new ArrayList<SellerAccountNotification>(Arrays.asList(sellerAccountNotification)));

        sellerBulkInfoRepository.save(sellerBulkInfo);
    }

    public SellerBulkInfo findMongoAddressById() {
        Optional<SellerBulkInfo> result = sellerBulkInfoRepository.findById(324);

        SellerBulkInfo sellerBulkInfo = null;

        if(result.isPresent()) {
            sellerBulkInfo = result.get();
        } else {
            throw new RuntimeException("Mongo Id is not present 324");
        }

        return sellerBulkInfo;
    }

}
