package com.example.fams.controller;

import com.example.fams.dto.clazz.ClassSubjectDTO;
import com.example.fams.dto.trainingprogram.*;
import com.example.fams.models.training.TrainingProgram;
import com.example.fams.models.training.TrainingProgramSyllabus;
import com.example.fams.service.impl.Training.TrainingProgramSyllabusServiceImpl;
import com.example.fams.service.itf.SyllabusService;
import com.example.fams.service.itf.TrainingProgramService;
import com.example.fams.service.itf.TrainingProgramSyllabusService;
import jakarta.mail.Session;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.server.PathParam;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/trainingprogram")
public class TrainingProgramController {
    @Autowired
    private TrainingProgramService trainingProgramService;
    @Autowired
    private SyllabusService syllabusService;
    @Autowired
    private TrainingProgramSyllabusService trainingProgramSyllabusService;


    @GetMapping
    public String getTrainingProgramView(Model model) {
//         Lấy thông báo từ flash attributes
        String successMessage = (String) model.getAttribute("successMessage");
        String errorMessage = (String) model.getAttribute("errorMessage");

        // Đưa thông báo vào model để hiển thị trong view
        model.addAttribute("successMessage", successMessage);
        model.addAttribute("errorMessage", errorMessage);
        model.addAttribute("successMessage");
        List<TrainingProgramDTO> trainingProgramList = trainingProgramService.getAllTrainingProgram();
        model.addAttribute("trainingProgramList", trainingProgramList);
        return "trainingprogram/trainingProgram";
    }

    @GetMapping("/")
    @ResponseBody
    public List<TrainingProgramDTO> getAllTrainingProgram(Model model) {
        List<TrainingProgramDTO> trainingProgramList = trainingProgramService.getAllTrainingProgram();
        model.addAttribute("trainingProgramList", trainingProgramList);
        return trainingProgramList;
    }

    @GetMapping("/create")
    public String createTrainingProgram(Model model) {
        model.addAttribute("trainingprogram", new TrainingProgram());
        return "trainingprogram/create-training-program";
    }

    @PostMapping("/create-training")
    public ResponseEntity<?> processRegistration(@RequestParam("code") String code,
                                                 @RequestParam("name") String name,
                                                 @RequestParam("generalInf") String generalInf,
                                                 @RequestParam("topicCodeList") List<String> topicCodeList,
                                                 @RequestParam("duration") int duration,
                                                 @RequestParam("user") String user) {
        boolean success = trainingProgramService.createTrainingProgram(code, name, generalInf, topicCodeList, duration, user);
        if (success) {
            return ResponseEntity.ok("Create successfully");
        } else {
            return ResponseEntity.badRequest().body("There has been an error");
        }
    }

    @GetMapping("/search/{name}")
    @ResponseBody
    public List<TrainingProgramDTO> getTrainingProgramByName(@PathVariable String name, Model model) {
        List<TrainingProgramDTO> trainingProgramDTOList = trainingProgramService.getTrainingProgramByName(name);
        model.addAttribute("trainingProgramSearchList", trainingProgramDTOList);
        return trainingProgramDTOList;
    }

    @GetMapping("/search")
    @ResponseBody
    public List<TrainingProgramDTO> getTraingProgramByNameList(@RequestParam List<String> nameList, Model model) {
        Set<String> uniqueNames = new HashSet<>(nameList);
        List<String> uniqueNameList = new ArrayList<>(uniqueNames);
        List<TrainingProgramDTO> trainingProgramDTOList = trainingProgramService.getTrainingProgramByNameList(uniqueNameList);
        model.addAttribute("programSearchResult", trainingProgramDTOList);
        return trainingProgramDTOList;
    }

//    @PostMapping("/duplicate/{trainingProgramCode}")
//    public ResponseEntity<Object> duplicateTrainingProgram(@PathVariable String trainingProgramCode) {
//        TrainingProgramDTO duplicatedTrainingProgram = trainingProgramService.duplicateTrainingProgram(trainingProgramCode);
//        return ResponseEntity.ok().body(duplicatedTrainingProgram);
//    }

    @PostMapping("/duplicate")
    public String duplicateTrainingProgram(@RequestParam String trainingProgramCode, RedirectAttributes redirectAttributes) {
        try {
            TrainingProgramDTO duplicatedProgram = trainingProgramService.duplicateTrainingProgram(trainingProgramCode);
            redirectAttributes.addFlashAttribute("successMessage", "Chương trình đào tạo đã được nhân bản thành công!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Đã xảy ra lỗi trong quá trình nhân bản chương trình đào tạo.");
        }

        return "redirect:/trainingprogram";
    }

//    @PostMapping("/changestatus/{code}/{status}")
//    public ResponseEntity<String> changeProgramStatus(@PathVariable String code, @PathVariable String status) {
//        trainingProgramService.changeTrainingProgramStatus(code, status);
//        return ResponseEntity.ok("Successfully changed training program " + code + " status to " + status);
//    }

    @PostMapping("/updatestatus")
    public ResponseEntity<?> updateProgramStatus(@RequestParam String programCode, @RequestParam String status) {
        trainingProgramService.changeTrainingProgramStatus(programCode, status);
        return new ResponseEntity<>(trainingProgramService.getAllTrainingProgram(), HttpStatus.OK);
    }

    @PostMapping("/changestatus")
    public String changeProgramStatus(@RequestParam String code, @RequestParam String status) {
        trainingProgramService.changeTrainingProgramStatus(code, status);
        return "redirect:/trainingprogram/detail?trainingProgramCode=" + code;
    }

