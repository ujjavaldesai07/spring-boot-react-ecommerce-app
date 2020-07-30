package com.ujjaval.ecommerce.paymentservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PaymentStatus {

    boolean payment_failed;
    Long order_id;
    String charge_id;
    String txn_id;
    String receipt_url;

    public PaymentStatus(Long order_id, boolean payment_failed, String charge_id, String txn_id, String receipt_url) {
        this.order_id = order_id;
        this.payment_failed = payment_failed;
        this.charge_id = charge_id;
        this.txn_id = txn_id;
        this.receipt_url = receipt_url;
    }
}
