package com.example.fams.repositories.clazz;

import com.example.fams.models.clazz.ClassSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClassSubjectRepository extends JpaRepository<ClassSubject,Long> {
    @Query("SELECT c FROM ClassSubject c WHERE  lower(c.classCode) LIKE %:keyword% OR lower(c.className) LIKE %:keyword%")
    List<ClassSubject> searchByCodeOrName(@Param("keyword") String keyword);
    List<ClassSubject> findClassSubjectsByClassCodeOrClassName(String classCode, String className);
    @Query("SELECT c FROM ClassSubject c WHERE c.className like ?1")
    List<ClassSubject> findClassSubjectsByClassName(String className);
    List<ClassSubject> findClassSubjectsByLocation(String location);
    List<ClassSubject> findClassSubjectsByFsu(String fsu);
    List<ClassSubject> findClassSubjectsByStatus(String status);
    List<ClassSubject> findClassSubjectsByClassTime(String time);

    @Query("SELECT c FROM ClassSubject c WHERE c.startDate >= ?1 AND c.endDate <= ?2")
    List<ClassSubject> findClassSubjectsByClassTimeFrame(LocalDate startDate, LocalDate endDate);
    @Query("SELECT c FROM ClassSubject c WHERE c.startDate >= ?1")
    List<ClassSubject> findClassSubjectsByStartDate(LocalDate startDate);
    @Query("SELECT c FROM ClassSubject c WHERE c.endDate <= ?1")
    List<ClassSubject> findClassSubjectsByEndDate(LocalDate endDate);
    @Query("SELECT c FROM ClassSubject c WHERE c.createBy like ?1")
    List<ClassSubject> findClassSubjectsByCreateBy(String name);

    @Query("SELECT MAX(c.classCode) FROM ClassSubject c")
    String findMaxClassId();
    ClassSubject findClassSubjectsByClassCode(String code);
    @Query("SELECT c.location FROM ClassSubject c GROUP BY c.location")
    List<String> locationCLass();
    @Query("SELECT c.fsu FROM ClassSubject c GROUP BY c.fsu")
    List<String> listFSU();

    @Query(value = "SELECT c FROM ClassSubject c WHERE c.trainingProgram.trainingProgramCode =: code")
    List<ClassSubject> findAllClassByTrainingProgramCode(@Param("code") String code);
    Optional<ClassSubject> findClassSubjectByClassCode(String code);
}
