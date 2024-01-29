package com.example.fams.repositories.training;

import com.example.fams.models.training.TrainingProgramSyllabus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingProgramSyllabusRepository extends JpaRepository<TrainingProgramSyllabus, Long> {
    @Query("select t from TrainingProgramSyllabus t where t.trainingProgram.trainingProgramCode = :trainingProgramCode")
    List<TrainingProgramSyllabus> findByTrainingProgramCode(@Param("trainingProgramCode") String trainingProgramCode);
   // List<TrainingProgramSyllabus> getAllByTrainingProgramCode(String trainingProgramCode);

    @Modifying
    @Query("DELETE FROM TrainingProgramSyllabus tps WHERE tps.trainingProgram.trainingProgramCode = :code")
    void deleteTrainingProgramSyllabus(@Param("code") String code);

//    @Modifying
//    @Query("INSERT INTO TrainingProgramS (sequence, syllabus, trainingProgram) " +
//            "SELECT :sequence, s, tp FROM Syllabus s, TrainingProgram tp " +
//            "WHERE s.topiccode = :topiccode AND tp.trainingprogramcode = :trainingprogramcode")
//    void customSave(@Param("sequence") String sequence,
//                    @Param("topiccode") String topiccode,
//                    @Param("trainingprogramcode") String trainingprogramcode);
}
