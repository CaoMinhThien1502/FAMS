package com.example.fams.service.impl.User;

import com.example.fams.dto.User.ChangePasswordDTORequest;
import com.example.fams.dto.User.UserDTO;
import com.example.fams.mapper.User.ChangePasswordMapper;
import com.example.fams.mapper.User.UserMapper;
import com.example.fams.models.user.User;
import com.example.fams.models.user.UserPermission;
import com.example.fams.repositories.user.UserPermissionRepository;
import com.example.fams.repositories.user.UserRepository;
import com.example.fams.security.token.JwtTokenProvider;
import com.example.fams.service.itf.UserService;
import com.example.fams.utils.GenerateRandomPasswordUtils;
import com.example.fams.utils.RequestAuth;
import com.example.fams.utils.SendMailUtils;
import com.example.fams.utils.User.UserUtils;
import com.example.fams.utils.ValidatorUtil;
import com.example.fams.utils.exceptions.UserNotFoundException;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMapper userMapper;
    @Autowired
    ChangePasswordMapper changePasswordMapper;
    @Autowired
    SendMailUtils sendMailUtils;
    @Autowired
    UserPermissionRepository userPermissionRepository;
    @Autowired
    JwtTokenProvider tokenProvider;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private UserUtils userUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> userList = userRepository.findAll();
        return userMapper.listUserToListUserDTO(userList);
    }

    @Override
    public boolean createUser(UserDTO userDTO, HttpServletRequest request) {
        User userCheckEmail = userRepository.findUserByEmail(userDTO.getEmail());
        if (userCheckEmail != null) {
            return false;
        }
        userDTO.setRole(userPermissionRepository.getUserPermissionById(userDTO.getRoleId()));
        if (userDTO.getStatus() == null || userDTO.getStatus().describeConstable().isEmpty()) {
            userDTO.setStatus(false);
        }
        User user = userMapper.userDtoToUser(userDTO);
        GenerateRandomPasswordUtils generateRandomPasswordUtils = new GenerateRandomPasswordUtils();
        String randomPassword = generateRandomPasswordUtils.generatePassword(user.getEmail(), user.getName());
        user.setPassword(passwordEncoder.encode(randomPassword));
        user.setCreateBy(tokenProvider.getUserNameFromJWT(request));
        user.setCreateDate(LocalDate.now());
        sendMailUtils.sendSimpleEmail(
                user.getEmail(),
                "FAMS - User Account was created",
                "Chúc mừng! Tài khoản của bạn đã được tạo thành công trong ứng dụng For Fresher Academy Management System (FAMS).\n"
                        +
                        "\n" +
                        "Dưới đây là thông tin tài khoản của bạn:\n" +
                        "\n" +
                        "Tên dự án: For Fresher Academy Management System\n" +
                        "\n" +
                        "Tên người dùng: " + user.getName() + "\n" +
                        "\n" +
                        "Email: " + user.getEmail() + "\n" +
                        "\n" +
                        "Mật khẩu: " + randomPassword + "\n" +
                        "\n" +
                        "Vai Trò: \n" +
                        "\n" +
                        "Vui lòng lưu trữ thông tin này một cách an toàn. Để bảo đảm tính bảo mật, bạn nên thay đổi mật khẩu của mình sau khi đăng nhập lần đầu tiên. Dưới đây là cách để thay đổi mật khẩu:\n"
                        +
                        "\n" +
                        "1. Đăng nhập vào tài khoản của bạn tại [URL đăng nhập của dự án].\n" +
                        "\n" +
                        "2. Truy cập phần \"Thay đổi mật khẩu\" trong tài khoản của bạn.\n" +
                        "\n" +
                        "3. Nhập mật khẩu hiện tại và sau đó nhập mật khẩu mới của bạn.\n" +
                        "\n" +
                        "4. Lưu thay đổi.\n" +
                        "\n" +
                        "Nếu bạn gặp bất kỳ khó khăn nào trong việc thay đổi mật khẩu hoặc có bất kỳ câu hỏi nào về tài khoản của bạn, xin vui lòng liên hệ với chúng tôi qua [email liên hệ của dự án] hoặc số điện thoại [số điện thoại liên hệ của dự án].\n"
                        +
                        "\n" +
                        "Chúng tôi rất vui được chào đón bạn vào FAMS và hy vọng bạn sẽ có trải nghiệm tốt khi sử dụng dịch vụ của chúng tôi.\n"
                        +
                        "\n" +
                        "Trân trọng,\n" +
                        "[Tên bạn hoặc tên của dự án]\n"
        );
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean updateUser(Long userId, UserDTO userDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(
                        () -> new IllegalStateException("student with id " + userId + " does not exists"));
        //super_admin ko change role
        if (user.getRole().getRole().toLowerCase().equals("super_admin")) {
            userDTO.setRole(userPermissionRepository.getUserPermissionById(1L));
        } else {
            userDTO.setRole(userPermissionRepository.getUserPermissionById(userDTO.getRoleId()));
        }
        userMapper.updateUserFromDTO(userDTO, user);
        userRepository.save(user);
        return true;
    }

    @Override
    public void changeStatusUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(
                        () -> new IllegalStateException("student with id " + userId + " does not exists"));
        if (user.getRole().getPermissionId() != 1) {
            if (user.getStatus()) {
                user.setStatus(false);
            } else {
                user.setStatus(true);
            }
        }
        userRepository.save(user);
    }

