package com.ujjaval.ecommerce.commondataservice.entity.sql.info;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class ContactInfo {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String email;

    private String office;

    private String mobile;

    private String other;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "contactInfo")
    @JsonIgnore
    private List<BankInfo> banks;

    public ContactInfo(String email, String office, String mobile, String other) {
        this.email = email;
        this.office = office;
        this.mobile = mobile;
        this.other = other;
    }
}
