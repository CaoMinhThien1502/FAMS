package com.example.fams.mapper.User;

import com.example.fams.dto.User.UserDTO;
import com.example.fams.models.user.User;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO userToUserDto(User user);
    User userDtoToUser(UserDTO userDTO);
    @Mappings({
            @Mapping(target = "userId", ignore = true),
            @Mapping(target = "email", ignore = true),
            @Mapping(target = "password", ignore = true),
    })
    void updateUserFromDTO(UserDTO userDTO, @MappingTarget User user);

    List<UserDTO> listUserToListUserDTO(List<User> user);
}
