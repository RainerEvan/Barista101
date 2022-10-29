package com.project.barista101.model;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles")
public class Roles {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    private String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable( name = "role_has_access",
                joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
                inverseJoinColumns = @JoinColumn(name = "role_access_id", referencedColumnName = "id"))
    private Set<RoleAccess> roleAccesses = new HashSet<>();
}
