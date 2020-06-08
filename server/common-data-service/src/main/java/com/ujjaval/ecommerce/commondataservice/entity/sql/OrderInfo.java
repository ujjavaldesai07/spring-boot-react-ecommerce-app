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
public class OrderInfo {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private int customerId;

    private String timestamp;

    private String deliveryStatus;

    private String trackPackageLink;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private AddressInfo addressInfo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductInfo productInfo;

    public OrderInfo(int customerId, String timestamp, String deliveryStatus, String trackPackageLink) {
        this.customerId = customerId;
        this.timestamp = timestamp;
        this.deliveryStatus = deliveryStatus;
        this.trackPackageLink = trackPackageLink;
    }
}
