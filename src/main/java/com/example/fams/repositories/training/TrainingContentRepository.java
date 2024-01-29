package com.example.fams.repositories.training;

import com.example.fams.dto.trainingunit.TrainingContentDetailDTO;
import com.example.fams.models.training.TrainingContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainingContentRepository extends JpaRepository<TrainingContent, Long> {

    @Query(value = "SELECT * FROM tbl_training_content WHERE unit_code = ?", nativeQuery = true)
    Optional<List<TrainingContent>> findAllByUnitCode(String unitCode);

    TrainingContent findTrainingContentByContent(String content);

    @Query("select new com.example.fams.dto.trainingunit.TrainingContentDetailDTO(tc.content, tc.learningObjective.code, tc.duration, tc.trainingFormat)" +
           " from TrainingUnit tu" +
           " join TrainingContent tc on tc.unitCode = tu" +
           " join LearningObjective lo on tc.learningObjective = lo" +
           " where tu.unitCode =:unitCode and tu.unitName =:unitName")
    List<TrainingContentDetailDTO> getAllTrainingContentOfUnitCode(@Param("unitCode") String unitCode, @Param("unitName") String unitName);
    @Query("SELECT tc FROM TrainingContent tc WHERE tc.unitCode.unitCode like ?1 ")
    TrainingContent getTrainingContentByUnitCode(String code);

    @Query("SELECT MAX(tc.id) FROM TrainingContent tc")
    Long getMaxContentId();
}
