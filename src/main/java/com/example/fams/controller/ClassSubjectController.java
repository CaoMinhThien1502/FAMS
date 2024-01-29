package com.example.fams.controller;

import com.example.fams.dto.clazz.*;
import com.example.fams.models.attendee.AttendeeTypes;
import com.example.fams.models.clazz.ClassSubject;
import com.example.fams.models.clazz.ClassUser;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.models.training.TrainingProgram;
import com.example.fams.models.training.TrainingProgramSyllabus;
import com.example.fams.models.training.TrainingUnit;
import com.example.fams.repositories.clazz.ClassSubjectRepository;
import com.example.fams.service.itf.*;
import com.example.fams.utils.ValidatorUtil;
import com.example.fams.utils.exceptions.AlreadyExistException;
import com.example.fams.utils.exceptions.ClassNotFoundException;
import com.example.fams.utils.exceptions.TrainingProgramNotFoundException;
import com.example.fams.utils.exceptions.UserNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
@RequestMapping("/class")
public class ClassSubjectController {

    private static final String NOT_FOUND_VIEW = "404";
    private static final String CLASS_DETAILS_VIEW = "class/details";
    private static final String EDIT_CLASS_VIEW = "class/edit";

    @Autowired
    private ClassSubjectService service;
    @Autowired
    private ClassSubjectRepository repository;
    @Autowired
    private ClassUserService classUserService;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private AttendeeService attendeeService;
    @Autowired
    private AttendeeListService attendeeListService;
    @Autowired
    private UserService userService;
    @Autowired
    private TrainingProgramService trainingProgramService;
    @Autowired
    private SyllabusService syllabusService;
    @Autowired
    private AttendeeTypesService attendeeTypesService;
    @Autowired
    private TrainingUnitService trainingUnitService;

    @PostMapping("/createClass/tooltip")
    String addInfo(ClassSubjectDTO classSubjectDTO, @RequestParam(value = "action") String action, @RequestParam(value = "trainer", required = false) String trainer, @RequestParam(value = "admin", required = false) String admin, @RequestParam(value = "start", required = false) String startDate, @RequestParam(value = "end", required = false) String endDate, @RequestParam(value = "training_program_name", required = false) String tpname, Model model, BindingResult bindingResult, RedirectAttributes ra) {
        model.addAttribute("trainer", trainer);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (startDate != null && endDate != null) {
            classSubjectDTO.setStartDate(LocalDate.parse(startDate, formatter));
            classSubjectDTO.setEndDate(LocalDate.parse(endDate, formatter));
        }
        if (action.equals("Next")) {
            if (!admin.equals("")) {
                model.addAttribute("adminChoice", admin);
            }
            return showAll(classSubjectDTO, tpname, model);
        } else {
            return createClass(classSubjectDTO, trainer, admin, tpname, bindingResult, model, ra);
        }

    }

    @PostMapping("/createClass/tooltip2")
    String addTrainer(ClassSubjectDTO classSubjectDTO, @RequestParam(value = "action") String action, @RequestParam(value = "trainer", required = false) String trainer, @RequestParam(value = "admin", required = false) String admin, @RequestParam(value = "start", required = false) String startDate, @RequestParam(value = "end", required = false) String endDate, @RequestParam(value = "training_program_name", required = false) String tpname, Model model, BindingResult bindingResult, RedirectAttributes ra) {
        model.addAttribute("trainer", trainer);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (startDate != null && endDate != null) {
            classSubjectDTO.setStartDate(LocalDate.parse(startDate, formatter));
            classSubjectDTO.setEndDate(LocalDate.parse(endDate, formatter));
        }
        if (action.equals("Back") || action.equals("Next")) {
            return backOrAttendee(classSubjectDTO, model, action, admin);
        } else {
            return createClass(classSubjectDTO, trainer, admin, tpname, bindingResult, model, ra);
        }

    }

