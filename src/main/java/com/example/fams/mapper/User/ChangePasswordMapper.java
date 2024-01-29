package com.example.fams.mapper.User;

import com.example.fams.dto.User.ChangePasswordDTORequest;
import com.example.fams.models.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ChangePasswordMapper {


    @Mappings({
            @Mapping(target = "name", ignore = true),
            @Mapping(target = "password", source = "newPassword")
    })
    void updatePasswordFromDTO(ChangePasswordDTORequest changePasswordDTORequest, @MappingTarget User user);
}
