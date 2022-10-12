package com.project.barista101.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.barista101.model.Modules;
import com.project.barista101.model.Sections;

@Repository
public interface SectionRepository extends JpaRepository<Sections, UUID> {
    List<Sections> findAllByModule(Modules module);
}
