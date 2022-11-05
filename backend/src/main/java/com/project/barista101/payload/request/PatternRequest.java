package com.project.barista101.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PatternRequest {
    private String name;
    private String patternImg;
}
