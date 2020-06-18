package com.ujjaval.ecommerce.commondataservice.entity.sql.info;

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
public class BankInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int customerId;

    private int sellerId;

    private String firstName;

    private String lastName;

    private String bankName;

    private String routingNumber;

    private String accountNumber;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private AddressInfo addressInfo;

    @ManyToOne
    @JoinColumn(name = "contact_id")
    private ContactInfo contactInfo;

    public BankInfo(int customerId, int sellerId, String firstName, String lastName, String bankName, String routingNumber, String accountNumber) {
        this.customerId = customerId;
        this.sellerId = sellerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bankName = bankName;
        this.routingNumber = routingNumber;
        this.accountNumber = accountNumber;
    }
}
