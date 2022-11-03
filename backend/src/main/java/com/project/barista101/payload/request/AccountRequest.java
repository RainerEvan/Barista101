package com.project.barista101.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountRequest {
    private String username;
    private String email;
    private String password;
    private String fullname;
}
