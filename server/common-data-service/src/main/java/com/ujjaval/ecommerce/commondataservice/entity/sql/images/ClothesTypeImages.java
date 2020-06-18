package com.ujjaval.ecommerce.commondataservice.entity.sql.images;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.ClothesTypeCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.GenderCategory;
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
public class ClothesTypeImages {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String title;

    private String filePath;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "clothestype_id", referencedColumnName = "id")
    @JsonIgnore
    private ClothesTypeCategory clothesTypeCategory;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "gender_id")
    @JsonIgnore
    private GenderCategory genderCategory;

    public ClothesTypeImages(String title, String filePath) {
        this.title = title;
        this.filePath = filePath;
    }
}
