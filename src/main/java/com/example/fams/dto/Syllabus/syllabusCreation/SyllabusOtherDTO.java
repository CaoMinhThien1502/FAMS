package com.example.fams.dto.Syllabus.syllabusCreation;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class SyllabusOtherDTO {
    private String trainingPrinciplesTraining;
    private String trainingPrinciplesRetest;
    private String trainingPrinciplesMarking;
    private String trainingPrinciplesCriteria;
    private String trainingPrinciplesOthers;
    private List<Integer> AssessmentSchemeList;

    @JsonCreator
    public SyllabusOtherDTO(
            @JsonProperty("trainingPrinciplesTraining") String trainingPrinciplesTraining,
            @JsonProperty("trainingPrinciplesRetest") String trainingPrinciplesRetest,
            @JsonProperty("trainingPrinciplesMarking") String trainingPrinciplesMarking,
            @JsonProperty("trainingPrinciplesCriteria") String trainingPrinciplesCriteria,
            @JsonProperty("trainingPrinciplesOthers") String trainingPrinciplesOthers,
            @JsonProperty("AssessmentSchemeList") List<Integer> AssessmentSchemeList) {
        this.trainingPrinciplesTraining = trainingPrinciplesTraining;
        this.trainingPrinciplesRetest = trainingPrinciplesRetest;
        this.trainingPrinciplesMarking = trainingPrinciplesMarking;
        this.trainingPrinciplesCriteria = trainingPrinciplesCriteria;
        this.trainingPrinciplesOthers = trainingPrinciplesOthers;
        this.AssessmentSchemeList = AssessmentSchemeList;
    }
}
