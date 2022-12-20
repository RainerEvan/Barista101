package com.project.barista101.payload.request;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EnrollmentRequest {
    private UUID courseId;
    private UUID accountId;
}
