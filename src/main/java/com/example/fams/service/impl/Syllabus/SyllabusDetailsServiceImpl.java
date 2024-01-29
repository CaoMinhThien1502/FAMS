package com.example.fams.service.impl.Syllabus;

import com.example.fams.dto.Syllabus.syllabusCreation.*;
import com.example.fams.mapper.Syllabus.*;
import com.example.fams.models.syllabus.LearningObjective;
import com.example.fams.models.syllabus.Syllabus;
import com.example.fams.models.syllabus.SyllabusObjective;
import com.example.fams.models.training.TrainingContent;
import com.example.fams.models.training.TrainingUnit;
import com.example.fams.repositories.syllabus.LearningObjectiveRepository;
import com.example.fams.repositories.syllabus.SyllabusObjectiveRepository;
import com.example.fams.repositories.syllabus.SyllabusRepository;
import com.example.fams.repositories.training.TrainingContentRepository;
import com.example.fams.repositories.training.TrainingUnitRepository;
import com.example.fams.security.token.JwtTokenProvider;
import com.example.fams.service.itf.SyllabusDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.QueryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SyllabusDetailsServiceImpl implements SyllabusDetailsService {

    @Autowired
    JwtTokenProvider tokenProvider;
    @Autowired
    SyllabusRepository syllabusRepository;
    @Autowired
    TrainingUnitRepository trainingUnitRepository;
    @Autowired
    TrainingContentRepository trainingContentRepository;
    @Autowired
    SyllabusObjectiveRepository syllabusObjectiveRepository;
    @Autowired
    LearningObjectiveRepository learningObjectiveRepository;

    @Autowired
    GeneralInfoMapper generalInfoMapper;

    @Autowired
    TrainingUnitMapper trainingUnitMapper;

    @Autowired
    TrainingContentMapper trainingContentMapper;

    @Autowired
    SyllabusOtherMapper syllabusOtherMapper;

    @Override
    @Transactional
    public SyllabusDetailsDTO showSyllabusDetails(Long syllabusId, String actionType){
        SyllabusDetailsDTO detailsDTO;
        if (syllabusId != null){
            Optional<Syllabus> syllabus = syllabusRepository.findById(syllabusId);

            if (syllabus.isEmpty()){
                throw new QueryException("this syllabus does not exist in the data base!!!");
            }


            // General
            GeneralInfoFormDTO generalInfoFormDTODetails = getGeneralInfoFormDTODetails(syllabus.get(), actionType);

            // Outline
            List<TrainingUnitDTO> trainingUnitDTOListDetails = getTrainingUnitDTOListDetails(syllabusId);

            // Others
            SyllabusOtherDTO syllabusOtherDTODetails = getSyllabusOtherDTODetails(syllabus.get());

            detailsDTO = new SyllabusDetailsDTO(
                    null, actionType,
                    generalInfoFormDTODetails,
                    trainingUnitDTOListDetails,
                    syllabusOtherDTODetails);
        } else {
            detailsDTO = getEmptyDetailsDTO();
            detailsDTO.setPublicStatus(null);
            detailsDTO.setActionType(actionType);
        }

        return detailsDTO;
       }
    @Override
    @Transactional
    public String saveSyllabusDetails(SyllabusDetailsDTO syllabusDetailsDTO,
                                    HttpServletRequest request) {
        String userName = tokenProvider.getUserNameFromJWT(request);
        String saveMode = syllabusDetailsDTO.getActionType();
        String saveStatus = syllabusDetailsDTO.getGeneralInfoFormDTODetails().getStatus();
        Syllabus newSyllabus = null;
        if (saveMode.equals("edit")&&!saveStatus.equals("Draft")){
            newSyllabus = updateSyllabus(userName, saveMode,
                    syllabusDetailsDTO.getPublicStatus(),
                    syllabusDetailsDTO.getGeneralInfoFormDTODetails(),
                    syllabusDetailsDTO.getSyllabusOtherDTODetails());
        }else {
            newSyllabus = saveSyllabus(userName, saveMode,
                    syllabusDetailsDTO.getPublicStatus(),
                    syllabusDetailsDTO.getGeneralInfoFormDTODetails(),
                    syllabusDetailsDTO.getSyllabusOtherDTODetails());
        }

        saveLearningObjective(newSyllabus,syllabusDetailsDTO.getGeneralInfoFormDTODetails());

        saveTrainingUnit(newSyllabus, saveMode,
                syllabusDetailsDTO.getTrainingUnitDTOListDetails());

        System.out.println("saved");

        return "save successfully";
    }
    //General DTO Mapping

    private GeneralInfoFormDTO getGeneralInfoFormDTODetails(Syllabus syllabus, String actionType){
        String topicCode = syllabus.getTopicCode();

        Optional<Set<LearningObjective>> learningObjectiveSet = syllabusObjectiveRepository.getLearningsObjectiveByTopicCode(topicCode);

        GeneralInfoFormDTO generalInfoFormDTO = new GeneralInfoFormDTO();

        generalInfoMapper.updateDTOFromSyllabus(syllabus,generalInfoFormDTO);

        generalInfoFormDTO.getTechnicalGroup().replace('"', '\"');

        if (actionType.equals("edit")){
            String newVersionNum = updateEditVersion(syllabus.getTopicCode(),
                                                     syllabus.getVersion());
            syllabus.setVersion(newVersionNum);
        }


        if (actionType.equals("duplicate")){
            final String newVersionNum = updateDuplicateVersion(syllabus.getTopicCode(),
                                                                syllabus.getVersion());
            generalInfoFormDTO.setVersion(newVersionNum);
        }

        if (learningObjectiveSet.isEmpty()){
            throw new QueryException(" Learning objective query is empty");
        }
        else{
            generalInfoFormDTO.setLearningObjectivesList(learningObjectiveSet.get());
        }
        return generalInfoFormDTO;
    }

    //Outline DTO Mapping
    private List<TrainingUnitDTO> getTrainingUnitDTOListDetails(Long syllabusId){
        List<TrainingUnitDTO> trainingUnitDTOList = new ArrayList<>();
        Optional<List<TrainingUnit>> TuQuery = trainingUnitRepository.findAllByTopicCode(syllabusId);

        if (TuQuery.isEmpty()){
            throw new QueryException("trainingUnitRepository.findAllByTopicCode query is empty");
        }
        for(TrainingUnit eachUnit : TuQuery.get()){
            TrainingUnitDTO trainingUnitDTO = new TrainingUnitDTO();
            trainingUnitMapper.updateDTOFromTrainingUnit(eachUnit, trainingUnitDTO);
            trainingUnitDTOList.add(trainingUnitDTO);


            trainingUnitDTO.setTrainingContentDTOList(new ArrayList<>());
            Optional<List<TrainingContent>> TcQuery = trainingContentRepository.findAllByUnitCode(eachUnit.getUnitCode());

            if (TcQuery.isEmpty()){
                throw new QueryException("trainingUnitRepository.findAllByTopicCode query is empty");
            }
            for(TrainingContent eachContent : TcQuery.get()){
                TrainingContentDTO trainingContentDTO = new TrainingContentDTO();
                trainingContentMapper.updateDTOFromTrainingContent(eachContent, trainingContentDTO);
                trainingUnitDTO.getTrainingContentDTOList().add(trainingContentDTO);
            }
        }
        return trainingUnitDTOList;
    }

    //Others DTO Details

    private SyllabusOtherDTO getSyllabusOtherDTODetails(Syllabus syllabus){
        // Others
        SyllabusOtherDTO otherDTO = new SyllabusOtherDTO();
        syllabusOtherMapper.updateDTOFromSyllabus(syllabus, otherDTO);
        List<Integer> assessmentSchemeList = Arrays.stream(syllabus.getAssessmentScheme()
                                                    .split(","))
                                                    .map(s -> Integer.parseInt(s.trim())).toList();
        otherDTO.setAssessmentSchemeList(assessmentSchemeList);
        return otherDTO;
    }


    private Syllabus updateSyllabus(String currentUserName,
                           String saveMode,
                           String publicStatus,
                           GeneralInfoFormDTO generalInfoFormDTO,
                           SyllabusOtherDTO syllabusOtherDTO) {
        Syllabus syllabus;
        Optional<Syllabus> syllabusQuery = syllabusRepository.findById(generalInfoFormDTO.getSyllabusId());
        if (syllabusQuery.isPresent()) {
            syllabus = syllabusQuery.get();

            generalInfoMapper.updateSyllabusFromDTO(generalInfoFormDTO, syllabus);
            syllabusOtherMapper.updateSyllabusFromDTO(syllabusOtherDTO, syllabus);


            //add Assessment Scheme
            String listString = syllabusOtherDTO.getAssessmentSchemeList()
                    .stream()
                    .map(Object::toString)
                    .collect(Collectors.joining(", "));
            syllabus.setAssessmentScheme(listString);

            syllabusRepository.saveAndFlush(syllabus);

            return syllabus;
        }else {
            throw new QueryException("this syllabus does not exist or is public");
        }


    }

    private Syllabus saveSyllabus(String currentUserName,
                                  String saveMode,
                                  String publicStatus,
                                  GeneralInfoFormDTO generalInfoFormDTO,
                                  SyllabusOtherDTO syllabusOtherDTO){
        /*map the data in the DTOs to a syllabus if the id in DTO is the same
         then it will be updated in the database */

        Syllabus syllabus = new Syllabus();

        System.out.println(generalInfoFormDTO.getStatus());
        generalInfoMapper.updateSyllabusFromDTO(generalInfoFormDTO, syllabus);
        syllabusOtherMapper.updateSyllabusFromDTO(syllabusOtherDTO, syllabus);


        syllabus.setPublicStatus(publicStatus);

        //get new id number on duplicate and create

        Long newId = syllabusRepository.findMaxId()+1L;
        syllabus.setSyllabusId(newId);


        //set the creator user's name and creation date of the new syllabus
        LocalDate formattedDate = LocalDate.now();

        syllabus.setCreateBy(currentUserName);
        syllabus.setCreateDate(formattedDate);

        syllabus.setModifiedBy(currentUserName);
        syllabus.setModifiedDate(formattedDate);

        //add Assessment Scheme
        String listString = syllabusOtherDTO.getAssessmentSchemeList()
                .stream()
                .map(Object::toString)
                .collect(Collectors.joining(", "));
        syllabus.setAssessmentScheme(listString);

        //remove later
        syllabus.setTopicOutline("");
        syllabus.setTrainingMaterials("");


        syllabusRepository.saveAndFlush(syllabus);
        return syllabus;

    }


    private void saveLearningObjective(Syllabus newSyllabus,
                                       GeneralInfoFormDTO generalInfoFormDTO){

        generalInfoFormDTO.getLearningObjectivesList()
                        .forEach(learningObjective -> {

                            Set<SyllabusObjective> syllabusObjectiveSet = new HashSet<>();
                            syllabusObjectiveSet.add( new SyllabusObjective(newSyllabus, learningObjective));

                            learningObjective.setSyllabusObjective(syllabusObjectiveSet);

                            learningObjectiveRepository.saveAndFlush(learningObjective);

                            syllabusObjectiveRepository.saveAllAndFlush(syllabusObjectiveSet);

                        });

    }

    private void saveTrainingUnit(Syllabus newSyllabus,
                                  String saveMode,
                                  List<TrainingUnitDTO> trainingUnitDTOList) {


        trainingUnitDTOList.forEach( unitDTO -> {
            TrainingUnit newUnit = new TrainingUnit();
            trainingUnitMapper.updateTrainingUnitFromDTO(unitDTO, newUnit);

            if (newUnit.getUnitCode()==null||saveMode.equals("duplicate")||newSyllabus.getStatus().equals("Draft")){
                String code = genUnitCode();
                newUnit.setUnitCode(code);
            }

            newUnit.setTrainingContents(new HashSet<>());
            newUnit.setSyllabusId(newSyllabus);


            unitDTO.getTrainingContentDTOList().forEach ( contentDTO -> {
                TrainingContent newContent = new TrainingContent();
                newContent.setNote("");
                trainingContentMapper.updateTrainingContentFromDTO(contentDTO, newContent);
                if (saveMode.equals("duplicate")||newSyllabus.getStatus().equals("Draft")){
                    newContent.setId(null);
                }
                newContent.setUnitCode(newUnit);
                newUnit.getTrainingContents().add(newContent);
            });

            trainingUnitRepository.saveAndFlush(newUnit);
            trainingContentRepository.saveAllAndFlush(newUnit.getTrainingContents());
        });
    }


    private String updateDuplicateVersion(String topicCode, String syllabusVersion){
        //get the max draft version base on topicCode and the other two version number and increase it by 1
        //version format example: 1.0.0 -> 1.0.1

        String[] subVersionNum = syllabusVersion.split("[.]");
        String subVersion = String.join(".", subVersionNum[0], subVersionNum[1]);
        String maxDraftVersion = syllabusRepository.findMaxSubVersion(topicCode, subVersion);


        String[] newVersionNumbers = maxDraftVersion.split("[.]");
        newVersionNumbers[2] = String.valueOf(
                Integer.parseInt(newVersionNumbers[2])+1
        );


        return String.join(".",newVersionNumbers);
    }


    private String updateEditVersion(String topicCode, String syllabusVersion){
        //get the max draft version base on topicCode and the first version number then increase it by 1
        //version format example: 1.0.0 -> 1.1.0

        String[] subVersionNum = syllabusVersion.split("[.]");

        String maxEditVersion = syllabusRepository.findMaxSubVersion(topicCode, subVersionNum[0]+'.');


        String[] newVersionNumbers = maxEditVersion.split("[.]");
        newVersionNumbers[1] = String.valueOf(
                Integer.parseInt(newVersionNumbers[1])+1
        );


        return String.join(".",newVersionNumbers);
    }

    private SyllabusDetailsDTO getEmptyDetailsDTO(){
        SyllabusDetailsDTO detailsDTO = new SyllabusDetailsDTO();

        // General

        GeneralInfoFormDTO generalInfoFormDTODetails = new GeneralInfoFormDTO();
        generalInfoFormDTODetails.setLearningObjectivesList(new HashSet<>());
        generalInfoFormDTODetails.setVersion("1.0.0");
        generalInfoFormDTODetails.setTopicCode("NLP");
        generalInfoFormDTODetails.setTopicName("New syllabus");
        generalInfoFormDTODetails.setPriority("LOW");

        generalInfoFormDTODetails.setTrainingAudience(0);
        generalInfoFormDTODetails.setTechnicalGroup("Technical Group B");
        generalInfoFormDTODetails.setPriority("LOW");


        // Outline
        List<TrainingUnitDTO> trainingUnitDTOListDetails = new ArrayList<>();

        // Others
        SyllabusOtherDTO syllabusOtherDTODetails = new SyllabusOtherDTO();
        syllabusOtherDTODetails.setAssessmentSchemeList(
                new ArrayList<>(){{add(0);add(0);add(0);
                                add(0);add(0);add(0);}});


        detailsDTO.setGeneralInfoFormDTODetails(generalInfoFormDTODetails);
        detailsDTO.setTrainingUnitDTOListDetails(trainingUnitDTOListDetails);
        detailsDTO.setSyllabusOtherDTODetails(syllabusOtherDTODetails);

        return detailsDTO;
    }


    private String genUnitCode() {
        //tạo topic code từ objective type
        StringBuilder codeBuilder = new StringBuilder().append('U');
        codeBuilder.append(LocalDate.now().getYear()+1);
        codeBuilder.append(LocalDate.now().getMonthValue()+12);
        codeBuilder.append(LocalDate.now().getDayOfMonth()+32);
        for (int i =0; i<5; i++){
            int number = (int)(Math.random()*9);
            codeBuilder.append(number);
        }
        String code = codeBuilder.toString();
        if (trainingUnitRepository.existsById(code)){
            code = genUnitCode();
        } else {
            return code;
        }
        return code;
    }



    @Transactional
    public void validation(List<Integer> syllabusAssessmentSchemeList) {
        if (syllabusAssessmentSchemeList.get(0)== null) {
            throw new IllegalStateException("Quiz is required. ");
        } else if (syllabusAssessmentSchemeList.get(1) == null) {
            throw new IllegalStateException("Assignment is required. ");
        } else if (syllabusAssessmentSchemeList.get(2) == null) {
            throw new IllegalStateException("Final is required. ");
        } else if (syllabusAssessmentSchemeList.get(3) == null) {
            throw new IllegalStateException("Final Theory is required. ");
        } else if (syllabusAssessmentSchemeList.get(4) == null) {
            throw new IllegalStateException("Final Practice is required. ");
        } else if (syllabusAssessmentSchemeList.get(5) == null) {
            throw new IllegalStateException("GPA is required. ");
        } else if (syllabusAssessmentSchemeList.get(0)+syllabusAssessmentSchemeList.get(1)+syllabusAssessmentSchemeList.get(2) != 100) {
            throw new IllegalStateException("Total of all assessment is not 100%. Please check again.");
        } else if (syllabusAssessmentSchemeList.get(3) + syllabusAssessmentSchemeList.get(4)!= 100) {
            throw new IllegalStateException("Total of all assessment is not 100%. Please check again.");
        }
    }
}
