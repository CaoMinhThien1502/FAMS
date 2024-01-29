package com.example.fams.service.itf;

import com.example.fams.dto.clazz.ClassSubjectDTO;
import com.example.fams.dto.clazz.ClassUserDTO2;
import com.example.fams.models.clazz.ClassUser;
import com.example.fams.utils.exceptions.ClassNotFoundException;
import com.example.fams.utils.exceptions.UserNotFoundException;

import java.util.List;

public interface ClassUserService {
    void createClassUser(ClassSubjectDTO classSubjectDTO, String trainer, String admin);

    List<ClassUserDTO2> getCLassTrainersByClassId(Long id);

    List<ClassUserDTO2> getCLassAdminsByClassId(Long id);

    List<ClassUser> findClassUsersByClass(String code);

    void deleteClassUser(List<ClassUser> list);

    void deleteById(Long id);

    ClassUser addNewClassUser(Long classId, Long userId, String userType) throws ClassNotFoundException, UserNotFoundException;
}
