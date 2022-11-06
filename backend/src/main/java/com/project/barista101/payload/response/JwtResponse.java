package com.project.barista101.payload.response;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String token;
    private Date expirationDate;
    private String username;
    private String email;
    private String role;
}
