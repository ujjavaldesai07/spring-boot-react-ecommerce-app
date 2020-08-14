package com.ujjaval.ecommerce.searchsuggestionservice;

import com.ujjaval.ecommerce.searchsuggestionservice.controller.SearchSuggestionController;
import org.json.JSONException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;

@SpringBootApplication
public class SearchSuggestionServiceApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(SearchSuggestionServiceApplication.class, args);
		context.getBean(SearchSuggestionController.class).loadSearchSuggestions();
	}

}
