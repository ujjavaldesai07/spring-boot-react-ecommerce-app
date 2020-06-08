package com.ujjaval.ecommerce.selleraccountservice.entity.sql;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class SellerInfo {

    @Id
    private int id;

    private int userId;

    private double balance;

    private float rating;

    private String companyName;

    private boolean verificationStatus;

    private int accountType;

    private String lastLoginTime;

    private int totalActiveOrders;

    private int totalCancelledOrders;

    private int totalDeliveredOrders;

    private int totalOrders;
}