    @PostMapping("/createClass/tool-trip-2")
    String ToolTrip2(ClassSubjectDTO classSubjectDTO, @RequestParam(value = "action") String name, @RequestParam(value = "trainer", required = false) String trainer, @RequestParam(value = "admin", required = false) String admin, @RequestParam(value = "start", required = false) String startDate, @RequestParam(value = "end", required = false) String endDate, @RequestParam(value = "training_program_name", required = false) String tpname, Model model, BindingResult bindingResult, RedirectAttributes ra) {
        model.addAttribute("trainer", trainer);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (startDate != null && endDate != null) {
            classSubjectDTO.setStartDate(LocalDate.parse(startDate, formatter));
            classSubjectDTO.setEndDate(LocalDate.parse(endDate, formatter));
        }
        if (name.equals("Back")) {
            model.addAttribute("syllabus", syllabusService.getAllSyllabusByTrainingProgramName(classSubjectDTO.getTrainingProgram().getName()));
            model.addAttribute("adminChoice", admin);
            model.addAttribute("class", classSubjectDTO);
            model.addAttribute("attendeeTypes", attendeeTypesService.getAttendeeType());
            return "create-class/create-class-tooltip";
        } else if (name.equals("Next")) {
            model.addAttribute("syllabus", syllabusService.getAllSyllabusByTrainingProgramName(classSubjectDTO.getTrainingProgram().getName()));
            model.addAttribute("class", classSubjectDTO);
            model.addAttribute("adminChoice", admin);
            return "create-class/view-training-program";
        } else if (name.equals("Save as draft")) {
            return createClass(classSubjectDTO, trainer, admin, tpname, bindingResult, model, ra);
        }
        return "view-class";
    }

    @PostMapping("/createClass/view-program")
    String ViewProgram(ClassSubjectDTO classSubjectDTO, @RequestParam(value = "action") String action, @RequestParam(value = "trainer", required = false) String trainer, @RequestParam(value = "admin", required = false) String admin, Model model, BindingResult bindingResult, RedirectAttributes ra) {
        model.addAttribute("trainer", trainer);
        if (action.equals("Save")) {
            return createClass(classSubjectDTO, trainer, admin, classSubjectDTO.getTrainingProgram().getName(), bindingResult, model, ra);
        } else if (action.equals("Back")) {
            model.addAttribute("class", classSubjectDTO);
            model.addAttribute("syllabus", syllabusService.getAllSyllabusByTrainingProgramName(classSubjectDTO.getTrainingProgram().getName()));
            model.addAttribute("student", userService.listUserStudent());
            model.addAttribute("adminChoice", admin);
            return "create-class/create-class-attendee-list";
        } else if (action.equals("edit")) {
            model.addAttribute("class", classSubjectDTO);
            model.addAttribute("syllabus", syllabusService.getAllSyllabusByTrainingProgramName(classSubjectDTO.getTrainingProgram().getName()));
            model.addAttribute("student", userService.listUserStudent());
            model.addAttribute("adminChoice", admin);
            model.addAttribute("trainers", userService.listUserTrainer());
            model.addAttribute("location", service.locationCLass());
            List<Syllabus> syllabusList = syllabusService.getAllSyllabusByTrainingProgramName(classSubjectDTO.getTrainingProgram().getName());
            List<TrainingUnit> trainingUnitList = new ArrayList<>();
            for (Syllabus x : syllabusList) {
                List<TrainingUnit> trainingUnitList1 = (List<TrainingUnit>) trainingUnitService.getTrainingUnitByTopicCode(x.getTopicCode());
                for (TrainingUnit y : trainingUnitList1) {
                    trainingUnitList.add(y);
                }
            }
            Set<Integer> day = new HashSet<>();
            for (TrainingUnit x : trainingUnitList) {
                day.add(x.getDayNumber());
            }
            model.addAttribute("trainingUnit", trainingUnitList);
            model.addAttribute("dayNumber", day);
            return "create-class/create-class-add-trainer";
        }
        return "view-class";
    }

    @GetMapping
    String getAllClass(Model model) {
        model.addAttribute("classList", service.getAllClass());
        model.addAttribute("listTrainer", userService.listUserTrainer());
        model.addAttribute("listLocation", service.locationCLass());
        model.addAttribute("listFSU", service.listFSU());
        return "view-class";
    }

    @GetMapping("/getAll")
    @ResponseBody
    List<ClassSubjectSearchDTO> getAllClass() {
        return service.getAllClass();
    }

