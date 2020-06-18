package com.ujjaval.ecommerce.authenticationservice.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AccountCreationResponse {
    private String account_creation_status;
    private String error_msg;
}
