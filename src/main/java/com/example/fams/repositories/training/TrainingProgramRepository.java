package com.example.fams.repositories.training;

import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.models.training.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingProgramRepository extends JpaRepository<TrainingProgram,String> {
    @Query("SELECT program FROM TrainingProgram program WHERE lower(program.name) LIKE ?1  || '%' ")
    List<TrainingProgram> findTrainingProgramByName(String name);
    @Query("SELECT program FROM TrainingProgram program WHERE program.name = ?1 ")
    TrainingProgram findTrainingProgram(String name);
    TrainingProgram findTrainingProgramByTrainingProgramCode(String trainingProgramCode);
    @Query(value = "Select t.classSubjects from TrainingProgram t where t.trainingProgramCode=:code")
    List<ClassSubject> findAllClasssubjectByTrainingProgramCode(@Param("code") String code);
    @Query("SELECT program FROM TrainingProgram program WHERE lower(program.name) LIKE ?1  || '%' ")
    List<TrainingProgram> getTrainingProgramByName(String text);

    @Query("SELECT program FROM TrainingProgram program WHERE program.name  LIKE ?1 ")
    List<TrainingProgram> insertTraining(String text);

    @Query("SELECT tp FROM TrainingProgram tp WHERE tp.name like ?1")
    List<TrainingProgram> findTrainingProgramByTrainingName(String trainingName);

    @Query("select program from TrainingProgram program where program.name =: name")
    List<TrainingProgram> findAllByTrainingProgramCode(String name);
}
