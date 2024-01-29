package com.example.fams.mapper;

import com.example.fams.dto.clazz.ClassUserDTO;
import com.example.fams.dto.clazz.ClassUserDTO2;
import com.example.fams.models.clazz.ClassUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClassUserMapper {

    @Mapping(target = "idCU",ignore = true)
    ClassUser classUserDtoToClassUser(ClassUserDTO classUserDTO);
    ClassUserDTO classUserToClassUserDto(ClassUser classUser);

    ClassUserDTO2 classUserToClassUserDto2(ClassUser classUser);

    List<ClassUserDTO2> classUserToClassUserDto2(List<ClassUser> classUser);
}
