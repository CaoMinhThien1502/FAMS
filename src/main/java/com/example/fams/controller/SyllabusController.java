package com.example.fams.controller;

import com.example.fams.dto.Syllabus.SyllabusSearchDTO;
import com.example.fams.dto.Syllabus.syllabusCreation.SyllabusDetailsDTO;
import com.example.fams.dto.trainingprogram.SyllabusDetailDTO;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.service.itf.*;
import com.example.fams.utils.ValidatorUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import com.example.fams.dto.Syllabus.SyllabusViewFilterDTO;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;


@Controller
@RequiredArgsConstructor
@RequestMapping("/syllabus")
public class SyllabusController {

    @Autowired
    private final MaterialDataService materialDataService;

    @Autowired
    private final SyllabusService syllabusService;


    @Autowired
    private final SyllabusDetailsService syllabusDetailsService;

    @Autowired
    private final TrainingUnitService trainingUnitService;

    @Autowired LearningObjectiveService learningObjectiveService;

    @Autowired
    private ValidatorUtil validatorUtil;
    private final ObjectMapper jsonMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    private SyllabusViewFilterDTO viewDetailDTO;

    private HashMap<String, String> viewColumnList = new HashMap<String, String>() {{
        put("syllabus-name-sort", "sy.topicName");
        put("code-sort", "sy.topicCode");
        put("Created-on-sort", "sy.createDate");
        put("Created-by-sort", "sy.createBy");
        put("Duration-sort", "duration");
    }};

    @GetMapping("/show-create-class")
    @ResponseBody()
    List<Syllabus> showInCreateClass(@RequestParam String text) {
        List<Syllabus> list = syllabusService.getAllSyllabusByTrainingProgramName(text);
        return list;
    }

    @GetMapping("/search")
    public ResponseEntity<List<SyllabusSearchDTO>> searchSyllabus(@RequestParam String keyword) {
        List<SyllabusSearchDTO> searchResults = syllabusService.searchSyllabus(keyword);
        return new ResponseEntity<>(searchResults, HttpStatus.OK);
    }

    @GetMapping("/getsyllabuscode")
    @ResponseBody
    public SyllabusDetailDTO getSyllabusByCode(@RequestParam String code){
        SyllabusDetailDTO syllabusDetailDTO = syllabusService.getSyllabusByCode(code);
        return syllabusService.getSyllabusByCode(code);
    }


    @GetMapping("/list")
    public String getSyllabusList(Model model) throws JsonProcessingException {

        if (viewDetailDTO == null) {
            viewDetailDTO = new SyllabusViewFilterDTO();
            viewDetailDTO.setSearchBy(new ArrayList<>());
            viewDetailDTO.setSearchDate(new ArrayList<>());
            viewDetailDTO.setSortColumn("Created-on-sort");
            viewDetailDTO.setCurrentPage(1);
        }

//        String successMessage = (String) model.getAttribute("successMessage");
//        String errorMessage = (String) model.getAttribute("errorMessage");

        List<Object> data = syllabusService.getSyllabusList(viewDetailDTO);

//        model.addAttribute("successMessage", successMessage);
//        model.addAttribute("errorMessage", errorMessage);
        //Pagination
        model.addAttribute("totalPage", data.get(0));
        //View data and conditions
        model.addAttribute("syllabusList", data.get(1));
        model.addAttribute("viewDetailJson", jsonMapper.writeValueAsString(viewDetailDTO));

        viewDetailDTO = null;

        return "syllabus/syllabusView.html";

    }

