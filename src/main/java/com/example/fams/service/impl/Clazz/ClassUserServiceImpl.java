package com.example.fams.service.impl.Clazz;

import com.example.fams.dto.clazz.ClassSubjectDTO;
import com.example.fams.dto.clazz.ClassUserDTO;
import com.example.fams.dto.clazz.ClassUserDTO2;
import com.example.fams.mapper.ClassSubjectMapper;
import com.example.fams.mapper.ClassUserMapper;
import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.models.clazz.ClassUser;
import com.example.fams.models.user.User;
import com.example.fams.repositories.clazz.ClassSubjectRepository;
import com.example.fams.repositories.clazz.ClassUserRepository;
import com.example.fams.repositories.user.UserRepository;
import com.example.fams.service.itf.ClassUserService;
import com.example.fams.utils.exceptions.ClassNotFoundException;
import com.example.fams.utils.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ClassUserServiceImpl implements ClassUserService {
    @Autowired
    private ClassUserRepository repository;
    @Autowired
    private ClassUserMapper mapper;
    @Autowired
    private ClassSubjectMapper csmapper;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClassSubjectRepository classSubjectRepository;

    @Override
    public void createClassUser(ClassSubjectDTO classSubjectDTO, String trainer, String admin) {
        ClassUserDTO classUserDTO = new ClassUserDTO();
        ClassSubject classSubject = classSubjectRepository.findClassSubjectsByClassCode(csmapper.createClassDtoToClassSubject(classSubjectDTO).getClassCode());
        classUserDTO.setClazz(classSubject);
        if (trainer != null) {
            classUserDTO.setUserType("TRAINER");
            String[] lists = trainer.split(",");
            for (String x : lists) {
                List<User> list = userRepository.searchUserByName(x);
                for (User y : list) {
                    classUserDTO.setUser(y);
                    repository.save(mapper.classUserDtoToClassUser(classUserDTO));
                }
            }

        }
        if (admin != null) {
            classUserDTO.setUserType("ADMIN");
            String[] lists = admin.split(",");
            for (String x : lists) {
                List<User> list = userRepository.searchUserByName(x);
                for (User y : list) {
                    classUserDTO.setUser(y);
                    repository.save(mapper.classUserDtoToClassUser(classUserDTO));
                }
            }

        }
    }

    @Override
    public List<ClassUserDTO2> getCLassTrainersByClassId(Long id) {
        return mapper.classUserToClassUserDto2(repository.findClassUsersByClazz_ClassIdAndUserType(id, "TRAINER"));
    }

    @Override
    public List<ClassUserDTO2> getCLassAdminsByClassId(Long id) {
        return mapper.classUserToClassUserDto2(repository.findClassUsersByClazz_ClassIdAndUserType(id, "ADMIN"));
    }

    @Override
    public List<ClassUser> findClassUsersByClass(String code) {
        return repository.findClassUsersByClass(code);
    }

    @Override
    public void deleteClassUser(List<ClassUser> list) {
        for (ClassUser x : list) {
            repository.delete(x);
        }
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public ClassUser addNewClassUser(Long classId, Long userId, String userType) throws ClassNotFoundException, UserNotFoundException {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        ClassSubject classSubject = classSubjectRepository.findById(classId).orElseThrow(ClassNotFoundException::new);

        Optional<ClassUser> classUserFound = repository.findClassUserByClazz_ClassIdAndUser_UserId(classSubject.getClassId(), user.getUserId());
        if (classUserFound.isPresent()) {
            return classUserFound.get();
        }

        ClassUser classUser = new ClassUser();
        classUser.setClazz(classSubject);
        classUser.setUser(user);
        classUser.setUserType(userType);
        return repository.save(classUser);
    }
}
