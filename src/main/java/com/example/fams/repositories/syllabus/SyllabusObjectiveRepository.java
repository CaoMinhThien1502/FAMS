package com.example.fams.repositories.syllabus;

import com.example.fams.models.syllabus.LearningObjective;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.models.syllabus.SyllabusObjective;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface SyllabusObjectiveRepository extends JpaRepository<SyllabusObjective, Long> {
    @Query("SELECT lo" +
            " FROM Syllabus sy" +
            " JOIN SyllabusObjective so ON so.syllabusId = sy" +
            " JOIN LearningObjective lo ON so.objectiveCode = lo" +
            " WHERE sy.topicCode = :topicCode")
    Optional<Set<LearningObjective>> getLearningsObjectiveByTopicCode(@Param("topicCode") String topicCode);


    @Query("SELECT lo.code" +
            " FROM Syllabus sy" +
            " JOIN SyllabusObjective so ON so.syllabusId = sy" +
            " JOIN LearningObjective lo ON so.objectiveCode = lo" +
            " WHERE sy.syllabusId = :syllabusId")
    Optional<Set<String>> getObjectiveCodeBySyllabusId(@Param("syllabusId") Long syllabusId);

    @Modifying
    @Query(value = "DELETE FROM tbl_syllabus_objective WHERE objective_code=:objectiveCode AND syllabus_id=:syllabusId",nativeQuery = true)
    void deleteByTopicCodeAndByCode(@Param("syllabusId") Long syllabusId,
                                    @Param("objectiveCode") String objectiveCode);

    @Modifying
    @Query("DELETE FROM SyllabusObjective so WHERE so.syllabusId.syllabusId IN :syllabusIds")
    void deleteBySyllabusList(@Param("syllabusIds") List<Long> syllabusIds);
}