    @PostMapping("/list")
    public ResponseEntity<String> getSearchDetail(@Valid @NonNull
                                                      SyllabusViewFilterDTO webViewDetailDTO,
                                                      BindingResult bindingResult) {

        viewDetailDTO = webViewDetailDTO;

        if (viewDetailDTO.getSearchDate() == null) {
            viewDetailDTO.setSearchDate(new ArrayList<>());
        }
        if (viewDetailDTO.getSearchBy() == null) {
            viewDetailDTO.setSearchBy(new ArrayList<>());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/view")
    public String getSyllabusView(@RequestParam("syllabus") Long syllabusId,
                                       Model model) throws JsonProcessingException{


        model.addAttribute("action", "view");
        model.addAttribute("versionList", syllabusService.getVersionList(syllabusId).toString());


        return "syllabus/syllabus-details-view.html";
    }

    @GetMapping("/view/version")
    public ResponseEntity<Long> getSyllabusViewByVersion(@RequestParam("topicCode") String topicCode,
                                                         @RequestParam("version") String version){
        Long syllabusId = syllabusService.getSyllabusByCodeAndVersion(topicCode, version);
        return new ResponseEntity<>(syllabusId, HttpStatus.OK);
    }


    @GetMapping("/duplicate")
    public String getSyllabusDuplicate(@RequestParam("syllabus") Long syllabusId,
                                     Model model) throws JsonProcessingException {


        model.addAttribute("action", "duplicate");
        return "syllabus/syllabus-details-form.html";
    }

    @GetMapping("/edit")
    public String getSyllabusDetails(@RequestParam("syllabus") Long syllabusId,
                                     Model model) throws JsonProcessingException {


        model.addAttribute("action", "edit");
        return "syllabus/syllabus-details-form.html";
    }

    @GetMapping("/create")
    public String getNewSyllabus(Model model) throws JsonProcessingException {

        model.addAttribute("action", "create");
        return "syllabus/syllabus-details-form.html";
    }

    @GetMapping("/details")
    public ResponseEntity<String> getSyllabusDetails(@RequestParam("syllabus") String syllabusId,
                                                     @RequestParam("actionType") String actionType) throws JsonProcessingException {

        String syllabusDetailsDTO;
        if(syllabusId.equals("null")){
            syllabusDetailsDTO = jsonMapper
                    .writeValueAsString(syllabusDetailsService.showSyllabusDetails(null, actionType));
        } else {
            syllabusDetailsDTO = jsonMapper
                    .writeValueAsString(syllabusDetailsService.showSyllabusDetails(Long.parseLong(syllabusId), actionType));
        }


        return new ResponseEntity<>(syllabusDetailsDTO, HttpStatus.OK);
    }

    @GetMapping("/edit/newObjective")
    public ResponseEntity<String> getNewObjectiveCode(){
        String objectiveCode = learningObjectiveService.genObjectiveCode();
        return new ResponseEntity<>(objectiveCode, HttpStatus.OK);
    }

    @GetMapping("/details/newTopic")
    public ResponseEntity<String> getNewTopicCode(@RequestParam("baseCode") String baseCode){
        String code = syllabusService.getNewTopicCode(baseCode);
        return new ResponseEntity<>(code, HttpStatus.OK);
    }

    @PostMapping("/save")
    public  ResponseEntity<String> saveSyllabus(@Valid @NonNull @RequestBody String jsonData,
                                                             BindingResult bindingResult,
                                                             HttpServletRequest request) throws JsonProcessingException {


        SyllabusDetailsDTO syllabusDetailsDTO = jsonMapper.readValue(jsonData, SyllabusDetailsDTO.class);

//        System.out.println(jsonMapper.writerWithDefaultPrettyPrinter()
//                .writeValueAsString(syllabusDetailsDTO.getGeneralInfoFormDTODetails()));

        String message = syllabusDetailsService.saveSyllabusDetails(syllabusDetailsDTO, request);


        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }



    @DeleteMapping("/edit/objective")
    public ResponseEntity<Map<String, String>> deleteLearningObject(@Valid @NonNull @RequestBody String requestBody,
                                                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
        }
        String[] data = requestBody.split("-");
        System.out.println(Arrays.stream(data).toList());
        syllabusService.removeObjective(Long.parseLong(data[0]), //topicCode
                                        data[1]  //objectCode
                );
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/edit/days")
    public ResponseEntity<String> deleteDay(@Valid @NonNull @RequestBody String idList){
        trainingUnitService.deleteTrainingUnits(idList);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/list")
    public  ResponseEntity<String> deleteSyllabus(@Valid  @NonNull  @RequestBody
                                                  String syllabusId){

        String message = syllabusService.deleteSyllabus(Long.parseLong(syllabusId));
        return new ResponseEntity<>(message, HttpStatus.OK);

    }


    @PostMapping("/import")
    public ResponseEntity<String> importSyllabus(@RequestParam("file") MultipartFile file,
                                                 @RequestParam("encoding") String encoding,
                                                 @RequestParam("separator") String separator,
                                                 @RequestParam("ScanOptionCheckBox") boolean[] ScanOptionCheckBox,
                                                 @RequestParam("radio") String radio,
                                                 HttpServletRequest request) {

        System.out.println(Arrays.toString(ScanOptionCheckBox));

        List<String> messages = syllabusService.importSyllabusFromFile(file, encoding, separator, ScanOptionCheckBox, radio, request);

        if (messages.get(0).startsWith("Success!")) {
            return ResponseEntity.ok(messages.get(0));
        } else {
            String errorResponse = String.join(System.lineSeparator(), messages);
            return ResponseEntity.badRequest().body("There has been an error: \n" + errorResponse);
        }

    }

    @PostMapping("/view")
    public ResponseEntity<String> toggleSyllabusStatus(@Valid @NonNull @RequestBody String syllabusId){

        String message = syllabusService.toggleSyllabusStatus(Long.parseLong(syllabusId));

        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    @GetMapping("/test")
    public String queryTest(Model model) throws JsonProcessingException{
        Long ids = 1L;

        Long result = syllabusService.testQuery(ids);
        model.addAttribute("data", result);
        return "test.html";
    }

    @GetMapping("/details/T000")
    String getT000(Model model) throws IOException {
        Path path = Paths.get("src/main/resources/mockSyllabusDetailsDTO - T000.txt");
        byte[] fileBytes = Files.readAllBytes(path);
        String jsonData = new String(fileBytes, "UTF-8");
        JsonNode jsonNode = jsonMapper.readTree(jsonData);
        model.addAttribute("jsonData", jsonMapper.writeValueAsString(jsonNode));


        return "syllabus/syllabus-details-form.html";
    }

}
