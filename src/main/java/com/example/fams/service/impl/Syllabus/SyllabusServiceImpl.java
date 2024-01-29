package com.example.fams.service.impl.Syllabus;

import com.example.fams.dto.Syllabus.SyllabusSearchDTO;
import com.example.fams.dto.Syllabus.SyllabusViewDTO;
import com.example.fams.dto.Syllabus.SyllabusViewFilterDTO;
import com.example.fams.dto.trainingprogram.SyllabusDetailDTO;
import com.example.fams.mapper.Syllabus.SyllabusViewMapper;
import com.example.fams.mapper.SyllabusMapper;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.repositories.syllabus.SyllabusObjectiveRepository;
import com.example.fams.repositories.syllabus.SyllabusRepository;
import com.example.fams.repositories.training.TrainingUnitRepository;
import com.example.fams.security.token.JwtTokenProvider;
import com.example.fams.service.itf.SyllabusService;
import com.opencsv.CSVParser;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

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

import com.example.fams.utils.GenerateNewId;
import org.springframework.web.multipart.MultipartFile;

import java.util.stream.Collectors;

@Service
public class SyllabusServiceImpl implements SyllabusService {

    @Autowired
    JwtTokenProvider tokenProvider;
    @Autowired
    private SyllabusRepository syllabusRepository;

    @Autowired
    private TrainingUnitRepository trainingUnitRepository;

    @Autowired
    private SyllabusObjectiveRepository syllabusObjectiveRepository;

    @Autowired
    private GenerateNewId generateNewId;

    public SyllabusServiceImpl(GenerateNewId generateNewId) {
        this.generateNewId = generateNewId;
    }

    @Autowired
    SyllabusMapper syllabusMapper;

    @Autowired
    SyllabusViewMapper syllabusViewMapper;


    private final HashMap<String, String> viewColumnList = new HashMap<String, String>() {{
        put("syllabus-name-sort", "topicName");
        put("code-sort", "topicCode");
        put("Created-on-sort", "createDate");
        put("Created-by-sort", "createBy");
        put("Duration-sort", "duration");
    }};




