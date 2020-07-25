package com.ujjaval.ecommerce.paymentservice.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Token;
import com.stripe.param.ChargeCreateParams;
import com.ujjaval.ecommerce.paymentservice.dto.CardToken;
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
    public ResponseEntity<?> chargeCustomer(@RequestBody CardToken cardToken) throws UnknownHostException, StripeException {

        Stripe.apiKey = env.getProperty("STRIPE_SECRET_KEY");

        try {
            ChargeCreateParams params =
                    ChargeCreateParams.builder()
                            .setAmount(cardToken.getAmount())
                            .setCurrency(cardToken.getCurrency())
                            .setDescription("Shopper Buy")
                            .setSource(cardToken.getId())
                            .build();

            Charge.create(params);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token does not exist.");
        }

        return ResponseEntity.ok("Success");
    }
}
