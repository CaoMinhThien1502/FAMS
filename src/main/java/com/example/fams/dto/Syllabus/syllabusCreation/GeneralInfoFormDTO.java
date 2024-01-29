package com.example.fams.dto.Syllabus.syllabusCreation;

import com.example.fams.models.syllabus.LearningObjective;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
public class GeneralInfoFormDTO {

    //syllabus data
    private Long syllabusId;
    private String topicCode;
    private String topicName;
    private String version;
    private String priority;
    private Integer trainingAudience;
    private String technicalGroup;
    private String status;
    //learning objective data
    Set<LearningObjective> learningObjectivesList;

    @JsonCreator
    public GeneralInfoFormDTO(
            @JsonProperty("syllabusId") Long syllabusId,
            @JsonProperty("topicCode") String topicCode,
            @JsonProperty("topicName") String topicName,
            @JsonProperty("version") String version,
            @JsonProperty("priority") String priority,
            @JsonProperty("trainingAudience") Integer trainingAudience,
            @JsonProperty("technicalGroup") String technicalGroup,
            @JsonProperty("status") String status,
            @JsonProperty("learningObjectivesList") Set<LearningObjective> learningObjectivesList) {
        this.syllabusId = syllabusId;
        this.topicCode = topicCode;
        this.topicName = topicName;
        this.version = version;
        this.priority = priority;
        this.trainingAudience = trainingAudience;
        this.technicalGroup = technicalGroup;
        this.status = status;
        this.learningObjectivesList = learningObjectivesList;
    }


}
