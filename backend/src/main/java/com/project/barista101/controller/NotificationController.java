package com.project.barista101.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.barista101.model.notification.Notifications;
import com.project.barista101.payload.request.NotificationRequest;
import com.project.barista101.service.NotificationService;
import com.project.barista101.utils.ResponseHandler;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/notification")
@AllArgsConstructor
public class NotificationController {
    
    @Autowired
    private final NotificationService notificationService;

    @PostMapping(path = "/add")
    public ResponseEntity<Object> addNotification(@RequestBody NotificationRequest notificationRequest){
        try{
            Notifications notification = notificationService.addNotification(notificationRequest);

            return ResponseHandler.generateResponse("Notification has been added successfully!", HttpStatus.OK, notification);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }

    @DeleteMapping(path = "/read")
    public ResponseEntity<Object> readNotification(@RequestParam("notificationId") UUID notificationId){
        try{
            notificationService.readNotification(notificationId);

            return ResponseHandler.generateResponse("Notification has been deleted successfully!", HttpStatus.OK, null);

        } catch (Exception e){
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.BAD_REQUEST, null);
        }
    }
}
