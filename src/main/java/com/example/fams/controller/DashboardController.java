package com.example.fams.controller;

import com.example.fams.dto.dashboard.DashboardDTO;
import com.example.fams.repositories.clazz.ClassSubjectRepository;
import com.example.fams.repositories.syllabus.SyllabusRepository;
import com.example.fams.repositories.training.TrainingProgramRepository;
import com.example.fams.service.itf.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/dashboard")
public class DashboardController {
  @Autowired
  UserService userService;

  @Autowired
  SyllabusRepository syllabusRepository;

  @Autowired
  ClassSubjectRepository classSubjectRepository;

  @Autowired
  TrainingProgramRepository trainingProgramRepository;

  @GetMapping("/total")
  public DashboardDTO count(){
    DashboardDTO dashboardDTO= new DashboardDTO();
    dashboardDTO.setTrainerCount(userService.listUserTrainer().size());
    dashboardDTO.setClassCount(classSubjectRepository.findAll().size());
    dashboardDTO.setSyllabusCount(syllabusRepository.findAll().size());
    dashboardDTO.setTrainingProgramCount(trainingProgramRepository.findAll().size());
    return dashboardDTO;
  }

  @GetMapping("/chart")
  public DashboardDTO chartStatusClass(){
    DashboardDTO dashboardDTO= new DashboardDTO();
    dashboardDTO.setOpeningCount(classSubjectRepository.findClassSubjectsByStatus("Opening").size());
    dashboardDTO.setPlanningCount(classSubjectRepository.findClassSubjectsByStatus("Planning").size());
    dashboardDTO.setScheduledCount(classSubjectRepository.findClassSubjectsByStatus("Scheduled").size());
    dashboardDTO.setCompletedCount(classSubjectRepository.findClassSubjectsByStatus("Completed").size());
    return dashboardDTO;
  }
}
