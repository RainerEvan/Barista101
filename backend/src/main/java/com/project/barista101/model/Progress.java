package com.project.barista101.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Progress {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    private double percentage;
    private boolean isCompleted;

    @ManyToOne
    @JoinColumn(name = "enrollment_id")
    private Enrollments enrollment;

    @ManyToOne
    @JoinColumn(name = "last_content_id")
    private Contents lastContent;
}
