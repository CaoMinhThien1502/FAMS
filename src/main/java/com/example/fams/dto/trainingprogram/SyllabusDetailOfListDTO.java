package com.example.fams.dto.trainingprogram;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SyllabusDetailOfListDTO {
    private SyllabusDetailDTO syllabusDetailDTO;
    private List<TrainingUnitDetailOfListDTO> trainingUnitDetailOfListDTOList;
}
