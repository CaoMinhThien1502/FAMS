package com.example.fams.service.itf;

import com.example.fams.dto.User.UserDTO;
import com.example.fams.dto.User.ChangePasswordDTORequest;
import com.example.fams.models.user.User;
import com.example.fams.utils.exceptions.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService {


    List<UserDTO> getAllUsers();

    boolean createUser(UserDTO userDTO, HttpServletRequest request);

    boolean updateUser(Long userId, UserDTO user);

    void changeStatusUser(Long userId);


    List<String> listUserTrainer();

    List<String> listUserAdmin();
    List<User> getListUserAdmin();

    List<User> getListUserTrainer();

    List<String> listUserStudent();

    ResponseEntity<?> changePassword(Long userId, ChangePasswordDTORequest changePasswordDTORequest,
                                     BindingResult bindingResult);

    List<User> getUsersByNamesOrEmail(List<String> names);
    User findByEmail(String username);

    List<String> importUserFromFile(MultipartFile file, String encoding, String separator, boolean emailCheckbox, String radio, HttpServletRequest request);

    User getUserById(Long userId);

    void changeRoleUser(Long userId);

    void updateCurrentUser(UserDTO user) throws UserNotFoundException;

    void changePasswordByUsername(ChangePasswordDTORequest dto) throws Exception;

    UserDTO getCurrentUserDto() throws UserNotFoundException;

    User getUserByPhone(String userPhone);
}
