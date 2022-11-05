package com.project.barista101.payload.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationRequest {
    private UUID receiverId;
    private String title;
    private String body;
    private String data;
}
