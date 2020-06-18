package com.ujjaval.ecommerce.authenticationservice.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AccountCreationRequest {
    private String username;
    private String password;
    private String lastname;
    private String firstname;
    private String email;
}
