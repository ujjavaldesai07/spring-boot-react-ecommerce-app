package com.ujjaval.ecommerce.selleraccountservice.entity.nosql;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class SellerReview {

    private double rating;

    private String comment;

    private String timestamp;

}