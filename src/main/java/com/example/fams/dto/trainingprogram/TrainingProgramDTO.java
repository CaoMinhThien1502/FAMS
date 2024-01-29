package com.example.fams.dto.trainingprogram;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
@RequiredArgsConstructor
@AllArgsConstructor
@Data
@Component
public class TrainingProgramDTO {
    private String trainingProgramCode;
    private String name;
    private LocalDate starTime;
    private int duration;
    private String generalInf;
    private String status;
    private String createBy;
    private LocalDate createDate;
    private String modifiedBy;
    private LocalDate modifiedDate;
    private Long userId;
}
