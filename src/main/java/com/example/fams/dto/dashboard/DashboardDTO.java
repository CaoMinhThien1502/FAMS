package com.example.fams.dto.dashboard;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Component
public class DashboardDTO {
  private int trainerCount;
  private int classCount;
  private int syllabusCount;
  private int trainingProgramCount;

  private int scheduledCount;
  private int planningCount;
  private int openingCount;
  private int completedCount;

}
