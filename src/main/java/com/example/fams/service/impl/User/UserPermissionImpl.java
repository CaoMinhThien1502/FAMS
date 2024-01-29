package com.example.fams.service.impl.User;

import com.example.fams.dto.permission.PermissionDTO;
import com.example.fams.mapper.PermissionMapper;
import com.example.fams.models.user.UserPermission;
import com.example.fams.repositories.user.UserPermissionRepository;
import com.example.fams.service.itf.UserPermissionService;
import com.example.fams.utils.exceptions.PermissionNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserPermissionImpl implements UserPermissionService {
    private final UserPermissionRepository repository;
    private final PermissionMapper mapper;

    @Override
    @Transactional
    public List<PermissionDTO> getAll() {
        Sort sort = Sort.by(Sort.Direction.fromString("asc"), "permissionId");
        return mapper.permissionToPermissionDTO(repository.findAll(sort));
    }

    @Override
    @Transactional
    public void updateById(Long id, PermissionDTO dto) throws PermissionNotFoundException {
        Optional<UserPermission> permission = repository.findById(id);

        if (permission.isEmpty()) throw new PermissionNotFoundException();

        mapper.permissionDTOToPermission(dto, permission.get());
        repository.save(permission.get());
    }

    @Override
    @Transactional
    public List<PermissionDTO> updateMany(List<PermissionDTO> listDto) {
        List<UserPermission> permissions = mapper.permissionDTOToPermission(listDto);
        repository.saveAll(permissions);
        return mapper.permissionToPermissionDTO(permissions);
    }
@Override
public List<PermissionDTO> patchUpdateUserPermission(List<PermissionDTO> userPermissionDTOList) {
    for (PermissionDTO userPermissionDTO : userPermissionDTOList) {
        if (userPermissionDTO.getRole() == null) {
            // Nếu role không được chỉ định, bỏ qua và không thực hiện cập nhật
            continue;
        }

        UserPermission userPermission = repository.findByRole(userPermissionDTO.getRole());

        if (userPermission != null) {
            // Kiểm tra và cập nhật các quyền không null
            if (userPermissionDTO.getSyllabus() != null) {
                userPermission.setSyllabus(userPermissionDTO.getSyllabus());
            }
            if (userPermissionDTO.getTrainingProgram() != null) {
                userPermission.setTrainingProgram(userPermissionDTO.getTrainingProgram());
            }
            if (userPermissionDTO.getClazz() != null) {
                userPermission.setClazz(userPermissionDTO.getClazz());
            }
            if (userPermissionDTO.getLearningMaterial() != null) {
                userPermission.setLearningMaterial(userPermissionDTO.getLearningMaterial());
            }

            repository.save(userPermission);
        }
    }
    return userPermissionDTOList;
}

}