//    @Override
//    public List<User> getUserByName(String name) {
//        return userRepository.findUserByName("%"+name.toLowerCase()+"%");
//    }

    @Override
    public ResponseEntity<?> changePassword(Long userId,
                                            @Valid ChangePasswordDTORequest changePasswordDTORequest,
                                            BindingResult bindingResult) {
        User user = userRepository.findById(userId)
                .orElseThrow(
                        () -> new IllegalStateException("student with id " + userId + " does not exists"));
        changePasswordDTORequest.setName(user.getName());

        if (!changePasswordDTORequest.getNewPassword()
                .equals(changePasswordDTORequest.getConfirmNewPassword())) {
            return ResponseEntity.ok("Người dùng comfirm password sai");
        }
        userUtil.validate(changePasswordDTORequest, bindingResult);
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest()
                    .body(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
        }
        // encode password
        if (!passwordEncoder.matches(changePasswordDTORequest.getOldPassword(), user.getPassword())) {
            return ResponseEntity.ok("Người dùng nhập SAI password củ");
        }

        // change Pass
        changePasswordDTORequest.setNewPassword(
                passwordEncoder.encode(changePasswordDTORequest.getNewPassword()));
        changePasswordMapper.updatePasswordFromDTO(changePasswordDTORequest, user);
        userRepository.save(user);
        return ResponseEntity.ok("Người dùng đã được cập nhật thành công!");
    }

    @Override
    public List<User> getUsersByNamesOrEmail(List<String> names) {
        Set<User> userSet = new HashSet<>();
        List<User> userList = new ArrayList<>();
        for (String name : names) {
            userList = userRepository.findUserByNameOrEmail("%" + name.toLowerCase() + "%");
            userSet.addAll(userList);
        }
        return userSet.stream().toList();
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public void changeRoleUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(
                        () -> new IllegalStateException("student with id " + userId + " does not exists"));
        if (user.getRole().getPermissionId() == 2) {
            user.setRole(userPermissionRepository.getUserPermissionById(3L));
        } else if (user.getRole().getPermissionId() == 3) {
            user.setRole(userPermissionRepository.getUserPermissionById(2L));
        }
        userRepository.save(user);
    }

    @Override
    @Transactional
    public void updateCurrentUser(UserDTO user) throws UserNotFoundException {
        Optional<User> userUpdate = RequestAuth.getUserDetails();
        if (userUpdate.isEmpty()) throw new UserNotFoundException();

        userUpdate.get().setName(user.getName());
        userUpdate.get().setPhone(user.getPhone());
        userUpdate.get().setDob(user.getDob());
        userUpdate.get().setGender(user.getGender());
        userUpdate.get().setStatus(user.getStatus() != null && user.getStatus());
        userUpdate.get().setModifiedBy(userUpdate.get().getName());
        userUpdate.get().setModifiedDate(LocalDate.now());
        userRepository.save(userUpdate.get());
    }

    @Override
    @Transactional
    public void changePasswordByUsername(ChangePasswordDTORequest dto) throws Exception {
        Optional<User> userUpdate = RequestAuth.getUserDetails();
        if (userUpdate.isEmpty()) throw new UserNotFoundException();

        if (!dto.getNewPassword().equals(dto.getConfirmNewPassword())) {
            throw new Exception("Confirm password does not match");
        }
        if (dto.getNewPassword().contains(userUpdate.get().getUsername())) {
            throw new Exception("Password must not be the same as or contain a part of the username.");
        }
        // encode password
        if (!passwordEncoder.matches(dto.getOldPassword(), userUpdate.get().getPassword())) {
            throw new Exception("Old password is incorrect");
        }

        // change Pass
        userUpdate.get().setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(userUpdate.get());
    }

    @Override
    public List<String> importUserFromFile(MultipartFile multipartFile,
                                           String encoding,
                                           String separator,
                                           boolean emailCheckbox,
                                           String radio,
                                           HttpServletRequest request) {
        try {
            int count = 0;
            int lineCount = 2;
            int failCount = 0;
            String message = "";
            List<String> errorRows = new ArrayList<>();
            String userName = tokenProvider.getUserNameFromJWT(request);
            byte[] bytes = multipartFile.getBytes();
            Path path = Paths.get(Objects.requireNonNull(multipartFile.getOriginalFilename()));
            Files.write(path, bytes);
            File file = path.toFile();
            if (file.getName().endsWith(".csv")) {
                DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("M/d/yyyy");
                // Đọc tệp CSV
                CSVParser csvParser = new CSVParserBuilder()
                        .withSeparator(separator.charAt(0))
                        .withIgnoreQuotations(true)
                        .build();
                CSVReader csvReader = new CSVReaderBuilder(new FileReader(file))
                        .withSkipLines(1)
                        .withCSVParser(csvParser)
                        .build();
                List<String[]> allData = csvReader.readAll();
                allData.size();
                for (String[] row : allData) {
                    try {
                        User user = createUserFromRow(row, inputFormatter, userName, emailCheckbox, radio);
                        if (user != null) {
                            userRepository.save(user);
                        }
                    } catch (ConstraintViolationException | DateTimeParseException |
                             DataIntegrityViolationException e) {
                        if (e instanceof ConstraintViolationException) {
                            for (ConstraintViolation<?> violation : ((ConstraintViolationException) e).getConstraintViolations()) {
                                String errorMessage = violation.getMessage();
                                errorRows.add("Line " + lineCount + " - " + String.join(", ", row) + " - " + errorMessage);
                            }
                        }
                        if (e instanceof DataIntegrityViolationException) {
                            errorRows.add("Line " + lineCount + " - " + String.join(", ", row) + " - " + "Email already exists");
                        }
                        failCount++;
                    } finally {
                        lineCount++;
                        count++;
                        csvReader.close();
                    }
                }
            } else if (file.getName().endsWith(".xlsx")) {
                DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("M/d/yy");
                // Đọc tệp Excel (XLSX)
                FileInputStream fis = new FileInputStream(file);
                Workbook workbook = new XSSFWorkbook(fis);
                DataFormatter dataFormatter = new DataFormatter();

                Sheet sheet = workbook.getSheetAt(0);
                for (Row row : sheet) {
                    String[] rowData = new String[row.getLastCellNum()];
                    for (int cellIndex = 0; cellIndex < row.getLastCellNum(); cellIndex++) {
                        Cell cell = row.getCell(cellIndex);
                        rowData[cellIndex] = dataFormatter.formatCellValue(cell);
                    }
                    if (row.getRowNum() == 0) {
                        continue; // Skip header row
                    }
                    try {
                        User user = createUserFromRow(rowData, inputFormatter, userName, emailCheckbox, radio);
                        if (user != null) {
                            userRepository.save(user);
                        }
                    } catch (ConstraintViolationException | DateTimeParseException |
                             DataIntegrityViolationException e) {
                        if (e instanceof ConstraintViolationException) {
                            for (ConstraintViolation<?> violation : ((ConstraintViolationException) e).getConstraintViolations()) {
                                String errorMessage = violation.getMessage();
                                errorRows.add("Line " + lineCount + " - " + String.join(", ", rowData) + " - " + errorMessage);
                            }
                        }
                        if (e instanceof DataIntegrityViolationException) {
                            errorRows.add("Line " + lineCount + " - " + String.join(", ", rowData) + " - " + "Email already exists");
                        }
                        failCount++;
                    } finally {
                        lineCount++;
                        count++;
                        fis.close();
                    }
                }
            }
            if (errorRows.isEmpty()) {
                message = "Success! \n";
            }
            message = message + "Total line: " + count + "\n" +
                    "Fail line: " + failCount + "\n";
            errorRows.add(message);
            boolean isDeleted = file.delete();
            if (isDeleted) {
                System.out.println("File đã được xóa thành công.");
            } else {
                System.out.println("Không thể xóa file.");
            }
            return errorRows;
        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return Collections.singletonList("Có lỗi xảy ra khi xử lý.");
        }
    }

    private User createUserFromRow(String[] row,
                                   DateTimeFormatter inputFormatter,
                                   String username,
                                   boolean emailCheckbox,
                                   String radio) {
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (emailCheckbox) {
            if (radio.equals("allow")) {
                return createUserFromRow(row, inputFormatter, username);
            } else if (radio.equals("replace")) {
                User user = userRepository.findUserByEmail(row[1]);
                if (user != null) {
                    user.setName(row[0]);
                    user.setPassword(passwordEncoder.encode(row[2]));
                    if (!row[3].isEmpty()) {
                        LocalDate localDate = LocalDate.parse(row[3], inputFormatter);
                        user.setDob(LocalDate.parse(localDate.format(outputFormatter)));
                    }
                    user.setPhone(row[4]);
                    user.setGender(row[5]);
                    UserPermission userPermission = userPermissionRepository.findByRole(row[6].toUpperCase());
                    user.setRole(userPermission);
                    String status = row[7];
                    if (status.equalsIgnoreCase("true") || status.equalsIgnoreCase("false")){
                        user.setStatus(Boolean.parseBoolean(status));
                    } else {
                        user.setStatus(null);
                    }
                    user.setCreateBy(username);
                    LocalDate localDate = LocalDate.now();
                    user.setCreateDate(LocalDate.parse(localDate.format(outputFormatter)));
                    user.setModifiedBy(null);
                    user.setModifiedDate(null);
                    userRepository.save(user);
                }
                return null;
            } else {
                return null;
            }
        } else {
            return createUserFromRow(row, inputFormatter, username);
        }
    }

    private User createUserFromRow(String[] row, DateTimeFormatter inputFormatter, String username) {
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        User user = new User();
        user.setName(row[0]);
        user.setEmail(row[1]);
        user.setPassword(passwordEncoder.encode(row[2]));
        if (!row[3].isEmpty()) {
            LocalDate localDate = LocalDate.parse(row[3], inputFormatter);
            user.setDob(LocalDate.parse(localDate.format(outputFormatter)));
        }
        user.setPhone(row[4]);
        user.setGender(row[5]);
        UserPermission userPermission = userPermissionRepository.findByRole(row[6].toUpperCase());
        user.setRole(userPermission);
        String status = row[7];
        if (status.equalsIgnoreCase("true") || status.equalsIgnoreCase("false")){
            user.setStatus(Boolean.parseBoolean(status));
        } else {
            user.setStatus(null);
        }
        user.setCreateBy(username);
        LocalDate localDate = LocalDate.now();
        user.setCreateDate(LocalDate.parse(localDate.format(outputFormatter)));
        user.setModifiedBy(null);
        user.setModifiedDate(null);
        return user;
    }

    public List<String> listUserTrainer() {
        return userRepository.listUserTrainer();
    }

    @Override
    public List<String> listUserAdmin() {
        return userRepository.listUserAdmin();
    }
    @Override
    public List<User> getListUserAdmin() {
        return userRepository.getUserAdmin();
    }

    @Override
    public List<User> getListUserTrainer() {
        return userRepository.getUserTrainer();
    }

    @Override
    public List<String> listUserStudent() {
        return userRepository.listUserStudent();
    }

    @Override
    public UserDTO getCurrentUserDto() throws UserNotFoundException {
        Optional<User> currentUser = RequestAuth.getUserDetails();
        if (currentUser.isEmpty()) throw new UserNotFoundException();

        UserDTO dto = userMapper.userToUserDto(currentUser.get());
        dto.setRoleId(currentUser.get().getRole().getPermissionId());
        return dto;
    }

    @Override
    public User getUserByPhone(String userPhone) {
        return userRepository.findUserByPhone(userPhone);
    }
}
