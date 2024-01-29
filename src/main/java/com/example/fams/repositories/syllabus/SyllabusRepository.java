package com.example.fams.repositories.syllabus;

import com.example.fams.dto.trainingprogram.SyllabusDetailDTO;
import com.example.fams.models.syllabus.Syllabus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface SyllabusRepository extends JpaRepository<Syllabus, Long> {

    @Query("SELECT MAX(s.topicCode) FROM Syllabus s WHERE s.publicStatus='PUBLIC'")
    Optional<String> findMaxTopicCode();

    //    @Query("UPDATE TrainingProgram t SET t.status = :status WHERE t.topicCode = :topicCode")
//    void updateTrainingProgramStatus(String status, String topicCode);
    @Query("SELECT s FROM Syllabus s WHERE UPPER(s.topicCode) LIKE UPPER(CONCAT('%', :keyword, '%')) AND s.publicStatus='PUBLIC' OR UPPER(s.topicName) LIKE UPPER(CONCAT('%', :keyword, '%')) AND s.publicStatus='PUBLIC'")
    List<Syllabus> searchByCodeOrName(@Param("keyword") String keyword);


    @Query(value = "select new com.example.fams.dto.trainingprogram.SyllabusDetailDTO(sy.topicName,sy.topicCode, sy.status,sy.version, SUM(tc.duration), sy.modifiedDate, sy.modifiedBy)" +
            " from Syllabus sy" +
            " join TrainingUnit tu on tu.syllabusId = sy" +
            " join TrainingContent tc on tc.unitCode = tu" +
            " where sy.topicCode =:topicCode" +
            " and sy.publicStatus='PUBLIC'" +
            " group by sy")
    SyllabusDetailDTO getSyllabusByTopicCode(@Param("topicCode") String topicCode);

    @Query("select s from TrainingProgramSyllabus tps left join TrainingProgram tp ON tp.trainingProgramCode = tps.trainingProgram.trainingProgramCode right join Syllabus s ON s.topicCode = tps.syllabus.topicCode where tp.name = ?1 AND s.publicStatus='PUBLIC'")
    List<Syllabus> getAllSyllabusByTrainingProgramName(String programName);

    @Query("SELECT MAX(sy.syllabusId) FROM Syllabus sy")
    Long findMaxId();

    @Query("SELECT sy FROM Syllabus sy WHERE sy.topicCode =:topicCode AND sy.publicStatus='PUBLIC'")
    Optional<List<Syllabus>> findByTopicCode(@Param("topicCode") String topicCode);

    @Query("SELECT sy.syllabusId FROM Syllabus sy WHERE sy.topicCode =:topicCode AND sy.publicStatus='PUBLIC'")
    Optional<List<Long>> findIdByTopicCode(@Param("topicCode") String topicCode);

    @Query("SELECT sy FROM Syllabus sy" +
            " WHERE sy.topicCode =:topicCode" +
            " AND sy.version=(SELECT MAX(sy.version) FROM Syllabus sy WHERE sy.topicCode =:topicCode)" +
            " AND sy.publicStatus='PUBLIC'")
    Optional<Syllabus> findByTopicCodeMaxVersion(@Param("topicCode") String topicCode);



    //Syllabus View Query
    @Query("SELECT sy FROM Syllabus sy WHERE sy.publicStatus='PUBLIC'")
    Optional<List<Syllabus>> getSyllabusViewData();


    @Query("SELECT sy FROM Syllabus sy" +
            " WHERE (sy.topicName IN :searchConditions" +
            "    OR sy.topicCode IN :searchConditions" +
            "    OR sy.createBy IN :searchConditions)" +
            "   AND sy.publicStatus='PUBLIC'")
    Optional<List<Syllabus>> getSyllabusViewData(@Param("searchConditions") List<String> searchConditions);

    @Query("SELECT sy FROM Syllabus sy" +
            " WHERE (sy.topicName IN :searchConditions" +
            "    OR sy.topicCode IN :searchConditions" +
            "    OR sy.createBy IN :searchConditions)" +
            "    AND sy.publicStatus='PUBLIC'" +
            "    AND sy.createDate BETWEEN :startDate AND :endDate")
    Optional<List<Syllabus>> getSyllabusViewData(@Param("searchConditions") List<String> searchConditions,
                                                 @Param("startDate") LocalDate startDate,
                                                 @Param("endDate") LocalDate endDate);

    @Query("SELECT sy FROM Syllabus sy " +
            " WHERE sy.createDate BETWEEN :startDate AND :endDate" +
            " AND sy.publicStatus='PUBLIC'")
    Optional<List<Syllabus>> getSyllabusViewData(@Param("startDate") LocalDate startDate,
                                                 @Param("endDate")LocalDate endDate);

    @Query("SELECT MAX(sy.version) FROM Syllabus sy" +
            " WHERE sy.topicCode=:topicCode AND sy.version LIKE CONCAT(:subVersion, '%')" +
            " AND sy.publicStatus='PUBLIC'")
    String findMaxSubVersion( @Param("topicCode") String topicCode,
                                @Param("subVersion") String subVersion);


    @Query("SELECT sy.syllabusId FROM Syllabus sy WHERE sy.topicCode=:topicCode AND sy.version=:version")
    Long findIdByTopicCodeAndVersion(@Param("topicCode") String topicCode,
                                     @Param("version") String version);

    @Query("SELECT sy.version FROM Syllabus sy WHERE sy.topicCode=:topicCode ORDER BY sy.version DESC")
    List<String> findVersionsByTopicCode(String topicCode);

    Syllabus findSyllabusByTopicCode(String code);


    //Syllabus Duplicate Query
//    @Query("SELECT sy FROM Syllabus sy" +
//            " JOIN (SELECT MAX(version) AS top_version, topicCode AS target_code FROM Syllabus GROUP BY topicCode) sub_query" +
//            " ON (sy.version=sub_query.top_version AND sy.topicCode=sub_query.target_code)")
//    Optional<Page<Syllabus>> getSyllabusDataMaxVersion(Pageable pageable);
//
//    @Query("SELECT sy FROM Syllabus sy" +
//            " WHERE sy.topicCode =:topicCode" +
//            " AND sy.version=(SELECT MAX(sy.version) FROM Syllabus sy WHERE sy.topicCode =:topicCode)")
//    Optional<Syllabus> findByTopicCodeMaxVersion(@Param("topicCode") String topicCode);
}
