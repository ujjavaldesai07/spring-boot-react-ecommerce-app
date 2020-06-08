package com.ujjaval.ecommerce.selleraccountservice.entity.nosql;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SellerMessageDetails {
    private int msgSeqNum;

    private int status;

    private String msgBody;

    private String msgSubject;

    private String senderName;

    private String timestamp;

    private boolean starred;
}
