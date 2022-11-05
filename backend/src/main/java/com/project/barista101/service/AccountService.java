package com.project.barista101.service;

import java.io.File;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.project.barista101.data.ERoles;
import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.account.Roles;
import com.project.barista101.payload.request.AccountRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.RoleRepository;
import com.project.barista101.utils.ProfileImageUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {
    
    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    private final RoleRepository roleRepository;

    public List<Accounts> getAllAccounts(){
        return accountRepository.findAll();
    }

    public Accounts getAccount(UUID accountId){
        return accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));
    }

    public Accounts addAccount(MultipartFile file, AccountRequest accountRequest) {

        String username = accountRequest.getUsername();
        String email = accountRequest.getEmail();
        
        if(accountRepository.existsByUsername(username)){
            throw new IllegalStateException("Account with current username already exists: "+username);
        }

        if(accountRepository.existsByEmail(email)){
            throw new IllegalStateException("Account with current email already exists: "+email);
        }

        Roles role = roleRepository.findByName(ERoles.ROLE_USER)
            .orElseThrow(() -> new IllegalStateException("Role with current name cannot be found"+ERoles.ROLE_USER));

        Accounts account = new Accounts();
        account.setUsername(username);
        account.setEmail(email);
        account.setPassword(accountRequest.getPassword());
        account.setFullname(accountRequest.getFullname());
        account.setRole(role);
        account.setProfileImg(addImage(file));

        return accountRepository.save(account);
    }

    public Accounts editAccount(MultipartFile file, UUID accountId, AccountRequest accountRequest) {
        
        Accounts account = getAccount(accountId);

        String username = accountRequest.getUsername();
        String fullname = accountRequest.getFullname();
        String email = accountRequest.getEmail();

        if(accountRepository.existsByUsername(username)){
            throw new IllegalStateException("Account with current username already exists: "+username);
        }

        if(username != null && username.length() > 0 && !Objects.equals(account.getUsername(), username)){
            account.setUsername(username);
        }

        if(fullname != null && fullname.length() > 0 && !Objects.equals(account.getFullname(), fullname)){
            account.setFullname(fullname);
        }

        if(accountRepository.existsByEmail(email)){
            throw new IllegalStateException("Account with current email already exists: "+email);
        }

        if(email != null && email.length() > 0 && !Objects.equals(account.getEmail(), email)){
            account.setEmail(email);
        }

        if(file != null){
            account.setProfileImg(addImage(file));
        }

        return accountRepository.save(account);
    }

    public void changePassword(String currentPassword, String newPassword){
        
        // Accounts account = authService.getCurrentAccount();

        // if(!passwordEncoder.matches(currentPassword, account.getPassword())){
        //     throw new IllegalStateException("The current password is not correct");
        // }

        // if(newPassword != null && newPassword.length() > 0){
        //     account.setPassword(passwordEncoder.encode(newPassword));
        // }

        // accountRepository.save(account);
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
