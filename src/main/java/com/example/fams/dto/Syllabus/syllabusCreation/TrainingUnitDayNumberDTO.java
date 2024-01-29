package com.example.fams.dto.Syllabus.syllabusCreation;

import com.example.fams.models.training.TrainingUnit;
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
public class TrainingUnitDayNumberDTO {
    Integer dayNumber;
    List<TrainingUnitDTO> trainingUnitDTOList;

    @JsonCreator
    public TrainingUnitDayNumberDTO(
            @JsonProperty("dayNumber") Integer dayNumber,
            @JsonProperty("trainingUnitDTOList") List<TrainingUnitDTO> trainingUnitDTOList) {
        this.dayNumber = dayNumber;
        this.trainingUnitDTOList = trainingUnitDTOList;
    }

}
