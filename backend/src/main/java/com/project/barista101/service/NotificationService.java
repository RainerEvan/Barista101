package com.project.barista101.service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.barista101.model.account.Accounts;
import com.project.barista101.model.notification.Notifications;
import com.project.barista101.payload.request.NotificationRequest;
import com.project.barista101.repository.AccountRepository;
import com.project.barista101.repository.NotificationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationService {
    
    @Autowired
    private final NotificationRepository notificationRepository;
    @Autowired
    private final AccountRepository accountRepository;

    @Transactional
    public List<Notifications> getAllNotificationsForAccount(UUID accountId){
        Accounts account = accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        return notificationRepository.findAllByReceiver(account);
    }

    @Transactional
    public Notifications getNotification(UUID notificationId){
        return notificationRepository.findById(notificationId)
            .orElseThrow(() -> new IllegalStateException("Notification with current id cannot be found"));
    }

    @Transactional
    public Notifications addNotification(NotificationRequest notificationRequest){
        Accounts account = accountRepository.findById(notificationRequest.getReceiverId())
            .orElseThrow(() -> new IllegalStateException("Account with current id cannot be found"));

        Notifications notification = new Notifications();
        notification.setReceiver(account);
        notification.setCreatedAt(OffsetDateTime.now());
        notification.setTitle(notificationRequest.getTitle());
        notification.setBody(notificationRequest.getBody());
        notification.setData(notificationRequest.getData());

        return notificationRepository.save(notification);
    }

    @Transactional
    public void readNotification(UUID notificationId){
        Notifications notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new IllegalStateException("Notification with current id cannot be found"));

        if(!notification.getIsRead()){
            notification.setIsRead(true);
            notificationRepository.save(notification);
        }
    }
}
