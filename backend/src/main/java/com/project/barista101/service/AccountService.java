package com.project.barista101.service;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.barista101.model.Accounts;
import com.project.barista101.payload.request.AccountRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.utils.ProfileImageUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {
    
    @Autowired
    private final AccountRepository accountRepository;

    public List<Accounts> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Accounts addAccount(MultipartFile file, AccountRequest accountRequest) {

        String email = accountRequest.getEmail();
        
        if(accountRepository.existsByEmail(email)){
            throw new IllegalStateException("Account with current email already exists: "+email);
        }

        Accounts account = new Accounts();
        account.setEmail(email);
        account.setPassword(accountRequest.getPassword());
        account.setFullname(accountRequest.getFullname());
        account.setProfileImg(addImage(file));

        return accountRepository.save(account);
    }


    public Accounts getAccount(UUID accountId){
        return accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));
    }

    public String addImage(MultipartFile file){
        try{
            byte[] image = new byte[0];

            File defaultImg = new File("src/main/resources/image/profile.jpg");
            image = FileUtils.readFileToByteArray(defaultImg);
            
            if(file != null){
                image = ProfileImageUtils.cropImageSquare(file);
            }

            String encodedString = Base64.getEncoder().encodeToString(image);

            return encodedString;
            
        } catch (IOException exception){
            throw new IllegalStateException("Could not add the current file", exception);
        }
    }
    
    public byte[] getProfileImage(UUID accountId){

        Accounts account = getAccount(accountId);

        byte[] decodedBytes = Base64.getDecoder().decode(account.getProfileImg());

        return decodedBytes;
    }
}
