package com.example.fams.repositories.training;

import com.example.fams.dto.Syllabus.SyllabusViewDTO;
import com.example.fams.dto.trainingprogram.TrainingUnitDetailOfListDTO;
import com.example.fams.dto.trainingunit.TrainingContentDetailOfListDTO;
import com.example.fams.models.training.TrainingUnit;
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
public interface TrainingUnitRepository extends JpaRepository<TrainingUnit, String> {

    @Query(value = "SELECT COUNT (DISTINCT unit_code) FROM tbl_training_unit WHERE topic_code = ?", nativeQuery = true)
    Integer numberOfUnits(String topicCode);

    @Query(value = "SELECT * FROM tbl_training_unit WHERE syllabus_id = ?", nativeQuery = true)
    Optional<List<TrainingUnit>> findAllByTopicCode(Long syllabusId);

//    @Query(value = "SELECT tu.")
//    Optional<List<TrainingUnit>> findAllByTopicCodev2(String topicCode);


    @Query(value = "SELECT (DISTINCT day_number) FROM tbl_training_unit", nativeQuery = true)
    List<Integer> getDayNumber();

    @Query(value = "SELECT COUNT (DISTINCT unit_code) FROM tbl_training_unit WHERE day_number = ?", nativeQuery = true)
    Integer numberOfUnitsByDayNumber(Integer dayNumber);

    @Query(value = "SELECT (DISTINCT unit_code) FROM tbl_training_unit", nativeQuery = true)
    List<String> getUnitCode();




    @Query("select distinct new com.example.fams.dto.trainingunit.TrainingContentDetailOfListDTO(tu.unitCode,tu.unitName)" +
            " from TrainingUnit tu" +
            " join TrainingContent tc on tc.unitCode = tu" +
            " where tu.syllabusId.topicCode =:topicCode and tu.dayNumber =:dayNumber")
    List<TrainingContentDetailOfListDTO> getAllTrainingUnitOfDay(@Param("topicCode") String topicCode, @Param("dayNumber") Integer dayNumber);
    @Query("select distinct new com.example.fams.dto.trainingprogram.TrainingUnitDetailOfListDTO(tu.syllabusId.topicCode, tu.dayNumber)" +
            " from Syllabus sy" +
            " join TrainingUnit tu on tu.syllabusId = sy" +
            " join TrainingContent tc on tc.unitCode = tu" +
            " where sy.topicCode =:topicCode")
    List<TrainingUnitDetailOfListDTO> getAllTrainingUnitDetail(@Param("topicCode")String topicCode);

    @Query("SELECT tu FROM TrainingUnit tu WHERE tu.syllabusId.topicCode like ?1")
    List<TrainingUnit> getTrainingUnitByTopicCode(String topic);

    @Query("SELECT tu.unitCode FROM TrainingUnit tu WHERE tu.syllabusId.topicCode like ?1")
    Optional<List<String>> getUnitCodeByTopicCode(String topic);

    @Modifying
    @Query("DELETE FROM TrainingUnit tu WHERE tu.syllabusId IN :syllabusIds")
    void deleteBySyllabusList(@Param("syllabusIds") List<Long> syllabusIds);

    @Query("SELECT SUM(tc.duration) FROM Syllabus sy" +
            " JOIN TrainingUnit tu ON tu.syllabusId = sy" +
            " JOIN TrainingContent tc ON tc.unitCode = tu" +
            " WHERE sy.syllabusId = :syllabusId")
    Optional<Long> getDurationBySyllabusId(@Param("syllabusId") Long syllabusId);
}
