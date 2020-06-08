package com.ujjaval.ecommerce.selleraccountservice.entity.nosql;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document
public class SellerBulkInfo {

    @Id
    private int id;

    private SellerMessage sellerMessage;

    private ArrayList<SellerReview> sellerReview;

    private ArrayList<SellerAccountNotification> sellerAccountNotification;
}
