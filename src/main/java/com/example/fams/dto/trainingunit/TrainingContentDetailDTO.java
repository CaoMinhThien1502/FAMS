package com.example.fams.dto.trainingunit;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainingContentDetailDTO {
    private String content;
    private String outputStandard;
    private Integer duration;
    private String trainingFormat;
}
