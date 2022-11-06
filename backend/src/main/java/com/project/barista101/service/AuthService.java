package com.project.barista101.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.payload.request.SigninRequest;
import com.project.barista101.payload.response.JwtResponse;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.security.details.UserDetailsImpl;
import com.project.barista101.security.jwt.JwtUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {
    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final JwtUtils jwtUtils;

    public Accounts getCurrentAccount(){
        String principal = (String) SecurityContextHolder.getContext().getAuthentication().getName();
        
        return accountRepository.findByUsername(principal)
            .orElseThrow(() -> new UsernameNotFoundException("Account with current username cannot be found: "+principal));
    }

    public JwtResponse signinAccount(SigninRequest signinRequest){
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signinRequest.getUsername(), signinRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtUtils.generateJwtToken(authentication);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            
            String role = userDetails.getAuthorities().iterator().next().getAuthority();

            return new JwtResponse(
                token, 
                jwtUtils.getExpirationFromJwtToken(token), 
                userDetails.getUsername(),
                userDetails.getEmail(),
                role
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid username or password!", e);
        }
    }
}
