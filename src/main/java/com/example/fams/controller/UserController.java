package com.example.fams.controller;

import com.example.fams.dto.User.ChangePasswordDTORequest;
import com.example.fams.dto.User.UserDTO;
import com.example.fams.models.user.User;
import com.example.fams.repositories.clazz.ClassSubjectRepository;
import com.example.fams.repositories.syllabus.SyllabusRepository;
import com.example.fams.repositories.training.TrainingProgramRepository;
import com.example.fams.security.token.JwtTokenProvider;
import com.example.fams.service.itf.UserService;
import com.example.fams.utils.ValidatorUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("api/user")
public class UserController {

  @Autowired
  UserService userService;

  @Autowired
  SyllabusRepository syllabusRepository;

  @Autowired
  ClassSubjectRepository classSubjectRepository;

  @Autowired
  TrainingProgramRepository trainingProgramRepository;

  @Autowired
  private ValidatorUtil validatorUtil;

  @Autowired
  JwtTokenProvider tokenProvider;

  @GetMapping
  public List<UserDTO> getAllUsers(Model model) {
    List<UserDTO> userList = userService.getAllUsers();

    model.addAttribute("userList", userList);
    return userService.getAllUsers();
  }

  @GetMapping("/{userId}")
  public User getUser(@PathVariable Long userId) {
    return userService.getUserById(userId);
  }


  @GetMapping("/phone/{userPhone}")
  public User getUserByPhone(@PathVariable String userPhone) {
    return userService.getUserByPhone(userPhone);
  }

  @GetMapping("/create")
  public String showRegistrationForm(Model model) {
    model.addAttribute("user", new User());
    return "create-user";
  }

  @PostMapping("/create")
  public ResponseEntity<?> processRegistration(@RequestBody @Valid UserDTO userDTO,
      BindingResult bindingResult, HttpServletRequest request) {
    // Kiểm tra lỗi validation

    if (bindingResult.hasErrors()) {
      return ResponseEntity.badRequest()
          .body(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
    }

    // Xử lý đăng ký người dùng nếu dữ liệu hợp lệ
    boolean createResult = userService.createUser(userDTO, request);

    // Trả về danh sách người dùng sau khi đã tạo
    return new ResponseEntity<>(createResult, HttpStatus.OK);
  }

  @PutMapping("/update/{userId}")
  public ResponseEntity<?> updateUser(@PathVariable Long userId,
      @RequestBody @Valid UserDTO userDTO, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return ResponseEntity.badRequest()
          .body(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
    }

    boolean checkUpdate = userService.updateUser(userId, userDTO);
    //return ResponseEntity.ok("Người dùng đã được cập nhật thành công!");
    return new ResponseEntity<>(checkUpdate, HttpStatus.OK);
  }

  @PutMapping("/changeRole/{userId}")
  public ResponseEntity<?> changeRoleUser(@PathVariable Long userId) {
    userService.changeRoleUser(userId);
    return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
  }

  @PutMapping("/changepassword/{userId}")
  public ResponseEntity<?> changePasswordUser(@PathVariable Long userId,
      @RequestBody @Valid ChangePasswordDTORequest changePasswordDTORequest,
      BindingResult bindingResult) {

    if (bindingResult.hasErrors()) {
      return ResponseEntity.badRequest()
          .body(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
    }
    ResponseEntity<?> a = userService.changePassword(userId, changePasswordDTORequest,
        bindingResult);
    //return userService.changePassword(userId, changePasswordDTORequest, bindingResult);
    //return ResponseEntity.ok("Người dùng đã được cập nhật thành công!");
    return a;
  }


  //Không có chức năng xóa user(theo trong figma thì có option này nhưng đang bị disable)
  @PostMapping("/changeStatus/{userId}") // Xử lý xóa --> InActive(status = false)
  public ResponseEntity<?> changeStatusUser(@PathVariable Long userId) {
    userService.changeStatusUser(userId);
    return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
  }

  @GetMapping("/bynames")
  public List<User> getUsersByNames(@RequestParam List<String> names, Model model) {
    List<User> userList = userService.getUsersByNamesOrEmail(names);
    model.addAttribute("userListByName", userList);
    return userList;
  }

    @PostMapping("/import")
    public ResponseEntity<String> importUser(@RequestParam("file") MultipartFile file,
                                             @RequestParam("encoding") String encoding,
                                             @RequestParam("separator") String separator,
                                             @RequestParam("emailCheckbox") boolean emailCheckbox,
                                             @RequestParam("radio") String radio,
                                             HttpServletRequest request) {
        List<String> message = userService.importUserFromFile(file, encoding, separator, emailCheckbox, radio, request);

        if (message.get(0).startsWith("Success!")) {
            return ResponseEntity.ok(message.get(0));
        } else {
            // Nếu có lỗi, trả về danh sách lỗi
            String errorResponse = String.join(System.lineSeparator(), message);
            return ResponseEntity.badRequest().body("Đã có lỗi xảy ra: \n" + errorResponse);
        }
    }
    @GetMapping("/username")
    public ResponseEntity<?> getUsername(HttpServletRequest request) {
        return ResponseEntity.ok(tokenProvider.getUserNameFromJWT(request));
    }
  @PostMapping("/checkemail/{email}")
  public ResponseEntity<Boolean> checkEmailDuplicate(@PathVariable String email) {
    try {
      User us = userService.findByEmail(email);

      if (us == null) {
        return ResponseEntity.ok(false);
      } else {
        return ResponseEntity.ok(true);
      }
    } catch (Exception e) {
      // Xử lý trường hợp ngoại lệ, ví dụ: log lỗi
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}



