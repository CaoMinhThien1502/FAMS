package com.example.fams.dto.Syllabus.syllabusCreation;

import com.example.fams.models.syllabus.LearningObjective;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class TrainingContentDTO {
    private Long id;
    private String content;
    private LearningObjective learningObjective;
    private Integer duration;
    private String trainingFormat;
    private String deliveryType;

    @JsonCreator
    public TrainingContentDTO(
            @JsonProperty("id") Long id,
            @JsonProperty("content") String content,
            @JsonProperty("learningObjective") LearningObjective learningObjective,
            @JsonProperty("duration") Integer duration,
            @JsonProperty("trainingFormat") String trainingFormat,
            @JsonProperty("deliveryType") String deliveryType) {
        this.id = id;
        this.content = content;
        this.learningObjective = learningObjective;
        this.duration = duration;
        this.trainingFormat = trainingFormat;
        this.deliveryType = deliveryType;
    }

}
