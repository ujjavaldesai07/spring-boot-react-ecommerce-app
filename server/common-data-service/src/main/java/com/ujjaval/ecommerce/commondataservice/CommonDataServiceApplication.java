package com.ujjaval.ecommerce.commondataservice;

import com.ujjaval.ecommerce.commondataservice.controller.CommonDataController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;

@SpringBootApplication
@EnableCaching
public class CommonDataServiceApplication {

    public static void main(final String[] args) throws IOException {
        ConfigurableApplicationContext context = SpringApplication.run(CommonDataServiceApplication.class, args);
        context.getBean(CommonDataController.class).fillWithTestData();
        context.getBean(CommonDataController.class).pingOtherServices();
    }
}
