package com.example.fams.service.itf;

import com.example.fams.dto.clazz.ClassDTO;
import com.example.fams.dto.clazz.ClassSubjectDTO;
import com.example.fams.dto.clazz.ClassSubjectSearchDTO;
import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.utils.exceptions.AlreadyExistException;
import com.example.fams.utils.exceptions.ClassNotFoundException;
import com.example.fams.utils.exceptions.TrainingProgramNotFoundException;

import java.time.LocalDate;
import java.util.List;

public interface ClassSubjectService {

    List<ClassSubjectSearchDTO> getAllClass();

    void CreateClass(ClassSubjectDTO classDTO);

    List<ClassSubjectSearchDTO> searchClassSubject(String keyword);

    List<ClassSubject> checkDuplicate(String className);

    ClassSubject checkDuplicate(List<ClassSubject> list, ClassSubject x);

    List<ClassSubjectSearchDTO> findClassSubjectsByCreateBy(String name);

    String findMaxClassId();

    List<String> locationCLass();

    List<String> listFSU();

    List<ClassSubjectSearchDTO> filter(String location, String status, String fsu, String trainer, String classTime,
                                       LocalDate startDate, LocalDate endDate);

    ClassDTO getById(Long id) throws ClassNotFoundException;

    ClassDTO getByClassCode(String code) throws ClassNotFoundException;

    ClassSubject updateClass(String code, ClassDTO classDTO) throws ClassNotFoundException, AlreadyExistException, TrainingProgramNotFoundException;

    void deleteClass(String code);

    List<ClassSubject> getClassByStatus();
}
