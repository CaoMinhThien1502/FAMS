package com.example.fams.repositories.syllabus;

import com.example.fams.models.syllabus.LearningObjective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningObjectiveRepository extends JpaRepository<LearningObjective, String> {
    @Query("SELECT l FROM LearningObjective l WHERE l.code like ?1")
    LearningObjective findByCode(String code);
}
