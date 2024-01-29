let alertStatus = 0;

function loadOthersBody(){
    convertMapToObject(daysData)
    const syllabusBody = document.getElementById("syllabus-body");
    $("#details-form-header").css("overflow", "visible")
    console.log("hello")
    syllabusBody.innerHTML = '';
    syllabusBody.innerHTML = `
    <div class="syllabus-create-container">
                <div class="syllabus-creation-header">
                    <div class="progress-frame">
                        <div class="progress-frame-name">
                            Syllabus
                        </div>
                        <div class="progress-bar">
                            <div class="label">
                                <div class="bar space radius-border-bar-start" style="background:#D45B13"></div>
                                <div class="label-name label-name-padding">General</div>
                            </div>
                            <div class="label">
                                <div class="bar" style="background:#D45B13"></div>
                                <div class="label-name label-name-padding">Outline</div>
                            </div>
                            <div class="label">
                                <div class="bar radius-border-bar-end" style="background:#D45B13"><img class="eclipse-img" src="/img/Ellipse offset.svg" alt="" style=""></div>
                                <div class="label-name label-name-padding">Others</div>
                            </div>
                            <div class="label">
                                <div class="bar radius-border-bar-end"></div>
                                <div class="label-name label-name-padding">Done</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="syllabus-creation-body">
                    <div class="syllabus-creation-body-right">
                        <div class="syllabus-name">
                            <div class="basic-info">
                                <div class="syllabus-name-code">
                                    <div class="req-text-box">
                                        <p class="req-text-box-element">Syllabus Name: </p>
                                        <form action="" method="">
                                            <div id="Name-text-box">
                                                <input type="text" class="long-round">
                                            </div>
                                        </form>
                                    </div>
                                    <div class="req-text-box">
                                        <p class="req-text-box-element">Code:</p>
                                        <div id="code-text-box" >NLP</div>
                                    </div>
                                    <div class="req-text-box">
                                        <p class="req-text-box-element">Version:</p>
                                        <form action="" method="">
                                            <div id="version-text-box">
                                                1.0
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="syllabus-tab">
                                <div class="syllabus-sub-tab added-tab" onclick="loadGeneralBody()">
                                    <div class="sub-tab-text">General</div>
                                </div>
                                <div class="syllabus-sub-tab added-tab" onclick="loadOutlineBody()">
                                    <div class="sub-tab-text">Outline</div>
                                </div>
                                <div class="syllabus-sub-tab added-tab" id="syllabus-current-tab">
                                    <div class="sub-tab-text">Others</div>
                                </div>
                            </div>
                        </div>

                        <div class="syllabus-content-others">
                            <div class="syllabus-content-1">
                                <div class="time-allocation-others">
                                    <div class="time-allocation-others-title title-text-white">Time allocation</div>
                                    <div class="time-allocation-others-content">


                                        <div class="time-allocation-circle">
                                            <div class="drawing-circle"></div>
                                        </div>


                                        <div class="others-info">
                                            <div class="info">
                                                <img src="img/bullet1.svg" alt="">
                                                <div class="info-type-1">Assignment Lab</div>
                                                <div class="info-type-2 assignment_lab_percent">(0%)</div>
                                            </div>
                                            <div class="info">
                                                <img src="img/bullet2.svg" alt="">
                                                <div class="info-type-1">Concept/Lecture</div>
                                                <div class="info-type-2 concept_lecture_percent">(0%)</div>
                                            </div>
                                            <div class="info">
                                                <img src="img/bullet3.svg" alt="">
                                                <div class="info-type-1">Guide/Review</div>
                                                <div class="info-type-2 guides_review_percent">(0%)</div>
                                            </div>
                                            <div class="info">
                                                <img src="img/bullet4.svg" alt="">
                                                <div class="info-type-1">Test/Quiz</div>
                                                <div class="info-type-2 test_quiz_percent">(0%)</div>
                                            </div>
                                            <div class="info">
                                                <img src="img/bullet5.svg" alt="">
                                                <div class="info-type-1">Exams</div>
                                                <div class="info-type-2 exam_percent">(0%)</div>
                                            </div>
                                            <div class="info">
                                                <img src="img/bullet6.svg" alt="">
                                                <div class="info-type-1">Seminar/workshop</div>
                                                <div class="info-type-2 seminar_workshop_percent">(0%)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="assessment-scheme-others">
                                    <div class="assessment-scheme-others-title title-text-white">Assessment scheme</div>
                                    <div class="assessment-scheme-others-content">
                                        <div class="assessment-scheme-others-content-1">
                                            <div class="assessment-scheme-others-content-1-left">
                                                <div class="assessment-scheme-others-content-1-req-text-box">
                                                    <div class="normal-text">Quiz*</div>
                                                    <form action="" method="">
                                                        <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                            <input id="Quiz" type="text" class="short-round quiz-assessment-scheme">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="assessment-scheme-others-content-1-req-text-box">
                                                    <div class="normal-text">Assignment*</div>
                                                    <form action="" method="">
                                                        <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                            <input id="Assignment" type="text" class="short-round assignment-assessment-scheme">
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="assessment-scheme-others-content-1-req-text-box">
                                                    <div class="normal-text">Final*</div>
                                                    <form action="" method="">
                                                    <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                        <input id="Final" type="text" class="short-round final-assessment-scheme">
                                                    </div>
                                                </form>
                                                </div>
                                            </div>
                                            <div class="assessment-scheme-others-content-1-right">
                                                <div class="assessment-scheme-others-content-1-req-text-box">
                                                    <div class="normal-text">Final Theory*</div>
                                                        <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                            <input id="FinalTheory" type="text" class="short-round final-theory-assessment-scheme">
                                                        </div>
                                                </div>
                                                <div class="assessment-scheme-others-content-1-req-text-box">
                                                    <div class="normal-text">Final Practice*</div>
                                                       <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                            <input id="FinalPractice" type="text" class="short-round final-practice-assessment-scheme">
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="assessment-scheme-others-content-2">
                                            <div class="title-text-black">Passing criteria</div>
                                            <div class="normal-text assessment-scheme-others-content-2-req-text-box">
                                                <div class="normal-text">GPA*</div>
                                                <form action="" method="">
                                                    <div class="assessment-scheme-others-content-2-text-box normal-text">
                                                        <input id="GPA" type="text" class="short-round gpa-assessment-scheme">
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="syllabus-content-2">
                                <div class="syllabus-content-2-title title-text-white">Training delivery principle</div>
                                <div id="syllabus-content-2-content">
                                    <div class="syllabus-content-2-content-info">
                                        <div class="syllabus-content-2-content-info-training">
                                            <div class="title-text-black syllabus-content-2-content-info-training-frame">
                                                <img class="verified-user-img" src="/img/verified_user.svg" alt="">
                                                Training
                                            </div>
                                            <form action="" method="">
                                                <div class="normal-text">
                                                    <textarea name="" id="Training" cols="70" rows="6" class="text-area-custom content_info_training"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="syllabus-content-2-content-info-re-test">
                                            <div class="title-text-black syllabus-content-2-content-info-frame">
                                                <img class="verified-user-img" src="/img/verified_user.svg" alt="">
                                                Re-test
                                            </div>
                                            <form action="" method="">
                                                <div class="normal-text">
                                                    <textarea name="" id="Re-test" cols="70" rows="6" class="text-area-custom content_info_retest"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="syllabus-content-2-content-info-marking">
                                            <div class="title-text-black syllabus-content-2-content-info-frame">
                                                <img class="verified-user-img" src="/img/verified_user.svg" alt="">
                                                Marking
                                            </div>
                                            <form action="" method="">
                                                <div class="normal-text">
                                                    <textarea name="" id="Marking" cols="70" rows="6" class="text-area-custom content_info_marking"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="syllabus-content-2-content-info-waiver">
                                            <div class="title-text-black syllabus-content-2-content-info-frame">
                                                <img class="verified-user-img" src="/img/verified_user.svg" alt="">
                                                Waiver Criteria
                                            </div>
                                            <form action="" method="">
                                                <div class="normal-text">
                                                    <textarea name="" id="WaiverCriteria" cols="70" rows="6" class="text-area-custom content_info_waiver_criteria"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="syllabus-content-2-content-info-others">
                                            <div class="title-text-black syllabus-content-2-content-info-frame">
                                                <img class="verified-user-img" src="/img/verified_user.svg" alt="">
                                                Others
                                            </div>
                                            <form action="" method="">
                                                <div class="normal-text">
                                                    <textarea name="" id="Others" cols="70" rows="6" class="text-area-custom content_info_others"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="syllabus-creation-body-left"></div>
                </div>
                <div class="syllabus-creation-footer-previous">
                    <div class="previous-box">
                        <div class="previous-button">Previous</div>
                    </div>
                    <div class="saving-button">
                        <div class="cancel">Cancel</div>
                        <div class="save-as-draft">Save as draft</div>
                        <div class="next">Save</div>
                    </div>
                </div>
    </div>
    `;
     $("#Name-text-box").text(data.generalInfoFormDTODetails.topicName);
     $("#code-text-box").text(data.generalInfoFormDTODetails.topicCode);
     $("#version-text-box").text(data.generalInfoFormDTODetails.version);


    const time_allocation_percent = time_allocation_calculation()
    show_time_allocation_percent(time_allocation_percent[0],time_allocation_percent[1],time_allocation_percent[2],time_allocation_percent[3],time_allocation_percent[4], time_allocation_percent[5])
    circle(time_allocation_percent[0],time_allocation_percent[1],time_allocation_percent[2],time_allocation_percent[3],time_allocation_percent[4], time_allocation_percent[5])


    $("#assessment-scheme-others").on("change", function(){
        const idList = ["Quiz", "Assignment", "Final", "FinalTheory", "FinalPractice", "GPA"];
        checkNullTextInput1(idList);
    });

    updateTopicCode();

    function checkNullTextInput1(idList){
        flag = 0;
        for(const id of idList){
            const textInput = document.getElementById(id);
                    if(!document.getElementById("para")){
                        const para = document.createElement("dialog");
                        para.appendChild(document.createTextNode("Missing value for Assessment Scheme !"));
                        para.id = "para";
                        para.setAttribute("class", "custom-dialog-alert");
                        para.setAttribute("style", "left: 15px; bottom: 10px; font-size: 16px;");
                        document.getElementById("assessment-scheme-others").appendChild(para);
                        document.getElementById("assessment-scheme-others").setAttribute("style", "position: relative;");
                    }
                    if(!(textInput.value)){
            ///             para.open = true;
                        $("#"+id).css({
                            "border": "1px solid red"
                        });
                        flag += 1;
                    }
                    else{
                        $("#"+id).css({
                            "border": "1px solid black"
                        });
            ///             document.getElementById("para").open = false;
                    }
        }
        if(flag != 0){
            document.getElementById("para").open = true;
        }else{
            document.getElementById("para").open = false;
        }
    }

    $("#syllabus-content-2-content").on("change", function(){
        const idList = ["Training", "Re-test", "Marking", "WaiverCriteria", "Others"];
        checkNullTextInput2(idList);
    });

    function checkNullTextInput2(idList){
        flag = 0;
        for(const id of idList){
            const textInput = document.getElementById(id);
                    if(!document.getElementById("para2")){
                        const para2 = document.createElement("dialog");
                        para2.appendChild(document.createTextNode("Missing value for Training Delivery Principle !"));
                        para2.id = "para2";
                        para2.setAttribute("class", "custom-dialog-alert");
                        para2.setAttribute("style", "left: 300px; bottom: 10px; font-size: 16px;");
                        document.getElementById("syllabus-content-2-content").appendChild(para2);
                        document.getElementById("syllabus-content-2-content").setAttribute("style", "position: relative;");
                    }
                    if(!(textInput.value)){
            ///             para.open = true;
                        $("#"+id).css({
                            "border": "1px solid red"
                        });
                        flag += 1;
                    }
                    else{
                        $("#"+id).css({
                            "border": "1px solid black"
                        });
            ///             document.getElementById("para").open = false;
                    }
        }
        if(flag != 0){
            document.getElementById("para2").open = true;
        }else{
            document.getElementById("para2").open = false;
        }
    }

     $(".quiz-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[0] + "%")
         .on("change", function(){
             let quizAssessment = $(".quiz-assessment-scheme").val();
             $(".quiz-assessment-scheme").val("");
             if (!quizAssessment.includes('%')){
                quizAssessment+='%';
             }
             data.syllabusOtherDTODetails.assessmentSchemeList[0] = parseInt(quizAssessment);

             $(".quiz-assessment-scheme").val(quizAssessment);
         })
     $(".assignment-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[1] + "%")
         .on("change", function(){
             let assignmentAssessment = $(".assignment-assessment-scheme").val();
             $(".assignment-assessment-scheme").val("");
             if (!assignmentAssessment.includes('%')){
                 assignmentAssessment+='%';
             }
             data.syllabusOtherDTODetails.assessmentSchemeList[1] =  parseInt(assignmentAssessment);

             $(".assignment-assessment-scheme").val(assignmentAssessment);
         })
     $(".final-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[2] + "%")
         .on("change", function(){
              let finalAssessment = $(".final-assessment-scheme").val();
              $(".final-assessment-scheme").val("");
              if (!finalAssessment.includes('%')){
                  finalAssessment+='%';
              }
             data.syllabusOtherDTODetails.assessmentSchemeList[2] = parseInt(finalAssessment);

             $(".final-assessment-scheme").val(finalAssessment);
         })
     $(".final-theory-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[3] + "%")
         .on("change", function(){
              let finalTheoryAssessment = $(".final-theory-assessment-scheme").val();
              $(".final-theory-assessment-scheme").val("");
              if (!finalTheoryAssessment.includes('%')){
                  finalTheoryAssessment+='%';
              }
             data.syllabusOtherDTODetails.assessmentSchemeList[3] = parseInt(finalTheoryAssessment);
             $(".final-theory-assessment-scheme").val(finalTheoryAssessment);
         })
     $(".final-practice-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[4] + "%")
         .on("change", function(){
              let finalPracticeTheoryAssessment = $(".final-practice-assessment-scheme").val();
              $(".final-practice-assessment-scheme").val("");
              if (!finalPracticeTheoryAssessment.includes('%')){
                  finalPracticeTheoryAssessment+='%';
              }
             data.syllabusOtherDTODetails.assessmentSchemeList[4] = parseInt(finalPracticeTheoryAssessment);
             $(".final-practice-assessment-scheme").val(finalPracticeTheoryAssessment);
         })
     $(".gpa-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[5] + "%")
         .on("change", function(){
              let gpaAssessment = $(".gpa-assessment-scheme").val();
              $(".gpa-assessment-scheme").val("");
              if (!gpaAssessment.includes('%')){
                  gpaAssessment+='%';
              }
             data.syllabusOtherDTODetails.assessmentSchemeList[5] = parseInt(gpaAssessment);
             $(".gpa-assessment-scheme").val(gpaAssessment);
         })


     $(".content_info_training").val(data.syllabusOtherDTODetails.trainingPrinciplesTraining)
         .on("change", function(){
             data.syllabusOtherDTODetails.trainingPrinciplesTraining = $(".content_info_training").val();
             $(".content_info_training").val($(".content_info_training").val());
         })
     $(".content_info_retest").val(data.syllabusOtherDTODetails.trainingPrinciplesRetest)
         .on("change", function(){
             data.syllabusOtherDTODetails.trainingPrinciplesRetest = $(".content_info_retest").val();
             $(".content_info_retest").val($(".content_info_retest").val());
         })
     $(".content_info_marking").val(data.syllabusOtherDTODetails.trainingPrinciplesMarking)
         .on("change", function(){
             data.syllabusOtherDTODetails.trainingPrinciplesMarking = $(".content_info_marking").val();
             $(".content_info_marking").val($(".content_info_marking").val());
         })
     $(".content_info_waiver_criteria").val(data.syllabusOtherDTODetails.trainingPrinciplesCriteria)
         .on("change", function(){
             data.syllabusOtherDTODetails.trainingPrinciplesCriteria = $(".content_info_waiver_criteria").val();
             $(".content_info_waiver_criteria").val($(".content_info_waiver_criteria").val());
         })
     $(".content_info_others").val(data.syllabusOtherDTODetails.trainingPrinciplesOthers)
         .on("change", function(){
             data.syllabusOtherDTODetails.trainingPrinciplesOthers = $(".content_info_others").val();
             $(".content_info_others").val($(".content_info_others").val());
         })



     $(".saving-button .save-as-draft").on("click", function(){
         if(checkTotal1() == 1){
            window.alert('Total of all assessment is not 100%. Please check again.');
            alertStatus = 1;
         }
         else if(checkTotal2() == 1){
             window.alert('Total of all assessment is not 100%. Please check again.');
             alertStatus = 1;
         }
         else if(checkGPA() == 1){
             window.alert('Total of all assessment is not 100%. Please check again.');
             alertStatus = 1;
         }
         else{
             alertStatus = 0;
             console.log(data);
         }

     })

     $(".saving-button .next").on("click", function(){
         if(checkTotal1() == 1){
             window.alert('Total of all assessment is not 100%. Please check again.')
             alertStatus = 1;
         }
         else if(checkTotal2() == 1){
             window.alert('Total of all assessment is not 100%. Please check again.')
             alertStatus = 1;
         }
         else if(checkGPA() == 1){
             window.alert('Total of all assessment is not 100%. Please check again.')
             alertStatus = 1;
         }
         else{
             alertStatus = 0;
             console.log(data);
         }

     })

     $(".cancel").on("click", function(){
         console.log(data);
     });

//     redirectToSyllabusList
     $(".next").on("click", function(){
        if (alertStatus==0){
            saveSyllabus(data, "Active", redirectToSyllabusList);
        }

     });

     $(".previous-button").on("click", loadOutlineBody);

     $(".save-as-draft").on("click", function(){
          if (alertStatus==0){
             saveSyllabus(data, "Draft", redirectToSyllabusList);
          }
     });

      if (window.location.pathname.split("/").includes("duplicate")){
              $(".next").toggle();
          }

}

//-------------------------------------------Function-------------------------------------------------------------------

function checkTotal1(){
     total =  parseInt($(".quiz-assessment-scheme").val()) + parseInt($(".assignment-assessment-scheme").val()) + parseInt($(".final-assessment-scheme").val());

         if(total != 100){
             return 1;
         }
     }

function checkTotal2(){
     total =  parseInt($(".final-theory-assessment-scheme").val()) + parseInt($(".final-practice-assessment-scheme").val());

     if(total != 100){
          return 1;
     }
}

function checkGPA(){
     if(parseInt($(".gpa-assessment-scheme").val()) > 100 || parseInt($(".gpa-assessment-scheme").val()) < 0){
         return 1;
     }
}


$(".cancel").on("click", function(){
        console.log(data);
});

