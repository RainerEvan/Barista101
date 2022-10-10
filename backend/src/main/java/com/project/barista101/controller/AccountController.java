package com.project.barista101.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.service.AccountService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/account")
@AllArgsConstructor
public class AccountController {
    
    @Autowired
    private final AccountService accountService;
}
