package com.ujjaval.ecommerce.paymentservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PaymentStatus {

    boolean paymentFailed;
    String charge_id;
    String txn_id;
    String receipt_url;

    public PaymentStatus(boolean paymentFailed, String charge_id, String txn_id, String receipt_url) {
        this.paymentFailed = paymentFailed;
        this.charge_id = charge_id;
        this.txn_id = txn_id;
        this.receipt_url = receipt_url;
    }
}
