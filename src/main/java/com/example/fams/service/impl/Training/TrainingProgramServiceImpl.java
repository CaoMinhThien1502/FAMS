package com.example.fams.service.impl.Training;


import com.example.fams.dto.trainingprogram.*;
import com.example.fams.dto.trainingunit.TrainingContentDetailOfListDTO;
import com.example.fams.mapper.ClassSubjectMapper;
import com.example.fams.mapper.TrainingProgramMapper;
import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.models.training.TrainingProgram;
import com.example.fams.models.training.TrainingProgramSyllabus;
import com.example.fams.models.user.User;
import com.example.fams.repositories.syllabus.SyllabusRepository;
import com.example.fams.repositories.training.TrainingContentRepository;
import com.example.fams.repositories.training.TrainingProgramRepository;
import com.example.fams.repositories.training.TrainingProgramSyllabusRepository;
import com.example.fams.repositories.training.TrainingUnitRepository;
import com.example.fams.repositories.user.UserRepository;
import com.example.fams.security.token.JwtTokenProvider;
import com.example.fams.service.itf.TrainingProgramService;
import com.example.fams.utils.GenerateNewId;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrainingProgramServiceImpl implements TrainingProgramService {
    @Autowired
    TrainingProgramRepository trainingProgramRepository;
    @Autowired
    TrainingProgramSyllabusRepository trainingProgramSyllabusRepository;
    @Autowired
    SyllabusRepository syllabusRepository;
    @Autowired
    TrainingContentRepository trainingContentRepository;

    @Autowired
    TrainingProgramMapper trainingProgramMapper;
    @Autowired
    TrainingUnitRepository trainingUnitRepository;
    @Autowired
    ClassSubjectMapper classSubjectMapper;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private GenerateNewId generateNewId;
    @Autowired
    JwtTokenProvider tokenProvider;

    @Override
    public List<TrainingProgramDTO> getAllTrainingProgram() {
        return trainingProgramMapper.toTrainingProgramDtoList(trainingProgramRepository.findAll());
    }

    @Override
    public TrainingProgramDTO createTrainingProgram(TrainingProgramDTO trainingProgramDTOCreateRequest) {

        // chuyen tu String sang entity
        TrainingProgram trainingProgram = trainingProgramMapper.toTrainingProgram(trainingProgramDTOCreateRequest);
        User user = userRepository.findById(trainingProgramDTOCreateRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("user not exist")
                );
        trainingProgram.setUser(user);
        // save entity
        trainingProgramRepository.save(trainingProgram);
        // chuyen entity sang String
        TrainingProgramDTO trainingProgramDTO = trainingProgramMapper.toTrainingProgramDto(trainingProgram);
        trainingProgramDTO.setUserId(user.getUserId());

        return trainingProgramDTO;
    }

    @Override
    public List<TrainingProgramDTO> getTrainingProgramByName(String name) {
        List<TrainingProgram> trainingProgramList = trainingProgramRepository.getTrainingProgramByName(name);
        List<TrainingProgramDTO> trainingProgramDTOList = trainingProgramMapper.toTrainingProgramDtoList(trainingProgramList);
        return trainingProgramDTOList;
    }


    @Override
    public List<TrainingProgram> insertTraining(String text) {
        return trainingProgramRepository.insertTraining(text);
    }


    @Override
    public TrainingProgramDTO duplicateTrainingProgram(String trainingProgramCode) {
        TrainingProgram originalTrainingProgram = trainingProgramRepository.findById(trainingProgramCode).orElseThrow();
        List<TrainingProgramSyllabus> listTPS = trainingProgramSyllabusRepository.findByTrainingProgramCode(trainingProgramCode);
        TrainingProgram duplicatedTrainingProgram = new TrainingProgram();

        duplicatedTrainingProgram = trainingProgramMapper.duplicateTrainingProgram(originalTrainingProgram, duplicatedTrainingProgram);

        List<TrainingProgram> searchList = trainingProgramRepository.findAll();
        String nextTrainingProgramCode = generateNewId.generateNextTrainingProgramCode(searchList, trainingProgramCode);

        duplicatedTrainingProgram.setTrainingProgramCode(nextTrainingProgramCode);

        // Lấy thời gian hiện tại
        LocalDateTime currentTime = LocalDateTime.now();

        // Sử dụng định dạng để tạo chuỗi thời gian ngắn
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String formattedTime = currentTime.format(formatter);

        duplicatedTrainingProgram.setName(originalTrainingProgram.getName() + " - " + formattedTime);
        duplicatedTrainingProgram.setStatus("DRAFT");
        duplicatedTrainingProgram.setCreateDate(LocalDate.now());
        duplicatedTrainingProgram.setModifiedDate(LocalDate.now());

        TrainingProgram savedTrainingProgram = trainingProgramRepository.save(duplicatedTrainingProgram);

        //tạo thêm trainingprogramsyllabus

        for (TrainingProgramSyllabus t : listTPS) {
            TrainingProgramSyllabus newTPS = new TrainingProgramSyllabus();
            newTPS.setTrainingProgram(savedTrainingProgram);
            newTPS.setSyllabus(t.getSyllabus());
            trainingProgramSyllabusRepository.save(newTPS);
        }

        return trainingProgramMapper.toTrainingProgramDto(savedTrainingProgram);
    }

    @Override
    public void changeTrainingProgramStatus(String code, String status) {
//        status = status.toUpperCase();
//
//        if (!status.equalsIgnoreCase("ACTIVE") && !status.equalsIgnoreCase("INACTIVE")) {
//            throw new IllegalStateException("Invalid status value " + status + code);
//        }

        TrainingProgram program = trainingProgramRepository.findById(code).orElse(null);

        if (program == null) {
            throw new IllegalStateException("Training program with the code " + code + " does not exist");
        }

//        String currentStatus = program.getStatus();

//        if (status.equalsIgnoreCase("DRAFT")) {
//            throw new IllegalStateException("The training program is a draft. Please send a request to update the training program.");
//        }

//        if (currentStatus.equals(status)) {
//            throw new IllegalStateException("The current status is already " + status);
//        }

        if (status.equalsIgnoreCase("ACTIVE")) {
            program.setStatus("INACTIVE");
        } else {
            program.setStatus("ACTIVE");
        }

        trainingProgramRepository.save(program);
    }

    //    @Override
//    public void updateTrainingProgram(String code, TrainingProgramDTO trainingProgramDTO) {
//        TrainingProgram program = trainingProgramRepository.findById(code).orElse(null);
//
//        if (program == null) {
//            throw new IllegalStateException("Training program with the code " + code + " does not exist");
//        }
//
//        trainingProgramMapper.updateTrainingProgramFromDto(trainingProgramDTO, program);
//        trainingProgramRepository.save(program);
//    }
//    @Override
//    public void updateTrainingProgram(String code, TrainingProgramDTO trainingProgramDTO) {
//        TrainingProgram program = trainingProgramRepository.findById(code).orElse(null);
//
//        if (program == null) {
//            throw new IllegalStateException("Training program with the code " + code + " does not exist");
//        }
//
//        program.setName(trainingProgramDTO.getName());
//        program.setGeneralInf(trainingProgramDTO.getGeneralInf());
//        trainingProgramRepository.save(program);
//    }


    @Override
    public List<TrainingProgramSyllabus> getTrainingProgramSyllasbus(String trainingProgramCode) {
        return trainingProgramSyllabusRepository.findByTrainingProgramCode(trainingProgramCode);
    }

    @Override
    public List<SyllabusDetailOfListDTO> getSyllabusDTO(List<TrainingProgramSyllabus> trainingProgramSyllabusList) {
        List<String> topicCodes = new ArrayList<>();
        for (TrainingProgramSyllabus t : trainingProgramSyllabusList) {
            String topicCode = t.syllabus.getTopicCode();
            topicCodes.add(topicCode);
        }
        List<SyllabusDetailOfListDTO> list = new ArrayList<>();
        for (String code : topicCodes) {
            SyllabusDetailOfListDTO syllabusDetailOfListDTO = new SyllabusDetailOfListDTO(syllabusRepository.getSyllabusByTopicCode(code), trainingUnitRepository.getAllTrainingUnitDetail(code));
            if (syllabusDetailOfListDTO.getSyllabusDetailDTO() != null) {
                list.add(syllabusDetailOfListDTO);
            }
            for (SyllabusDetailOfListDTO l : list) {
                List<TrainingUnitDetailOfListDTO> trainingUnitDetailOfListDTO = l.getTrainingUnitDetailOfListDTOList();
                for (TrainingUnitDetailOfListDTO tu : trainingUnitDetailOfListDTO) {
                    String topicCode = tu.getTopicCode();
                    Integer dayNumber = tu.getDayNumber();
                    tu.setTrainingContentDetailOfListDTOList(trainingUnitRepository.getAllTrainingUnitOfDay(topicCode, dayNumber));
                    for (TrainingContentDetailOfListDTO tc : tu.getTrainingContentDetailOfListDTOList()) {
                        String unitCode = tc.getUnitCode();
                        String unitName = tc.getUnitName();
                        tc.setTrainingContentDetailOfListDTOS(trainingContentRepository.getAllTrainingContentOfUnitCode(unitCode, unitName));
                    }
                }
            }
        }
        return list;
    }

    @Override
    public TrainingProgramDetailDTO responseDetailTrainingProgramSyllabus(TrainingProgramDTO trainingProgramDTO, List<SyllabusDetailOfListDTO> syllabusListDTO, List<ClassDetailOfListDTO> classDetailOfListDTO) {
        return new TrainingProgramDetailDTO(trainingProgramDTO, syllabusListDTO, classDetailOfListDTO);
    }

    @Override
    public TrainingProgramDTO getTrainingProgram(String trainingProgramCode) {
        TrainingProgram trainingProgram = trainingProgramRepository.findTrainingProgramByTrainingProgramCode(trainingProgramCode);
        return trainingProgramMapper.toTrainingProgramDto(trainingProgram);
    }

    @Override
    public List<ClassDetailOfListDTO> getClassSubject(String trainingProgramCode) {
        List<ClassSubject> classSubjectList = trainingProgramRepository.findAllClasssubjectByTrainingProgramCode(trainingProgramCode);
        return classSubjectMapper.toClassSubjectListDTO(classSubjectList);
    }

    @Override
    public List<String> importTrainingProgramFromFile(MultipartFile multipartFile,
                                                      String encoding,
                                                      String separator,
                                                      boolean programNameCheckBox,
                                                      String radio,
                                                      String username) {
        try {
            int count = 0;
            int lineCount = 2;
            int failCount = 0;
            String message = "";
            List<String> errorRows = new ArrayList<>();
            byte[] bytes = multipartFile.getBytes();
            Path path = Paths.get(Objects.requireNonNull(multipartFile.getOriginalFilename()));
            Files.write(path, bytes);
            File file = path.toFile();
            List<TrainingProgram> trainingProgramList = trainingProgramRepository.findAll();

            if (file.getName().endsWith(".csv")) {
                DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("M/d/yyyy");

                CSVParser csvParser = new CSVParserBuilder()
                        .withSeparator(separator.charAt(0))
                        .withIgnoreQuotations(true)
                        .build();
                CSVReader csvReader = new CSVReaderBuilder(new FileReader(file))
                        .withSkipLines(1)
                        .withCSVParser(csvParser)
                        .build();
                List<String[]> allData = csvReader.readAll();

                for (String[] row : allData) {
                    try {
                        TrainingProgram program = createTrainingProgramWithCheck(row, inputFormatter, trainingProgramList, username, programNameCheckBox, radio);
                        if (program != null) {
                            trainingProgramRepository.save(program);
                            trainingProgramList.add(program);
                        }
                    } catch (ConstraintViolationException | DateTimeParseException |
                             DataIntegrityViolationException | IllegalArgumentException ex) {
                        if (ex instanceof ConstraintViolationException) {
                            for (ConstraintViolation<?> violation : ((ConstraintViolationException) ex).getConstraintViolations()) {
                                String errorMessage = violation.getMessage();
                                errorRows.add("Line " + lineCount + " - " + String.join(", ", row) + " - " + errorMessage);
                            }
                        }
                        if (ex instanceof DataIntegrityViolationException) {
                            errorRows.add("Line " + lineCount + " - " + String.join(", ", row) + " - Training program already exists");
                        }
                        if (ex instanceof NumberFormatException) {
                            errorRows.add("Line " + lineCount + " - " + String.join(", ", row) + " - The duration must be an integer");
                        }
                        if (ex instanceof IllegalArgumentException) {
                            errorRows.add("Line " + lineCount + " - " + String.join(", ", row) + " - " + ((IllegalArgumentException) ex).getMessage());
                        }
                        failCount++;
                    } finally {
                        lineCount++;
                        count++;
                    }
                }
                csvReader.close();
            } else if (file.getName().endsWith(".xlsx")) {
                DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("M/d/yy");

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
                        continue;
                    }
                    try {
                        TrainingProgram program = createTrainingProgramWithCheck(rowData, inputFormatter, trainingProgramList, username, programNameCheckBox, radio);
                        if (program != null) {
                            trainingProgramRepository.save(program);
                            trainingProgramList.add(program);
                        }
                    } catch (ConstraintViolationException | DateTimeParseException |
                             DataIntegrityViolationException | IllegalArgumentException ex) {
                        if (ex instanceof ConstraintViolationException) {
                            for (ConstraintViolation<?> violation : ((ConstraintViolationException) ex).getConstraintViolations()) {
                                String errorMessage = violation.getMessage();
                                errorRows.add("Line " + lineCount + " - " + String.join(", ", rowData) + " - " + errorMessage);
                            }
                        }
                        if (ex instanceof DataIntegrityViolationException) {
                            errorRows.add("Line " + lineCount + " - " + String.join(", ", rowData) + " - Training program already exists");
                        }
                        if (ex instanceof NumberFormatException) {
                            errorRows.add("Line " + lineCount + " - " + String.join(", ", rowData) + " - The duration must be an integer");
                        }
                        if (ex instanceof IllegalArgumentException) {
                            errorRows.add("Line " + lineCount + " - " + String.join(", ", rowData) + " - " + ((IllegalArgumentException) ex).getMessage());
                        }
                        failCount++;
                    } finally {
                        lineCount++;
                        count++;
                    }
                }
                fis.close();
            }

            if (errorRows.isEmpty()) {
                message = "Success! \n";
            }

            message = message + "Total line: " + count + "\n" +
                    "Fail line: " + failCount + "\n";
            errorRows.add(message);
            boolean isDeleted = file.delete();

            if (isDeleted) {
                System.out.println("File has been deleted");
            } else {
                System.out.println("File couldn't be deleted");
            }

            return errorRows;
        } catch (IOException | CsvException e) {
            e.printStackTrace();
            return Collections.singletonList("An error has occurred");
        }
    }

    private TrainingProgram createTrainingProgramWithCheck(String[] row,
                                                           DateTimeFormatter inputFormatter,
                                                           List<TrainingProgram> trainingProgramList,
                                                           String username,
                                                           boolean programNameCheckBox,
                                                           String radio) {

        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        TrainingProgram trainingProgram = trainingProgramList.stream()
                .filter(program -> program.getName().equalsIgnoreCase(row[0]))
                .findFirst().orElse(null);
        User user = new User();
        List<User> userList = userRepository.searchUserByName(username);

        if (userList.isEmpty()) {
            System.out.println("//////////////The user list is empty");
            return null;
        } else {
            user = userList.get(0);
        }

        if (user == null) {
            System.out.println("////////////////The user is null");
            return null;
        }

        if (!row[3].equalsIgnoreCase("ACTIVE") && !row[3].equalsIgnoreCase("INACTIVE")) {
            throw new IllegalArgumentException("Status must be \"ACTIVE\" or \"INACTIVE\"");
        }


        if (programNameCheckBox) {
            switch (radio) {
                case "allow":
                    return createTrainingProgramFromRow(row, inputFormatter, trainingProgramList, user);

                case "replace":
                    if (trainingProgram != null) {
//                        if (user != null) {
                        trainingProgram.setDuration(Integer.parseInt(row[1]));
                        trainingProgram.setGeneralInf(row[2]);
                        trainingProgram.setStatus(row[3]);
                        trainingProgram.setUser(user);
                        trainingProgram.setCreateBy(username);
                        trainingProgram.setModifiedBy(username);
                        LocalDate starTime = LocalDate.parse(row[4], inputFormatter);
                        trainingProgram.setStarTime(LocalDate.parse(starTime.format(outputFormatter)));
                        trainingProgram.setCreateDate(LocalDate.parse(LocalDate.now().format(outputFormatter)));
                        trainingProgram.setModifiedDate(LocalDate.parse(LocalDate.now().format(outputFormatter)));
                        return trainingProgram;
//                        }
//                        return null;
                    } else {
                        return createTrainingProgramFromRow(row, inputFormatter, trainingProgramList, user);
                    }

                default:
                    if (trainingProgram == null) {
                        return createTrainingProgramFromRow(row, inputFormatter, trainingProgramList, user);
                    } else {
                        return null;
                    }
            }
        } else {
            return createTrainingProgramFromRow(row, inputFormatter, trainingProgramList, user);
        }
    }

    private TrainingProgram createTrainingProgramFromRow(String[] row,
                                                         DateTimeFormatter inputFormatter,
                                                         List<TrainingProgram> trainingProgramList,
                                                         User user) {
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        TrainingProgram trainingProgram = new TrainingProgram();
        trainingProgram.setTrainingProgramCode(generateNewId.generateNextTrainingProgramCode(trainingProgramList, "TP001"));
        trainingProgram.setName(row[0]);
        trainingProgram.setDuration(Integer.parseInt(row[1]));
        trainingProgram.setGeneralInf(row[2]);
        trainingProgram.setStatus(row[3]);
        trainingProgram.setUser(user);
        trainingProgram.setCreateBy(user.getName());
        trainingProgram.setModifiedBy(user.getName());
        LocalDate starTime = LocalDate.parse(row[4], inputFormatter);
        trainingProgram.setStarTime(LocalDate.parse(starTime.format(outputFormatter)));
        trainingProgram.setCreateDate(LocalDate.parse(LocalDate.now().format(outputFormatter)));
        trainingProgram.setModifiedDate(LocalDate.parse(LocalDate.now().format(outputFormatter)));
        return trainingProgram;
    }

    @Override
    public List<TrainingProgram> getTrainingProgramByNameInsert(String text) {
        return trainingProgramRepository.getTrainingProgramByName(text.toLowerCase());
    }

    @Override
    public TrainingProgram getToCreateClass(String name) {
        return trainingProgramRepository.findTrainingProgram(name);
    }

    @Override
    public List<TrainingProgramDTO> getTrainingProgramByNameList(List<String> nameList) {
        List<TrainingProgramDTO> searchResult = new ArrayList<>();

        for (String name : nameList) {
            List<TrainingProgram> trainingProgramList = trainingProgramRepository.findTrainingProgramByName("%" + name.toLowerCase() + "%");

            if (!trainingProgramList.isEmpty()) {
                List<TrainingProgramDTO> trainingProgramDTOList = trainingProgramMapper.toTrainingProgramDtoList(trainingProgramList);
                searchResult.addAll(trainingProgramDTOList);
            }
        }

        return searchResult;
    }

    @Override
    public List<TrainingProgram> validateInputName(String name) {
        return trainingProgramRepository.findTrainingProgramByTrainingName(name);
    }

    @Override
    public boolean updateTrainingProgram(String code, String name, String generalInf, List<String> selectedTopicCodes, HttpServletRequest request) {
        TrainingProgram program = trainingProgramRepository.findById(code).orElse(null);

        if (program == null) {
            throw new IllegalStateException("Training program with the code " + code + " does not exist");
        }

        List<TrainingProgram> list = trainingProgramRepository.findAll();

        for (TrainingProgram t : list) {
            if (name.equals(t.getName()) && !name.equals(program.getName())) {
                return false;
            }
        }

        // Cập nhật thông tin của chương trình đào tạo
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = currentDate.format(formatter);
        String userName = tokenProvider.getUserNameFromJWT(request);

        program.setName(name);
        program.setGeneralInf(generalInf);
        program.setModifiedDate(LocalDate.parse(formattedDate));
        program.setModifiedBy(userName);
        // Lưu lại chương trình đào tạo đã cập nhật
        trainingProgramRepository.save(program);

        return true;
    }

    @Override
    @Transactional
    public Optional<TrainingProgram> getById(String id) {
        return trainingProgramRepository.findById(id);
    }

    @Override
    public boolean createTrainingProgram(String code, String name,
                                         String generalInf, List<String> selectedTopicCodes,
                                         int duration, String username) {
        TrainingProgram program = new TrainingProgram();
        List<User> userList = userRepository.searchUserByName(username);
        User user = new User();

        if (userList.isEmpty()) {
            System.out.println("User doesnt exist");
        } else {
            user = userList.get(0);
        }

        program.setName(name);
        String programCode = generateNewId.generateNextTrainingProgramCode(trainingProgramRepository.findAll(),
                "TP001");
        program.setTrainingProgramCode(programCode);
        program.setUser(user);
        program.setCreateDate(LocalDate.now());
        program.setStatus("INACTIVE");
        program.setCreateBy(username);
        program.setModifiedBy(username);

        Set<TrainingProgramSyllabus> syllabusSet = new HashSet<>();
        List<Syllabus> syllabusList = syllabusRepository.findAll();
        for (String topicCode : selectedTopicCodes) {
            System.out.println(topicCode);
            Syllabus syllabus = null;
            for (Syllabus s : syllabusList) {
                if (s.getTopicCode().equalsIgnoreCase(topicCode)) {
                    syllabus = s;
                    break;
                }
            }
            if (syllabus != null) {
                TrainingProgramSyllabus trainingProgramSyllabus = new TrainingProgramSyllabus();
                trainingProgramSyllabus.setTrainingProgram(program);
                trainingProgramSyllabus.setSyllabus(syllabus);
                syllabusSet.add(trainingProgramSyllabus);
            }
        }
        program.setDuration(duration / 24);
        program.setTrainingProgramSyllabus(syllabusSet);
        trainingProgramRepository.save(program);

        for (TrainingProgramSyllabus trainingProgramSyllabus : syllabusSet) {
            trainingProgramSyllabusRepository.save(trainingProgramSyllabus);
        }
        return true;
    }
}
