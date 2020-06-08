package com.ujjaval.ecommerce.selleraccountservice.entity.nosql;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SellerAccountNotification {

    private int severityLevel;

    private boolean starred;

    private String notificationMsg;

    private String timestamp;
}
