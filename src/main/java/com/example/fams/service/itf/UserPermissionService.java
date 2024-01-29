package com.example.fams.service.itf;

import com.example.fams.dto.permission.PermissionDTO;
import com.example.fams.utils.exceptions.PermissionNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserPermissionService {
    List<PermissionDTO> getAll();

    void updateById(Long id, PermissionDTO permission) throws PermissionNotFoundException;

    List<PermissionDTO> updateMany(List<PermissionDTO> listDto);
    List<PermissionDTO> patchUpdateUserPermission(List<PermissionDTO> userPermissionDTOList);

}
