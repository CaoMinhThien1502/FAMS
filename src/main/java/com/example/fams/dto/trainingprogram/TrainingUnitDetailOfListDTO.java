package com.example.fams.dto.trainingprogram;

import com.example.fams.dto.trainingunit.TrainingContentDetailOfListDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingUnitDetailOfListDTO {
    private String topicCode;
    private Integer dayNumber;
    private List<TrainingContentDetailOfListDTO> trainingContentDetailOfListDTOList;

    public TrainingUnitDetailOfListDTO(List<TrainingContentDetailOfListDTO> trainingContentDetailOfListDTOList) {
        this.trainingContentDetailOfListDTOList = trainingContentDetailOfListDTOList;
    }

    public TrainingUnitDetailOfListDTO(String topicCode, Integer dayNumber) {
        this.topicCode = topicCode;
        this.dayNumber = dayNumber;
    }
}