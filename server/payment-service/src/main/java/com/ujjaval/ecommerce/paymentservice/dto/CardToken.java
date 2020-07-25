package com.ujjaval.ecommerce.paymentservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CardToken {
    String id;
    Long amount;
    String currency;

}