    @PostMapping("/saveupdate")
    public String updateTrainingProgram(@ModelAttribute UpdateTrainingProgramDTO updateDTO, HttpServletRequest request,
                                        RedirectAttributes redirectAttributes) {
        boolean resultMessage = trainingProgramService.updateTrainingProgram(updateDTO.getCode(), updateDTO.getName(), updateDTO.getGeneralInf(), updateDTO.getSelectedTopicCodes(), request);
        trainingProgramSyllabusService.deleteTrainingPrgramSyllabusByTPCode(updateDTO.getCode());
        trainingProgramSyllabusService.getNewSyllabus(updateDTO.getCode(), updateDTO.getSelectedTopicCodes());
        System.out.println("Received topic codes: " + updateDTO.getSelectedTopicCodes());
        if (resultMessage) {
            redirectAttributes.addFlashAttribute("successupdate", "");
            return "redirect:/trainingprogram";
        } else {
            redirectAttributes.addFlashAttribute("errorupdate", "");
            return "redirect:/trainingprogram/update?code=" + updateDTO.getCode();
        }
    }

    @GetMapping("/update")
    public String getUpdateTrainingProgram(@RequestParam String code, Model model) {
        TrainingProgramDTO trainingProgramDTO = trainingProgramService.getTrainingProgram(code);
        model.addAttribute("trainingprogram", trainingProgramDTO);
        List<TrainingProgramSyllabus> trainingProgramSyllabusList = trainingProgramService.getTrainingProgramSyllasbus(code);
        List<SyllabusDetailOfListDTO> syllabusListDTO = trainingProgramService.getSyllabusDTO(trainingProgramSyllabusList);
        model.addAttribute("syllabuslist", syllabusListDTO);
        return "trainingprogram/updateTrainingProgram";
    }


    @GetMapping("/detail")
    public String getTrainingProgramDetail(@RequestParam String trainingProgramCode, Model model) {
        TrainingProgramDTO trainingProgramDTO = trainingProgramService.getTrainingProgram(trainingProgramCode);
        List<TrainingProgramSyllabus> trainingProgramSyllabusList = trainingProgramService.getTrainingProgramSyllasbus(trainingProgramCode);
        List<SyllabusDetailOfListDTO> syllabusListDTO = trainingProgramService.getSyllabusDTO(trainingProgramSyllabusList);
        List<ClassDetailOfListDTO> classSubjectListDTO = trainingProgramService.getClassSubject(trainingProgramCode);
        TrainingProgramDetailDTO detail = trainingProgramService.responseDetailTrainingProgramSyllabus(trainingProgramDTO, syllabusListDTO, classSubjectListDTO);
        model.addAttribute("trainingProgramDetail", detail);
        return "trainingprogram/trainingProgramDetail";
    }

    @PostMapping("/import")
    public ResponseEntity<String> importTrainingProgram(@RequestParam("file") MultipartFile file,
                                                        @RequestParam("encoding") String encoding,
                                                        @RequestParam("separator") String separator,
                                                        @RequestParam("programNameCheckBox") boolean programNameCheckBox,
                                                        @RequestParam("radio") String radio,
                                                        @RequestParam("username") String username) {
        List<String> messages = trainingProgramService.importTrainingProgramFromFile(file, encoding, separator, programNameCheckBox, radio, username);

        if (messages.get(0).startsWith("Success!")) {
            return ResponseEntity.ok(messages.get(0));
        } else {
            String errorResponse = String.join(System.lineSeparator(), messages);
            return ResponseEntity.badRequest().body("There has been an error: \n" + errorResponse);
        }
    }

    @GetMapping("/search-real-time")
    @ResponseBody
    List<TrainingProgramDTO> getByName(@RequestParam String text, Model model) {
        List<TrainingProgramDTO> list = trainingProgramService.getTrainingProgramByName(text);
        model.addAttribute("training", list);
        if (list != null) {
            return list;
        } else {
            return null;
        }
    }

    @GetMapping("/insert-training")
    @ResponseBody
    List<TrainingProgram> getByNames(@RequestParam String text) {
        List<TrainingProgram> list = trainingProgramService.insertTraining(text);
        if (list != null) {
            return list;
        } else {
            return null;
        }
    }

    @GetMapping("/create-training-program")
    public String showFormCreate(Model model) {
        model.addAttribute("trainingprogram", new TrainingProgramDTO());
        return "trainingprogram/create-training-program";
    }

    @PostMapping("/add")
    public String addTrainingProgram(TrainingProgramDTO trainingProgramDTO,
                                     @RequestParam(value = "training-code") String code,
                                     @RequestParam(value = "training-name") String name,
                                     Model model) {
        trainingProgramDTO.setTrainingProgramCode(code);
        trainingProgramDTO.setStatus("INACTIVE");
        trainingProgramDTO.setName(name);
        model.addAttribute("trainingprogram", trainingProgramDTO);
        List<TrainingProgramSyllabus> trainingProgramSyllabusList = trainingProgramService.getTrainingProgramSyllasbus(code);
        List<SyllabusDetailOfListDTO> syllabusListDTO = trainingProgramService.getSyllabusDTO(trainingProgramSyllabusList);
        model.addAttribute("syllabuslist", syllabusListDTO);
        return "trainingprogram/createTrainingProgramDetail";
    }

    @GetMapping("/check-training-name")
    @ResponseBody
    List<TrainingProgram> checkDuplicateTrainingName(String name) {
        List<TrainingProgram> list = trainingProgramService.validateInputName(name);
        if (list.isEmpty()) {
            return null;
        } else {
            return list;
        }
    }

}
