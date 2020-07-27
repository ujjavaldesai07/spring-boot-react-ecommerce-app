package com.ujjaval.ecommerce.paymentservice.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Token;
import com.stripe.param.ChargeCreateParams;
import com.ujjaval.ecommerce.paymentservice.dto.CardToken;
import com.ujjaval.ecommerce.paymentservice.dto.PaymentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;

@RestController
public class PaymentController {

    @Autowired
    private Environment env;

    @PostMapping(value = "/payment")
    public ResponseEntity<PaymentStatus> chargeCustomer(@RequestBody CardToken cardToken) throws UnknownHostException, StripeException {

        Stripe.apiKey = env.getProperty("STRIPE_SECRET_KEY");
        Stripe.setMaxNetworkRetries(2);

        Charge charge = null;
        PaymentStatus paymentStatus = null;

        try {
            ChargeCreateParams params =
                    ChargeCreateParams.builder()
                            .setAmount(cardToken.getAmount())
                            .setCurrency(cardToken.getCurrency())
                            .setDescription("Shopper Buy")
                            .setSource(cardToken.getId())
                            .build();

            charge = Charge.create(params);
            System.out.println("Charge = " + charge);

            paymentStatus = new PaymentStatus(false,
                    charge.getId(),
                    charge.getBalanceTransaction(),
                    charge.getReceiptUrl()
                    );

        } catch (Exception e) {
            paymentStatus = new PaymentStatus();
            paymentStatus.setPaymentFailed(true);
            return ResponseEntity.badRequest().body(paymentStatus);
        }

        return ResponseEntity.ok(paymentStatus);
    }
}
