package com.ujjaval.ecommerce.commondataservice.entity.sql;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class ProductInfo {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private int sellerId;

    private String name;

    private String timestamp;

    private String soldBy;

    private double cost;

    private int availableQuantity;

    private int deliveryTime;

    private String standardName;

    private String category;

    private float ratings;

    private boolean verificationStatus;

    @OneToOne(mappedBy = "productInfo")
    private OrderInfo order;

    public ProductInfo(int sellerId, String name, String timestamp, String soldBy, double cost,
                       int availableQuantity, int deliveryTime, String standardName,
                       String category, float ratings, boolean verificationStatus) {
        this.sellerId = sellerId;
        this.name = name;
        this.timestamp = timestamp;
        this.soldBy = soldBy;
        this.cost = cost;
        this.availableQuantity = availableQuantity;
        this.deliveryTime = deliveryTime;
        this.standardName = standardName;
        this.category = category;
        this.ratings = ratings;
        this.verificationStatus = verificationStatus;
    }
}