    @Override
    public List<String> importSyllabusFromFile(MultipartFile multipartFile,
                                               String encoding,
                                               String separator,
                                               boolean[] ScanOptionCheckBox,
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
            List<Syllabus> syllabusList = new ArrayList<>();

            if (file.getName().endsWith(".csv")) {
                DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("M/d/yyyy");
                // Đọc tệp CSV
                CSVParser csvParser = new CSVParserBuilder()
                        .withSeparator(',')
                        .withIgnoreQuotations(true)
                        .build();
                CSVReader csvReader = new CSVReaderBuilder(new FileReader(file))
                        .withSkipLines(1)
                        .withCSVParser(csvParser)
                        .build();
                List<String[]> allData = csvReader.readAll();

                for (String[] row : allData) {
                    try{
                        Syllabus syllabus = createSyllabusFromRow(row, inputFormatter, userName, ScanOptionCheckBox, radio);
                        if (syllabus != null) {
                            syllabusList.add(syllabus);
                        }
                    }catch (ConstraintViolationException | DateTimeParseException |
                            DataIntegrityViolationException e){
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
                    try{
                        Syllabus syllabus = createSyllabusFromRow(rowData, inputFormatter, userName, ScanOptionCheckBox, radio);
                        if (syllabus != null) {
                            syllabusList.add(syllabus);
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
            syllabusRepository.saveAll(syllabusList);
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

    private Syllabus createSyllabusFromRow(String[] row,
                                           DateTimeFormatter inputFormatter,
                                           String username,
                                           boolean[] ScanOptionCheckBox,
                                           String radio) {
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        System.out.println(Arrays.toString(row));
        Syllabus syllabus = new Syllabus();
        syllabus.setTopicCode(row[0]);
        syllabus.setTopicName(row[1]);
        syllabus.setTechnicalGroup(row[2]);

        syllabus.setVersion(row[3]);
        syllabus.setTrainingAudience(Integer.valueOf(row[4]));
        syllabus.setTopicOutline(row[5]);

        syllabus.setTrainingMaterials(row[6]);
        syllabus.setTrainingPrinciplesTraining(row[7]);
        syllabus.setTrainingPrinciplesRetest(row[8]);
        syllabus.setTrainingPrinciplesMarking(row[9]);
        syllabus.setTrainingPrinciplesCriteria(row[10]);
        syllabus.setTrainingPrinciplesOthers(row[11]);

        syllabus.setPriority(row[12]);
        syllabus.setPublicStatus(row[13]);
        syllabus.setStatus("Draft");

        syllabus.setCreateBy(row[14]);
        LocalDate localDate = LocalDate.parse(row[15], inputFormatter);
        syllabus.setCreateDate(LocalDate.parse(localDate.format(outputFormatter)));

        syllabus.setModifiedBy(row[16]);
        if (!row[17].isEmpty()) {
            localDate = LocalDate.parse(row[17], inputFormatter);
            syllabus.setModifiedDate(LocalDate.parse(localDate.format(outputFormatter)));
        } else {
            syllabus.setModifiedDate(null);
        }

        String assessmentScheme = ""+row[18];
        syllabus.setAssessmentScheme(assessmentScheme);

        return syllabus;
    }


    @Override
    public List<SyllabusSearchDTO> searchSyllabus(String keyword) {
        List<Syllabus> syllabusList = syllabusRepository.searchByCodeOrName(keyword);
        return syllabusList.stream()
                .map(syllabusMapper::syllabusToSearchDTO)
                .collect(Collectors.toList());
    }


    @Override
    public List<Syllabus> getAllSyllabusByTrainingProgramName(String programName) {
        return syllabusRepository.getAllSyllabusByTrainingProgramName(programName);
    }


    @Override
    @Transactional
    public List<Object> getSyllabusList(SyllabusViewFilterDTO viewDetailDTO){


        int currentPage = viewDetailDTO.getCurrentPage();
        ArrayList<String> searchRestrictions = viewDetailDTO.getSearchBy();
        ArrayList<String> searchDate = viewDetailDTO.getSearchDate();
        final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");


        //process query from database
        Optional<List<Syllabus>> query;
        if(searchRestrictions.isEmpty()){
            if (searchDate.isEmpty()){
                query = syllabusRepository.getSyllabusViewData();
//                System.out.println("query with no condition and date");
            }else{
                LocalDate startDate = LocalDate.parse(searchDate.get(0), dateFormatter);
                LocalDate endDate = LocalDate.parse(searchDate.get(1), dateFormatter);
                query = syllabusRepository.getSyllabusViewData(startDate, endDate);
//                System.out.println("query with date and no condition");
            }
        }else{
            if(searchDate.isEmpty()){
                query = syllabusRepository.getSyllabusViewData(searchRestrictions);
                System.out.println("query with condition and no date");
            }else{
                LocalDate startDate = LocalDate.parse(searchDate.get(0),dateFormatter);
                LocalDate endDate = LocalDate.parse(searchDate.get(1), dateFormatter);
                query = syllabusRepository.getSyllabusViewData(searchRestrictions, startDate, endDate);
//                System.out.println("query with condition and date");
            }
        }

        List<SyllabusViewDTO> viewDTOList = new ArrayList<>();
        if (query.isEmpty()) {
            throw new IllegalStateException("Query is null");
        }
        query.get()//get data from object
            .forEach((syllabus)->{
                    SyllabusViewDTO viewDTO = new SyllabusViewDTO();
                    syllabusViewMapper.updateDTOFromSyllabus(syllabus, viewDTO);

                    Optional<Long> durationQuery =
                            trainingUnitRepository.getDurationBySyllabusId(viewDTO.getSyllabusId());

                    if (durationQuery.isEmpty()){
//                            throw new IllegalStateException("duration query is null");
                        viewDTO.setDuration(0L);
                    }else {
                        viewDTO.setDuration(durationQuery.get());
                    }


                    Optional<Set<String>> outputStandardQuery =
                            syllabusObjectiveRepository.getObjectiveCodeBySyllabusId(syllabus.getSyllabusId());

                    if (outputStandardQuery.isEmpty()) {
                        throw new IllegalStateException("Output standard is null");
                    }
                    HashSet<String> outputStandardSet =new HashSet(outputStandardQuery.get());
                    if (outputStandardSet.size()>=4){
                        viewDTO.setOutPutStandard(
                                new HashSet<>(outputStandardSet.stream()
                                        .limit(3).collect(Collectors.toSet()))
                        );
                        viewDTO.getOutPutStandard().add("...");
                    }else {
                        viewDTO.setOutPutStandard(new HashSet<>(outputStandardSet));
                    }
                viewDTOList.add(viewDTO);
                }
            );


        sortSyllabusViewDTOList(viewDTOList, viewDetailDTO.getSortColumn());
        ArrayList<Object> testPageData = getSyllabusViewPage(10, viewDTOList, viewDetailDTO.getCurrentPage());

        query = Optional.empty();
        return testPageData;
    }

    @Override
    public List<Syllabus> listAllSyllabus() {
        return syllabusRepository.findAll(); // Sử dụng phương thức findAll() của repository để lấy danh sách chương trình học.
    }

    @Override
    public SyllabusDetailDTO getSyllabusByCode(String code) {
         return syllabusRepository.getSyllabusByTopicCode(code);
    }



    @Override
    @Transactional
    public void removeObjective(Long syllabusId, String objectiveCode) {
        syllabusObjectiveRepository.deleteByTopicCodeAndByCode(syllabusId, objectiveCode);
    }

    @Override
    @Transactional
    public String deleteSyllabus(Long syllabusId) {
        Optional<Syllabus> syllabus = syllabusRepository.findById(syllabusId);
        if (syllabus.isEmpty()){
            return "no record of this syllabus exist";
        }else {
            syllabus.get().setPublicStatus("PRIVATE");
            syllabusRepository.saveAndFlush(syllabus.get());
            return "delete successful";
        }

    }

    @Override
    @Transactional
    public String toggleSyllabusStatus(long syllabusId) {
        Optional<Syllabus> syllabus = syllabusRepository.findById(syllabusId);
        String message;
        if (syllabus.isEmpty()){
            message = "can not find syllabus";
        }else {
            if (syllabus.get().getStatus().equals("Active")){
                syllabus.get().setStatus("Inactive");
            }else {
                syllabus.get().setStatus("Active");
            }
            syllabusRepository.saveAndFlush(syllabus.get());
            message = "Status update successfully";
        }
        return message;
    }



    @Override
    public Long getSyllabusByCodeAndVersion(String topicCode, String version) {
        return syllabusRepository.findIdByTopicCodeAndVersion(topicCode, version);
    }

    @Override
    public List<String> getVersionList(Long syllabusId) {
        Optional<Syllabus> syllabus = syllabusRepository.findById(syllabusId);
        if (syllabus.isEmpty()){
            throw new QueryException("can not find syllabus");
        } else {
            return syllabusRepository.findVersionsByTopicCode(syllabus.get().getTopicCode());
        }

    }

    @Override
    public String getNewTopicCode(String baseCode) {
        Random intGenerator = new Random();
        StringBuilder codeBuilder = new StringBuilder();
        String code;
        codeBuilder.append(baseCode);
        codeBuilder.append(intGenerator.nextInt(10));
        codeBuilder.append(intGenerator.nextInt(10));
        codeBuilder.append(intGenerator.nextInt(10));
        codeBuilder.append(intGenerator.nextInt(10));
        if (syllabusRepository.findSyllabusByTopicCode(codeBuilder.toString())!=null){
            code = getNewTopicCode(baseCode);
        }else {
            code = codeBuilder.toString();
            return code;
        }
        return code;
    }


    @Override
    public Long testQuery(Long ids){
        Optional<Long> durationQuery =
                trainingUnitRepository.getDurationBySyllabusId(ids);
        return  durationQuery.get();
    }



    private void sortSyllabusViewDTOList(List<SyllabusViewDTO> viewDTOList,
                                         String sortColumn){

        switch(sortColumn){
            case "syllabus-name-sort":
                viewDTOList.sort(Comparator.comparing(SyllabusViewDTO::getTopicName));
                break;
            case "code-sort":
                viewDTOList.sort(Comparator.comparing(SyllabusViewDTO::getTopicCode));
                break;
            case "Created-on-sort":
                viewDTOList.sort(Comparator.comparing(SyllabusViewDTO::getCreateDate));
                break;
            case "Created-by-sort":
                viewDTOList.sort(Comparator.comparing(SyllabusViewDTO::getCreateBy));
                break;
            case "Duration-sort":
                viewDTOList.sort(Comparator.comparing(SyllabusViewDTO::getDuration));
                break;
        }

        Collections.reverse(viewDTOList);

    }


    private ArrayList<Object> getSyllabusViewPage(int pageSize,
                                                      List<SyllabusViewDTO> viewDTOList,
                                                      int currentPage){
        List<SyllabusViewDTO> pageData = null;

        int totalDTO = viewDTOList.size();
        int totalPage = (int) Math.ceil((double) totalDTO /pageSize);

        if (currentPage!=totalPage){
            int StartIdx = (currentPage-1)*pageSize;
            int endIdx = currentPage*pageSize;
            pageData = viewDTOList.subList(StartIdx, endIdx);
        }else {
            int StartIdx = (currentPage-1)*pageSize;
            int endIdx = totalDTO;

            pageData = viewDTOList.subList(StartIdx, endIdx);


        }

        ArrayList<Object> result = new ArrayList<>();
        result.add(totalPage);
        result.add(pageData);

        return result;
    }

    private void updateDulicateVersion(Syllabus syllabus){

        String[] versionNumbers = syllabus.getVersion().split("[.]");
        versionNumbers[2] = String.valueOf(
                Integer.parseInt(versionNumbers[2])+1
        );
        syllabus.setVersion(String.join(".",versionNumbers));
        System.out.println(syllabus.getVersion());
    }
}
