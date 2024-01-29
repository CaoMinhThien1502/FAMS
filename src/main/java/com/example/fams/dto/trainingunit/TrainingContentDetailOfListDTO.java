package com.example.fams.dto.trainingunit;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingContentDetailOfListDTO {
    private String unitCode;
    private String unitName;
    private List<TrainingContentDetailDTO> trainingContentDetailOfListDTOS;

    public TrainingContentDetailOfListDTO(String unitCode, String unitName) {
        this.unitCode = unitCode;
        this.unitName = unitName;
    }
    public TrainingContentDetailOfListDTO(List<TrainingContentDetailDTO> trainingContentDetailOfListDTOS) {
        this.trainingContentDetailOfListDTOS = trainingContentDetailOfListDTOS;
    }

}
