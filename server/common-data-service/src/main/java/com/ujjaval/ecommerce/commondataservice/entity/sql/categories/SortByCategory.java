package com.ujjaval.ecommerce.commondataservice.entity.sql.categories;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class SortByCategory implements Serializable {
    @Id
    private int id;

    private String type;

    public SortByCategory(int id, String type) {
        this.id = id;
        this.type = type;
    }
}
