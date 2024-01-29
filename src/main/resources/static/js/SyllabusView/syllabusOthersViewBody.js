function loadOthersViewBody(){
    const syllabusBody = document.getElementById("syllabus-body");
    $("#details-form-header").css("overflow", "visible")
    console.log("hello")
    syllabusBody.innerHTML = '';
    syllabusBody.innerHTML = `
    <div class="syllabus-create-container">
        <div class "syllabus-view-Header" style="width: 100%;">
            <div class="syllabus-view-title" style="border: 0;">
                <div class="progress-frame-0">
                    <div class="progress-frame-name">
                        Syllabus
                    </div>
                    <div id="progress-frame-name-1">
                        <div id="progress-frame-name-1-part-1">
                            <div id="progress-frame-name-1-name">${data.generalInfoFormDTODetails.topicName}</div>
                            <div id="progress-frame-name-1-status" >${data.generalInfoFormDTODetails.status}</div>
                        </div>
                        <div class="dropdown-wrapper">
                            <div class="dropdown">
                                <a onclick="ShowDropDownTab(this)" class="dropbtn">
                                      <img id="progress-frame-name-1-part-2-img" src="img/more_horizontal.svg" alt="">
                                </a>

                                <div class="dropdown-content-box" >
                                    <div class="drop-box-header">
                                        <div class="drop-box-title">Manage</div>
                                    </div>

                                    <div class="drop-box-body">
                                            <a onclick="toEdit()">
                                                <img src="img/create.svg" alt="" style="padding-right: 10px;">
                                                <span>Edit syllabus</span>
                                            </a>

                                            <a onclick="toDuplicate()" sec:authorize="hasAnyAuthority('SYLLABUS_FULL_ACCESS', 'SYLLABUS_CREATE')">
                                                <img src="img/duplicate_gray.svg" alt="" style="padding-right: 10px;">
                                                <span>Duplicate syllabus</span>
                                            </a>

                                            <a id="de-activate-syllabus-btn" onclick="toggleSyllabusStatus('${data.generalInfoFormDTODetails.syllabusId}')">
                                                <img src="img/visibility_off.svg" alt="" style="padding-right: 10px;">
                                                <span>De-activate syllabus</span>
                                            </a>

                                            <a id="activate-syllabus-btn" onclick="toggleSyllabusStatus('${data.generalInfoFormDTODetails.syllabusId}')">
                                                <img src="img/visibility2.svg" alt="" style="padding-right: 10px;">
                                                <span>Activate syllabus</span>
                                            </a>

                                            <a onclick="deleteSyllabus('${data.generalInfoFormDTODetails.syllabusId}')">
                                                <img src="img/delete_gray.svg" alt="" style="padding-right: 10px;">
                                                <span>Delete</span>
                                            </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="progress-frame-name-2">
                        <div id="progress-frame-name-2-name">
                            <span>${data.generalInfoFormDTODetails.topicCode}<span>
                            <label for="version-selector">version</label>
                            <select id="version-selector" style="border-radius:11px;">
                                <option value="" disabled selected hidden>${data.generalInfoFormDTODetails.version}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-line" style="border-bottom:1px solid var(--Main, #2D3748); margin-top:70px;"></div>
            <div id="program-meta-data">
                <div id="program-meta-data-line-2">
                    <div id="small-normal-inter-font">Modified on 23/07/2022 by</div><div id="small-normal-bold-font">&nbsp;Warrior Tran</div>
                </div>
            </div>
        </div>


        <div class="syllabus-creation-body">
            <div class="syllabus-creation-body-right">
                <div class="syllabus-name">

                    <div class="syllabus-tab">
                        <div class="syllabus-sub-tab added-tab" onclick="loadGeneralViewBody()">
                            <div class="sub-tab-text">General</div>
                        </div>
                        <div class="syllabus-sub-tab added-tab" onclick="loadOutlineViewBody()">
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
                                                    <input id="Quiz" type="text" class="short-round quiz-assessment-scheme" disabled="disabled">
                                                </div>
                                            </form>
                                        </div>
                                        <div class="assessment-scheme-others-content-1-req-text-box">
                                            <div class="normal-text">Assignment*</div>
                                            <form action="" method="">
                                                <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                    <input id="Assignment" type="text" class="short-round assignment-assessment-scheme" disabled="disabled">
                                                </div>
                                            </form>
                                        </div>
                                        <div class="assessment-scheme-others-content-1-req-text-box">
                                            <div class="normal-text">Final*</div>
                                            <form action="" method="">
                                            <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                <input id="Final" type="text" class="short-round final-assessment-scheme" disabled="disabled">
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                    <div class="assessment-scheme-others-content-1-right">
                                        <div class="assessment-scheme-others-content-1-req-text-box">
                                            <div class="normal-text">Final Theory*</div>
                                                <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                    <input id="FinalTheory" type="text" class="short-round final-theory-assessment-scheme" disabled="disabled">
                                                </div>
                                        </div>
                                        <div class="assessment-scheme-others-content-1-req-text-box">
                                            <div class="normal-text">Final Practice*</div>
                                               <div class="assessment-scheme-others-content-1-text-box normal-text">
                                                    <input id="FinalPractice" type="text" class="short-round final-practice-assessment-scheme" disabled="disabled">
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
                                                <input id="GPA" type="text" class="short-round gpa-assessment-scheme" disabled="disabled">
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
                                            <textarea name="" id="Training" cols="70" rows="6" class="text-area-custom content_info_training" disabled></textarea>
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
                                            <textarea name="" id="Re-test" cols="70" rows="6" class="text-area-custom content_info_retest" disabled></textarea>
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
                                            <textarea name="" id="Marking" cols="70" rows="6" class="text-area-custom content_info_marking" disabled></textarea>
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
                                            <textarea name="" id="WaiverCriteria" cols="70" rows="6" class="text-area-custom content_info_waiver_criteria" disabled></textarea>
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
                                            <textarea name="" id="Others" cols="70" rows="6" class="text-area-custom content_info_others" disabled></textarea>
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
    </div>
    `;
     $("#Name-text-box").text(data.generalInfoFormDTODetails.topicName);
     $("#code-text-box").text(data.generalInfoFormDTODetails.topicCode);
     $("#version-text-box").text(data.generalInfoFormDTODetails.version);


    const time_allocation_percent = time_allocation_calculation()
    show_time_allocation_percent(time_allocation_percent[0],time_allocation_percent[1],time_allocation_percent[2],time_allocation_percent[3],time_allocation_percent[4], time_allocation_percent[5])
    circle(time_allocation_percent[0],time_allocation_percent[1],time_allocation_percent[2],time_allocation_percent[3],time_allocation_percent[4], time_allocation_percent[5])




     $(".quiz-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[0] + "%")
         .on("change", function(){
             data.syllabusOtherDTODetails.assessmentSchemeList[0] = parseInt($(".quiz-assessment-scheme").val());

             $(".quiz-assessment-scheme").val($(".quiz-assessment-scheme").val());
         })
     $(".assignment-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[1] + "%")
         .on("change", function(){
             data.syllabusOtherDTODetails.assessmentSchemeList[1] =  parseInt($(".assignment-assessment-scheme").val());
             $(".assignment-assessment-scheme").val($(".assignment-assessment-scheme").val());
         })
     $(".final-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[2] + "%")
         .on("change", function(){
             data.syllabusOtherDTODetails.assessmentSchemeList[2] = parseInt($(".final-assessment-scheme").val());
             $(".final-assessment-scheme").val($(".final-assessment-scheme").val());
         })
     $(".final-theory-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[3] + "%")
         .on("change", function(){
             data.syllabusOtherDTODetails.assessmentSchemeList[3] = parseInt($(".final-theory-assessment-scheme").val());
             $(".final-theory-assessment-scheme").val($(".final-theory-assessment-scheme").val());
         })
     $(".final-practice-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[4] + "%")
         .on("change", function(){
             data.syllabusOtherDTODetails.assessmentSchemeList[4] = parseInt($(".final-practice-assessment-scheme").val());
             $(".final-practice-assessment-scheme").val($(".final-practice-assessment-scheme").val());
         })
     $(".gpa-assessment-scheme").val(data.syllabusOtherDTODetails.assessmentSchemeList[5] + "%")
         .on("change", function(){
             data.syllabusOtherDTODetails.assessmentSchemeList[5] = parseInt($(".gpa-assessment-scheme").val());
             $(".gpa-assessment-scheme").val($(".gpa-assessment-scheme").val());
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
             console.log('Total of all assessment is not 100%. Please check again.')
         }
         else if(checkTotal2() == 1){
             console.log('Total of all assessment is not 100%. Please check again.')
         }
         else if(checkGPA() == 1){
             console.log('Total of all assessment is not 100%. Please check again.')
         }
         else{
             console.log(data);
         }

     })

     $(".saving-button .next").on("click", function(){
         if(checkTotal1() == 1){
             console.log('Total of all assessment is not 100%. Please check again.')
         }
         else if(checkTotal2() == 1){
             console.log('Total of all assessment is not 100%. Please check again.')
         }
         else if(checkGPA() == 1){
             console.log('Total of all assessment is not 100%. Please check again.')
         }
         else{
             console.log(data);
         }

     })

     $(".cancel").on("click", function(){
         console.log(data);
     });


     $(".next").on("click", function(){
//       checkNullTextInput();
         saveSyllabus(data, "Active", redirectToSyllabusList);
     });

     $(".previous-button").on("click", loadOutlineViewBody);

     $(".save-as-draft").on("click", function(){
           saveSyllabus(data, "Draft", redirectToSyllabusList);
     });

      if (window.location.pathname.split("/").includes("duplicate")){
              $(".next").toggle();
          }

    loadVersionSelector();

    if (data.generalInfoFormDTODetails.status=="Active"){
        $("#activate-syllabus-btn").hide();
    }else {
        $("#de-activate-syllabus-btn").hide();
    }

    $(".dropdown-content-box").hide();
}

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

$("#assessment-scheme-others").on("change", function(){
    const idList = ["Quiz", "Assignment", "Final", "FinalTheory", "FinalPractice", "GPA"];
    checkNullTextInput1(idList);
});

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

function loadVersionSelector(){

    let versions = versionList.replace(/[[|\]]/g,'').replace(" ", '').split(",");

    versions.forEach(version => {
        let option = $(document.createElement("option"));
        option.attr("value", version);
        option.text(version);
        $("#version-selector").append(option);
    });

    console.log(versionList);
    console.log(data.generalInfoFormDTODetails.version);
    $("#version-selector").val(data.generalInfoFormDTODetails.version);

    $("#version-selector").on("change", function(){
        toSyllabusByVersion($("#version-selector").val(), data.generalInfoFormDTODetails.topicCode);
    });
}