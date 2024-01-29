package com.example.fams.service.itf;


import com.example.fams.dto.trainingprogram.SyllabusDetailOfListDTO;
import com.example.fams.dto.trainingprogram.TrainingProgramDTO;
import com.example.fams.dto.trainingprogram.TrainingProgramDetailDTO;
import com.example.fams.dto.trainingprogram.ClassDetailOfListDTO;
import com.example.fams.models.training.TrainingProgram;
import com.example.fams.models.training.TrainingProgramSyllabus;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface TrainingProgramService {
    List<TrainingProgramDTO> getAllTrainingProgram();

    TrainingProgramDTO createTrainingProgram(TrainingProgramDTO trainingProgramDTOCreateRequest);

    List<TrainingProgramDTO> getTrainingProgramByName(String name);

    List<TrainingProgram> insertTraining(String text);

    TrainingProgramDTO duplicateTrainingProgram(String trainingProgramCode);

    void changeTrainingProgramStatus(String code, String status);


    //TrainingProgram getTrainingProgram(String trainingProgramCode);

    List<TrainingProgramSyllabus> getTrainingProgramSyllasbus(String trainingProgramCode);

    //List<Syllabus> getSyllabus(List<TrainingProgramSyllabus> trainingProgramSyllabusList);
    List<SyllabusDetailOfListDTO> getSyllabusDTO(List<TrainingProgramSyllabus> trainingProgramSyllabusList);

    //List<ClassSubject> getClassSubject(String trainingProgramCode);

    TrainingProgramDetailDTO responseDetailTrainingProgramSyllabus(TrainingProgramDTO trainingProgramDTO, List<SyllabusDetailOfListDTO> syllabusListDTO, List<ClassDetailOfListDTO> classDetailOfListDTO);

    TrainingProgramDTO getTrainingProgram(String trainingProgramCode);

    List<ClassDetailOfListDTO> getClassSubject(String trainingProgramCode);

    //  TrainingProgramDTOResponse createTrainingProgram(TrainingProgramDTOCreateRequest trainingProgramDTOCreateRequest);

    List<String> importTrainingProgramFromFile(MultipartFile filePath, String encoding, String separator, boolean programNameCheckBox, String radio, String username);

    List<TrainingProgram> getTrainingProgramByNameInsert(String text);

    TrainingProgram getToCreateClass(String name);

    List<TrainingProgramDTO> getTrainingProgramByNameList(List<String> nameList);

    List<TrainingProgram> validateInputName(String name);

    boolean updateTrainingProgram(String code, String name, String generalInf, List<String> selectedTopicCodes, HttpServletRequest request);

    Optional<TrainingProgram> getById(String id);

    boolean createTrainingProgram(String code, String name,
                                  String generalInf, List<String> selectedTopicCodes,
                                  int duration, String user);

}