    @GetMapping("/class-name")
    String showCreate(Model model) {
        model.addAttribute("class", new ClassSubjectDTO());
        return "create-class/create-class-name";
    }

    @PostMapping("/createClass/add-training-program")
    String showTrainingProgram(ClassSubjectDTO classSubjectDTO, Model model, @RequestParam(value = "class-name") String name) {
        classSubjectDTO.setStatus("Planing");
        classSubjectDTO.setClassName(name);
        model.addAttribute("class", classSubjectDTO);
        return "create-class/create-class-training-program";
    }

    @PostMapping("/next-create")
    String showAll(ClassSubjectDTO classSubjectDTO, @RequestParam(value = "training_name", required = false) String name, Model model) {
        if (name != null) {
            TrainingProgram t = trainingProgramService.getToCreateClass(name);
            classSubjectDTO.setTrainingProgram(t);
            classSubjectDTO.setDuration(t.getDuration());
            model.addAttribute("syllabus", syllabusService.getAllSyllabusByTrainingProgramName(name));
        } else {
            model.addAttribute("syllabus", syllabusService.getAllSyllabusByTrainingProgramName(classSubjectDTO.getTrainingProgram().getName()));
        }
        model.addAttribute("class", classSubjectDTO);
        model.addAttribute("listFSU", service.listFSU());
        model.addAttribute("listAdmin", userService.listUserAdmin());
        model.addAttribute("attendeeTypes", attendeeTypesService.getAttendeeType());
        return "create-class/create-class-tooltip";
    }

    @PostMapping("/back-page")
    String backOrAttendee(ClassSubjectDTO classSubjectDTO, Model model, String name, String admin) {
        model.addAttribute("class", classSubjectDTO);
        model.addAttribute("syllabus", syllabusService.getAllSyllabusByTrainingProgramName(classSubjectDTO.getTrainingProgram().getName()));
        model.addAttribute("student", userService.listUserStudent());
        model.addAttribute("adminChoice", admin);
        if (name.equals("Back")) {
            return "create-class/create-class-training-program";
        } else {
            return "create-class/create-class-attendee-list";
        }

    }

    @GetMapping("/test")
    List<ClassSubject> test() {
        return repository.findAll();
    }

