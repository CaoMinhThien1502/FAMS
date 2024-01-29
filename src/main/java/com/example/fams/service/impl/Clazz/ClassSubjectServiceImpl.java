package com.example.fams.service.impl.Clazz;

import com.example.fams.dto.clazz.ClassDTO;
import com.example.fams.dto.clazz.ClassSubjectDTO;
import com.example.fams.dto.clazz.ClassSubjectSearchDTO;
import com.example.fams.mapper.ClassSubjectMapper;
import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.models.training.TrainingProgram;
import com.example.fams.repositories.clazz.ClassSubjectRepository;
import com.example.fams.repositories.clazz.ClassUserRepository;
import com.example.fams.service.itf.ClassSubjectService;
import com.example.fams.service.itf.TrainingProgramService;
import com.example.fams.utils.exceptions.AlreadyExistException;
import com.example.fams.utils.exceptions.ClassNotFoundException;
import com.example.fams.utils.exceptions.TrainingProgramNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClassSubjectServiceImpl implements ClassSubjectService {

    @Autowired
    private ClassSubjectRepository repository;
    @Autowired
    private ClassSubjectMapper mapper;
    @Autowired
    private ClassUserRepository CUrepository;
    @Autowired
    private TrainingProgramService trainingProgramService;

    @Override
    public List<ClassSubjectSearchDTO> getAllClass() {
        List<ClassSubject> list = repository.findAll();
        return list.stream()
                .map(mapper::classSubjectToSearchDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void CreateClass(ClassSubjectDTO classSubject) {
        repository.save(mapper.createClassDtoToClassSubject(classSubject));
    }

    @Override
    public List<ClassSubjectSearchDTO> searchClassSubject(String keyword) {
        List<ClassSubject> classSubjectList = repository.searchByCodeOrName(keyword);
        return classSubjectList.stream()
                .map(mapper::classSubjectToSearchDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ClassSubject> checkDuplicate(String className) {
        return repository.findClassSubjectsByClassName(className);
    }

    @Override
    public ClassSubject checkDuplicate(List<ClassSubject> list, ClassSubject x) {
        for (ClassSubject c : list) {
            if (x.equals(c)) {
                return x;
            }
        }
        return null;
    }

    @Override
    public List<ClassSubjectSearchDTO> findClassSubjectsByCreateBy(String name) {
        List<ClassSubject> classSubjectList = repository.findClassSubjectsByCreateBy(name);
        return classSubjectList.stream()
                .map(mapper::classSubjectToSearchDTO)
                .collect(Collectors.toList());
    }

    @Override
    public String findMaxClassId() {
        return repository.findMaxClassId();
    }

    @Override
    public List<String> locationCLass() {
        return repository.locationCLass();
    }

    @Override
    public List<String> listFSU() {
        return repository.listFSU();
    }

    @Override
    public List<ClassSubjectSearchDTO> filter(String location, String status, String fsu, String trainer, String classTime, LocalDate startDate, LocalDate endDate) {
        List<ClassSubject> list = new ArrayList<>();

        if (location != null) {
            String[] l = location.split(",");
            for (String y : l) {
                List<ClassSubject> list1 = repository.findClassSubjectsByLocation(y);
                for (ClassSubject x : list1) {
                    list.add(x);
                }
            }

        }
        if (status != null) {
            String[] l = status.split(",");
            for (String y : l) {
                List<ClassSubject> list1 = repository.findClassSubjectsByStatus(y);
                for (ClassSubject x : list1) {
                    if (checkDuplicate(list, x) == null) {
                        list.add(x);
                    }
                }
            }
        }
        if (fsu != null) {
            String[] l = fsu.split(",");
            for (String y : l) {
                List<ClassSubject> list1 = repository.findClassSubjectsByFsu(y);
                for (ClassSubject x : list1) {
                    if (checkDuplicate(list, x) == null) {
                        list.add(x);
                    }
                }
            }

        }
        if (trainer != null) {
            String[] l = trainer.split(",");
            for (String y : l) {
                List<ClassSubject> list1 = CUrepository.findClassUsersByUserType(trainer);
                for (ClassSubject x : list1) {
                    if (checkDuplicate(list, x) == null) {
                        list.add(x);
                    }
                }
            }
        }
        if (classTime != null) {
            String[] l = classTime.split(",");
            for (String y : l) {
                List<ClassSubject> list1 = repository.findClassSubjectsByClassTime(y);
                for (ClassSubject x : list1) {
                    if (checkDuplicate(list, x) == null) {
                        list.add(x);
                    }
                }
            }
        }
        if (startDate != null && endDate == null) {
            List<ClassSubject> list1 = repository.findClassSubjectsByStartDate(startDate);
            for (ClassSubject x : list1) {
                if (checkDuplicate(list, x) == null) {
                    list.add(x);
                }
            }
        } else if (startDate == null && endDate != null) {
            List<ClassSubject> list1 = repository.findClassSubjectsByEndDate(endDate);
            for (ClassSubject x : list1) {
                if (checkDuplicate(list, x) == null) {
                    list.add(x);
                }
            }
        } else if (startDate != null && endDate != null) {
            List<ClassSubject> list1 = repository.findClassSubjectsByClassTimeFrame(startDate, endDate);
            for (ClassSubject x : list1) {
                if (checkDuplicate(list, x) == null) {
                    list.add(x);
                }
            }
        }
        return list.stream()
                .map(mapper::classSubjectToSearchDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ClassDTO getById(Long id) throws ClassNotFoundException {
        ClassSubject classSubject = repository.findById(id).orElseThrow(ClassNotFoundException::new);
        return mapper.classSubjectToClassDTO(classSubject);
    }

    @Override
    @Transactional
    public ClassDTO getByClassCode(String code) throws ClassNotFoundException {
        ClassSubject classSubject = repository.findClassSubjectByClassCode(code).orElseThrow(ClassNotFoundException::new);
        return mapper.classSubjectToClassDTO(classSubject);
    }

    @Override
    @Transactional
    public ClassSubject updateClass(String code, ClassDTO classDTO) throws ClassNotFoundException, AlreadyExistException, TrainingProgramNotFoundException {
        ClassSubject classSubject = repository.findClassSubjectByClassCode(code).orElseThrow(ClassNotFoundException::new);

        if (!classDTO.getClassCode().trim().equals(code)) {
            Optional<ClassSubject> existedClass = repository.findClassSubjectByClassCode(classDTO.getClassCode().trim());

            if (existedClass.isPresent()) {
                throw new AlreadyExistException("Class code already exists");
            }
        }

        if (!classSubject.getTrainingProgram().getTrainingProgramCode().equals(classDTO.getTrainingProgramId())) {
            TrainingProgram trainingProgram = trainingProgramService.getById(classDTO.getTrainingProgramId()).orElseThrow(TrainingProgramNotFoundException::new);
            classSubject.setTrainingProgram(trainingProgram);
        }

        classSubject.setTimeFrom(classDTO.getTimeFrom());
        classSubject.setTimeTo(classDTO.getTimeTo());
        classSubject.setStartDate(classDTO.getStartDate());
        classSubject.setEndDate(classDTO.getEndDate());
        classSubject.setFsu(classDTO.getFsu().trim());
        classSubject.getAttendee().setPlanned(classDTO.getAttendee().getPlanned());
        classSubject.getAttendee().setActual(classDTO.getAttendee().getActual());
        classSubject.getAttendee().setActual(classDTO.getAttendee().getActual());
        classSubject.setModifiedDate(LocalDate.now());
        classSubject.setClassCode(classDTO.getClassCode().trim());
        classSubject.setClassName(classDTO.getClassName().trim());
        classSubject.setDateLearning(classDTO.getDateLearning());
        classSubject.setStatus(classDTO.getStatus());
        return repository.save(classSubject);
    }

    @Override
    public void deleteClass(String code) {
        ClassSubject classSubject = repository.findClassSubjectsByClassCode(code);
        repository.delete(classSubject);
    }

    @Override
    public List<ClassSubject> getClassByStatus() {
        return repository.findClassSubjectsByStatus("Opening");
    }
}
