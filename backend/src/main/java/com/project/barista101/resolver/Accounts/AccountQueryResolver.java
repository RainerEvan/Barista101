package com.project.barista101.resolver.Accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.barista101.service.AccountService;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class AccountQueryResolver {
    
    @Autowired
    private final AccountService accountService;
}
