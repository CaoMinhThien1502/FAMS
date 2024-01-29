package com.example.fams.dto.Syllabus.syllabusCreation;

import com.example.fams.dto.Syllabus.syllabusCreation.TrainingContentDTO;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@ToString
public class TrainingUnitDTO {
    private String unitCode;
    private String unitName;
    private Integer unitNumber;
    private Integer dayNumber;
    private List<TrainingContentDTO> trainingContentDTOList;

    @JsonCreator
    public TrainingUnitDTO(
            @JsonProperty("unitCode") String unitCode,
            @JsonProperty("unitName") String unitName,
            @JsonProperty("unitNumber") Integer unitNumber,
            @JsonProperty("dayNumber") Integer dayNumber,
            @JsonProperty("trainingContentDTOList") List<TrainingContentDTO> trainingContentDTOList) {
        this.unitCode = unitCode;
        this.unitName = unitName;
        this.unitNumber = unitNumber;
        this.dayNumber = dayNumber;
        this.trainingContentDTOList = trainingContentDTOList;
    }
}
