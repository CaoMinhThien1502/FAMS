package com.example.fams.dto.trainingprogram;

import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
public class UpdateTrainingProgramDTO {
    private String code;
    private String name;
    private String generalInf;
    private List<String> selectedTopicCodes;

    public UpdateTrainingProgramDTO(String code, String name, String generalInf, List<String> selectedTopicCodes) {
        this.code = code;
        this.name = name;
        this.generalInf = generalInf;
        this.selectedTopicCodes = selectedTopicCodes;
    }
}
