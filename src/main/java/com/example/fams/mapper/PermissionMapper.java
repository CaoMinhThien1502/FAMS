package com.example.fams.mapper;

import com.example.fams.dto.permission.PermissionDTO;
import com.example.fams.models.user.UserPermission;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    PermissionDTO permissionToPermissionDTO(UserPermission userPermission);

    List<PermissionDTO> permissionToPermissionDTO(List<UserPermission> userPermissionList);

    UserPermission permissionDTOToPermission(PermissionDTO permissionDTO);

    List<UserPermission> permissionDTOToPermission(List<PermissionDTO> permissionDTOList);

    @Mapping(target = "permissionId", ignore = true)
    void permissionDTOToPermission(PermissionDTO permissionDTO, @MappingTarget UserPermission userPermission);
}
