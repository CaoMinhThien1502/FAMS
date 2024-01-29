package com.example.fams.dto.trainingprogram;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingProgramDetailDTO {
    private TrainingProgramDTO trainingProgramDTO;
    private List<SyllabusDetailOfListDTO> syllabusListDTO;
    private List<ClassDetailOfListDTO> classListDTO;
}
