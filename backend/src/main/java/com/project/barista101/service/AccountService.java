package com.project.barista101.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.Accounts;
import com.project.barista101.repository.AccountRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {
    
    @Autowired
    private final AccountRepository accountRepository;

    public List<Accounts> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Accounts getAccount(UUID accountId){
        return accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));
    }
}