    @PostMapping("/create")
    String createClass(@Valid ClassSubjectDTO classSubjectDTO, @RequestParam(value = "trainer", required = false) String trainer, @RequestParam(value = "admin", required = false) String admin, @RequestParam(value = "training_program_name", required = false) String name, BindingResult bindingResult, Model model, RedirectAttributes ra) {
        LocalDate todayLocalDate = LocalDate.now();
        int yearLocalDate = todayLocalDate.getYear();
        int twoLastDigits = yearLocalDate % 100;
        int count = repository.findAll().size();
        if (classSubjectDTO.getLocation() == null) {
            classSubjectDTO.setLocation("unknown");
        }
        if (classSubjectDTO.getFsu() == null) {
            classSubjectDTO.setFsu("unknown");
        }
        LocalTime time1 = LocalTime.of(8, 0);
        LocalTime time2 = LocalTime.of(12, 0);
        LocalTime time3 = LocalTime.of(18, 0);
        if (classSubjectDTO.getTimeFrom() != null) {
            if (classSubjectDTO.getAttendee().getAttendeeType().getAttendeeType().equals("Online fee-fresher")) {
                classSubjectDTO.setClassTime("Online");
            } else {
                if ((classSubjectDTO.getTimeFrom().isAfter(time1) || classSubjectDTO.getTimeFrom().equals(time1)) && classSubjectDTO.getTimeTo().isBefore(time2)) {
                    classSubjectDTO.setClassTime("Morning");
                } else if ((classSubjectDTO.getTimeFrom().isAfter(time2) || classSubjectDTO.getTimeFrom().equals(time2)) && classSubjectDTO.getTimeTo().isBefore(time3)) {
                    classSubjectDTO.setClassTime("Noon");
                } else if (classSubjectDTO.getTimeFrom().isAfter(time3) || classSubjectDTO.getTimeFrom().equals(time3)) {
                    classSubjectDTO.setClassTime("Night");
                }
            }
        }

        classSubjectDTO.setClassCode(classSubjectDTO.getLocation() + "-" + twoLastDigits + "-" + count);
        classSubjectDTO.setCreateBy("Admin");
        if (bindingResult.hasErrors()) {
            model.addAttribute("message", validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return "redirect:/";
        }
        classSubjectDTO.setStatus("Planning");
        if (!name.equals("")) {
            TrainingProgram t = trainingProgramService.getToCreateClass(name);
            classSubjectDTO.setTrainingProgram(t);
            classSubjectDTO.setDuration(t.getDuration());
        } else {
            classSubjectDTO.setTrainingProgram(null);
            classSubjectDTO.setDuration(0);
            classSubjectDTO.setFsu("unknown");
        }
        if (classSubjectDTO.getAttendee() != null) {
            String type = classSubjectDTO.getAttendee().getAttendeeType().getAttendeeType();
            AttendeeTypes attendeeTypes = attendeeTypesService.findAttendeeTypesByAttendeeType(type);
            classSubjectDTO.getAttendee().setAttendeeType(attendeeTypes);
            attendeeService.CreateAttendee(classSubjectDTO.getAttendee());
        }
        classSubjectDTO.setCreateDate(LocalDate.now());
        service.CreateClass(classSubjectDTO);
        classUserService.createClassUser(classSubjectDTO, trainer, admin);
        model.addAttribute("classList", service.getAllClass());
        model.addAttribute("listTrainer", userService.listUserTrainer());
        model.addAttribute("listLocation", service.locationCLass());
        model.addAttribute("listFSU", service.listFSU());
        ra.addFlashAttribute("message", "create class successfully");
        return "redirect:/class";
    }

    @GetMapping("/createBy")
    ResponseEntity<?> searchCreateBy(@RequestParam String name) {
        List<ClassSubjectSearchDTO> list = service.findClassSubjectsByCreateBy("%" + name + "%");
        if (list != null) {
            return ResponseEntity.status(HttpStatus.OK).body(list);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("There's no record matching with your keyword");
        }
    }

    @GetMapping("/search-real-time")
    @ResponseBody
    List<ClassSubjectSearchDTO> search(@RequestParam String text, Model model) {
        List<ClassSubjectSearchDTO> list = service.searchClassSubject(text.toLowerCase());
        model.addAttribute("classList", list);
        if (list != null) {
            return list;
        } else {
            return null;
        }
    }

    @GetMapping("/check-class-name")
    @ResponseBody
    List<ClassSubject> checkDuplicateClassName(String name) {
        List<ClassSubject> list = service.checkDuplicate(name);
        if (list.size() == 0) {
            return null;
        } else {
            return service.checkDuplicate(name);
        }
    }

    @GetMapping("/search/filter")
    String filter(@RequestParam(required = false) String location, @RequestParam(required = false) String status, @RequestParam(required = false) String fsu, @RequestParam(required = false) String trainer, @RequestParam(required = false) String classTime, @RequestParam(required = false) LocalDate startDate, @RequestParam(required = false) LocalDate endDate, Model model) {
        model.addAttribute("listTrainer", userService.listUserTrainer());
        model.addAttribute("listLocation", service.locationCLass());
        model.addAttribute("listFSU", service.listFSU());
        List<ClassSubjectSearchDTO> list = service.filter(location, status, fsu, trainer, classTime, startDate, endDate);
        if (list != null) {
            if (list.size() > 0) {
                model.addAttribute("classList", list);
                model.addAttribute("filter", "done");
                return "view-class";
            } else {
//              model.addAttribute("message","There's no record matching with your keyword");
                return "view-class";
            }
        } else {
//          model.addAttribute("message","There's no record matching with your keyword");
            return "view-class";
        }

    }

    @GetMapping("{code}")
    public String getClassDetails(@PathVariable String code, Model model, HttpServletResponse response) {
        try {
            prepareClassDetails(code, model);
            return CLASS_DETAILS_VIEW;
        } catch (ClassNotFoundException e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return NOT_FOUND_VIEW;
        }
    }

    @GetMapping("{code}/edit")
    public String editClass(@PathVariable String code, Model model, HttpServletResponse response) {
        try {
            prepareClassDetails(code, model);
            model.addAttribute("listAdmin", userService.getListUserAdmin());
            model.addAttribute("listTrainer", userService.getListUserTrainer());
            model.addAttribute("trainingPrograms", trainingProgramService.getAllTrainingProgram());
            return EDIT_CLASS_VIEW;
        } catch (ClassNotFoundException e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return NOT_FOUND_VIEW;
        }
    }

    @PostMapping("{code}/edit")
    public String editClass(@PathVariable String code, @Valid ClassDTO classDTO, BindingResult bindingResult, HttpServletResponse response, RedirectAttributes ra) {
        if (bindingResult.hasErrors()) {
            ra.addFlashAttribute("error", validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return "redirect:/class/" + code + "/edit";
        }
        try {
            ClassSubject updatedClass = service.updateClass(code, classDTO);
            ra.addFlashAttribute("success", "Update class successfully");
            return "redirect:/class/" + updatedClass.getClassCode();
        } catch (AlreadyExistException | TrainingProgramNotFoundException e) {
            ra.addFlashAttribute("error", e.getMessage());
            return "redirect:/class/" + code + "/edit";
        } catch (ClassNotFoundException e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return "redirect:/" + NOT_FOUND_VIEW;
        }
    }

    private void prepareClassDetails(@PathVariable String code, Model model) throws ClassNotFoundException {
        ClassDTO classDTO = service.getByClassCode(code);
        List<ClassUserDTO2> trainers = classUserService.getCLassTrainersByClassId(classDTO.getClassId());
        List<ClassUserDTO2> admins = classUserService.getCLassAdminsByClassId(classDTO.getClassId());

        Comparator<TrainingProgramSyllabus> comparator = Comparator.comparing(TrainingProgramSyllabus::getSequence);

        model.addAttribute("class", classDTO);
        model.addAttribute("trainers", trainers);
        model.addAttribute("admins", admins);
        model.addAttribute("classTotalTime", classDTO.getDuration() * Duration.between(classDTO.getTimeFrom(), classDTO.getTimeTo()).toHours());
        model.addAttribute("comparator", comparator);
    }

    @PostMapping("/createClass/add-trainer")
    String addTrainer(ClassSubjectDTO classSubjectDTO, @RequestParam(value = "trainer", required = false) String trainer, @RequestParam(value = "admin", required = false) String admin, Model model, BindingResult bindingResult) {
        model.addAttribute("class", classSubjectDTO);
        model.addAttribute("syllabus", syllabusService.getAllSyllabusByTrainingProgramName(classSubjectDTO.getTrainingProgram().getName()));
        model.addAttribute("adminChoice", admin);
        model.addAttribute("trainer", trainer);
        return "create-class/view-training-program";
    }

    @GetMapping("/delete/{code}")
    String deleteClass(@PathVariable String code) {
        classUserService.deleteClassUser(classUserService.findClassUsersByClass(code));
        service.deleteClass(code);
        return "redirect:/class";
    }

    @GetMapping("/getByStatus")
    @ResponseBody
    List<ClassSubject> getClassByStatus() {
        return service.getClassByStatus();
    }

    @DeleteMapping("admins/{id}")
    ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        classUserService.deleteById(id);

        return ResponseEntity.status(HttpStatus.OK).body("<turbo-stream action='remove' target='admin-" + id + "'></turbo-stream>");
    }

    @DeleteMapping("trainers/{id}")
    ResponseEntity<?> deleteTrainer(@PathVariable Long id) {
        classUserService.deleteById(id);

        return ResponseEntity.status(HttpStatus.OK).body("<turbo-stream action='remove' target='trainer-" + id + "'></turbo-stream>");
    }

    @PostMapping("admin")
    ResponseEntity<?> addNewAdmin(@RequestBody ClassUserUpdateDTO dto, HttpServletResponse response) {
        try {
            ClassUser classUser = classUserService.addNewClassUser(dto.getClassId(), dto.getUserId(), dto.getUserType());

            response.setHeader("charset", "utf-8");
            response.setHeader("Content-Type", "application/json");

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.set("Content-Type", "application/json");
            responseHeaders.set("charset", "utf-8");

            return ResponseEntity.status(HttpStatus.OK).headers(responseHeaders).body(classUser);

        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
        } catch (ClassNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Class not found");
        }
    }
}


