package com.ujjaval.ecommerce.commondataservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CommonDataServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CommonDataServiceApplication.class, args);
    }
}
