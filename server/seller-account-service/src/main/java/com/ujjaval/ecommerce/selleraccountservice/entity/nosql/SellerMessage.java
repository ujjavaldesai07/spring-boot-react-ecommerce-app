package com.ujjaval.ecommerce.selleraccountservice.entity.nosql;

import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@ToString
public class SellerMessage {

    private Map<Integer, ArrayList<SellerMessageDetails>> msgThreadMap;

    public SellerMessage() {

        msgThreadMap = new HashMap<>();
    }
}