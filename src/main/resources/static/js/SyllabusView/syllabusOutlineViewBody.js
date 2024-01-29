let unitCount=1;
let dayCount=1;
let contentCount=1;
let selectUnit = 0;
let daysData = getDaysData();
function loadOutlineViewBody(){
    let syllabusBody = document.getElementById("syllabus-body");
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
                            <div class="syllabus-sub-tab added-tab" onclick="loadGeneralViewBody(); resetOutlineCount();">
                                <div class="sub-tab-text">General</div>
                            </div>
                            <div class="syllabus-sub-tab" id="syllabus-current-tab">
                                <div class="sub-tab-text">Outline</div>
                            </div>
                            <div class="syllabus-sub-tab added-tab" onclick="loadOthersViewBody(); resetOutlineCount();">
                                <div class="sub-tab-text">Others</div>
                            </div>
                        </div>
                    </div>
                    <div class="syllabus-content">

                        <div id="days" style="width:100%; ">

                        </div>

                    </div>
                </div>

                <div class="syllabus-creation-body-left">
                    <div class="time-allocation-box">
                        <div class="time-allocation">Time allocation</div>
                        <div class="time-allocation-content">


                            <div class="time-allocation-circle">
                                <div class="drawing-circle"></div>
                            </div>


                            <div class="time-allocation-info">
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
                </div>
                </div>
            </div>

            <dialog id="delete-popup">
                <div class="Create-Delete-day">
                        <div class="popup-body">
                            <div class="popup-title">
                                <img src="img/error-report.png">
                                <span>Delete day</span>
                            </div>
                            <hr style="border: 1px solid #000;">
                            <div class="popup-content" id="popup-content">
                                Delete all content of the Day?
                            </div>
                        </div>
                        <div class="popup-btn">
                            <a id="cancel-btn" onclick="$('#delete-popup')[0].close();">cancel</a>
                            <a id="confirm-btn">Confirm</a>
                        </div>
                    </div>
                </div>
            </dialog>

    `;

    loadVersionSelector();

    if (data.generalInfoFormDTODetails.status=="Active"){
        $("#activate-syllabus-btn").hide();
    }else {
        $("#de-activate-syllabus-btn").hide();
    }

    $(".dropdown-content-box").hide();

     mobiscroll.setOptions({
        locale: mobiscroll.localeEn,
        theme: 'windows',
        themeVariant: 'light'
    });

     $(function () {
         // Mobiscroll Select initialization
         $('#training-unit-form-body-output-standard-multiple-select').mobiscroll().select({
             inputElement: document.getElementById('training-unit-form-body-output-standard-multiple-label')
         });
     });
     $(function () {
         // Mobiscroll Select initialization
         $('#training-unit-form-body-delivery-type-multiple-select').mobiscroll().select({
             inputElement: document.getElementById('training-unit-form-body-delivery-type-multiple-label')
         });
     });
     $(function () {
         // Mobiscroll Select initialization
         $('#training-unit-form-body-objectives-multiple-select').mobiscroll().select({
             inputElement: document.getElementById('training-unit-form-body-objectives-multiple-label')
         });
     });

     $("#Name-text-box").text(data.generalInfoFormDTODetails.topicName);
     $("#code-text-box").text(data.generalInfoFormDTODetails.topicCode);
     $("#version-text-box").text(data.generalInfoFormDTODetails.version);

     $(".add_content_btn").on("click", function(){

     });

    $(".training-unit-form-close").on("click", function(){
        $(".training-unit-form").hide();
        $(".syllabus-creation-body-right").show();
        $(".syllabus-creation-body-left").show();
        $(".syllabus-creation-footer-previous").show();
        $(".syllabus-creation-body").css({"background-color":"#FFF","height":"80%"});
    });

    const time_allocation_percent = time_allocation_calculation()
    show_time_allocation_percent(time_allocation_percent[0],time_allocation_percent[1],time_allocation_percent[2],time_allocation_percent[3],time_allocation_percent[4], time_allocation_percent[5])
    circle(time_allocation_percent[0],time_allocation_percent[1],time_allocation_percent[2],time_allocation_percent[3],time_allocation_percent[4], time_allocation_percent[5])

    $(".training-unit-form").toggle();

    $(".cancel").on("click", function(){
            console.log(data);
    });

    $(".next").on("click", loadOthersViewBody);

    $(".previous-button").on("click",loadGeneralViewBody);


     $(".save-as-draft").on("click", function(){
         saveSyllabus(data, "Draft", redirectToSyllabusList);
     });


    loadDays(daysData);
    $(".add_content_btn").remove();

    $(".unit-creation").find(".create-button").remove()

    $(".add-unit").remove();

    $(".day-number img").remove()

    $(".next").on("click", function(){
            let flag = 0;
            for(i=1; i <= contentCount; i++){
                content = $(document.getElementById("content-form-" + i));
                console.log(content.find(".custom-text-box-1").val());
                console.log(content.find(".duration .custom-box").val());
//                console.log(content.find(".status").val());
//                console.log(content.find(".delivery-type .custom-box").val());
                if(content.find(".custom-text-box-1").val() == ""
                || content.find(".duration .custom-box").val() == ""
//                || content.find(".status").val() == ""
//                || content.find(".delivery-type .custom-box").val() == ""
                ){
                    alert("Missing value !")
                }
            }
            updateTrainingUnitDTOList(daysData);
    });

    $('.custom-text-box-1').prop('disabled', 'true');
    $('.custom-box').prop('disabled', 'true');
    $('.check-box').prop('disabled', 'true');

}



//--------------------------------------------Load form function---------------------------------------------------------
function loadDays(daysData){
    let dayList = $("#days");
    let DayFrag = $(document.createDocumentFragment());

    console.log(daysData);

    daysData.forEach(function(unitsData, day){
        //each frag contain the data of that day
        let thisDayForm = $(document.createElement("div"));
        thisDayForm[0].id = "day-form-" + dayCount;
        thisDayForm[0].innerHTML += dayForm;

        DayFrag.append(thisDayForm);
        let FormIdSelector = "#" + thisDayForm[0].id;

        let unitsId = "unit-list-" + unitCount;
        DayFrag.find(FormIdSelector)
                    .find(".unit-list")[0].id = unitsId;
        loadUnits(DayFrag, unitsId, dayCount, unitsData);

        DayFrag.find(FormIdSelector)
            .find(".add-unit-btn")
            .on("click", function(){
                    addUnitCreation(unitsId, dayCount);
            });

        DayFrag.find(FormIdSelector)
            .find('.day-title').text("Day " + dayCount);

        dayCount++;
        addDayCollapse(DayFrag, FormIdSelector);
//        addDayDelete(DayFrag, FormIdSelector);
    });

    dayList.append(DayFrag);

}

function loadUnits(DayFrag, unitsId, currentDay, unitsData){
     let unitsSelector = "#"+unitsId;
     unitsData.forEach(unit =>{

        //create an empty form
        let unitFrag = $(document.createDocumentFragment());
        let unitForm = $(document.createElement("div"));
        let formId = "unit-form-" + unitCount;
        let formSelector = "#"+formId;

        unitForm.addClass("create-unit");
        unitForm[0].id = formId;
        unitForm[0].innerHTML += unitContentForm;

        unitFrag.append(unitForm);

        //load data in
        unitFrag.find(".unit-code div").text("Unit "+unit.unitNumber);
        unitFrag.find(".unit-name .name").text(unit.unitName);

        $(unitFrag).find(".create-button").on("click", function(){
            editUnitName(formSelector, unit);
        });

        $(unitFrag).find(".dropdown-icon img").on("click", function(){
            $(formSelector).find(".content-list").slideToggle();
        });

        loadContent(unitFrag, unit);
        unitFrag.find('.add_content_btn')
                .on("click", function () {
            addContentForm(formId);
      });


        DayFrag.find(unitsSelector).append(unitFrag);
        unitCount++;
     });


}

function loadObjectivesCode(){
    let objectivesList = $(document.createDocumentFragment());
    data.generalInfoFormDTODetails.learningObjectivesList.forEach(function(Objective){
        let objectiveOption = $(document.createElement("option"));
        objectiveOption.prop("value", Objective.code);
        objectiveOption.append(Objective.code);
        objectivesList.append(objectiveOption);
    })

    return objectivesList
}

function loadContent(unitFrag, unit){
    let contentList = $(document.createDocumentFragment());
    unit.trainingContentDTOList
        .forEach(trainContent => {

                let contentForm = $(document.createElement("div"));
                contentForm.addClass("input-content content-form");
                let formId = "content-form-" + contentCount;
                contentForm[0].id = formId;
                contentForm[0].innerHTML += trainContentForm;

                contentList.append(contentForm);

                // Find the tag val
                let trainContentContent = contentList.find("#"+contentForm[0].id+" .custom-text-box-1");
                let trainContentOutputStandard = contentList.find("#"+contentForm[0].id+" .output-standard .custom-box");
                let trainContentDuration = contentList.find("#"+contentForm[0].id+" .duration .custom-box");


                let trainContentStatus = contentList.find("#"+contentForm[0].id+" .status .status-typo .switch .check-box");
                let trainContentStatusSpan = contentList.find("#"+contentForm[0].id+" .status .status-typo .switch .check-box-span");

                let trainContentDeliveryType = contentList.find("#"+contentForm[0].id+" .delivery-type .custom-box");


                // Load val to tag val
                trainContentContent.val(trainContent.content);

                // dang check o day 30/11/2023
                trainContentOutputStandard.append(loadObjectivesCode());
                trainContentOutputStandard.val(trainContent.learningObjective.code);

                trainContentDuration.val(trainContent.duration);

                if(trainContent.trainingFormat == "ONLINE"){
                    trainContentStatus.prop("checked", true);

                    trainContentStatusSpan.css({
                        'padding-left' : '7px',
//                        'transform' : 'translateX(-10px)'
                        'transition' : '.4s',
                        'justify-content' : 'flex-start'
                    })
                }else{
                    trainContentStatus.prop("checked", false);

                    trainContentStatusSpan.css({
                        'padding-right' : '7px',
//                        'transform' : 'translateX(10px)'
                        'transition' : '.4s',
                        'justify-content' : 'flex-end'
                    })
                }
                trainContentStatusSpan.text(trainContent.trainingFormat);

//                trainContentStatus.val(trainContent.trainingFormat);

                trainContentDeliveryType.val(trainContent.deliveryType);

               trainContentStatus.on("change", function(){
                    if(trainContentStatus.is(':checked')){
                                            trainContent.trainingFormat = "ONLINE";

                                            trainContentStatusSpan.css({
                                                'padding-left' : '7px',
                    //                            'transform' : 'translateX(-10px)'
                                            'justify-content' : 'flex-start'
                                            })
                                        }else{
                                            trainContent.trainingFormat = "OFFLINE";

                                            trainContentStatusSpan.css({
                                                'padding-right' : '7px',
                    //                            'transform' : 'translateX(10px)'
                                            'justify-content' : 'flex-end'
                                            })
                                        }
                                        trainContentStatusSpan.text("");
                                        setTimeout(replaceText, 200, trainContentStatusSpan, trainContent.trainingFormat);
                    //                    trainContentStatusSpan.text(trainContent.trainingFormat);
               })

               contentList.find("#"+contentForm[0].id).on("change", function(){
                    if(trainContentContent.val() != ""){
                        trainContent.content = trainContentContent.val();
                        trainContentContent.val(trainContent.content);

                        trainContentContent.css({
                            'border' : ''
                        })
                    }else{
                        trainContentContent.css({
                            'border' : '1px red solid'
                        })
                    }


                    trainContent.learningObjective.code = trainContentOutputStandard.val();
                    trainContentOutputStandard.val(trainContent.learningObjective.code);

                    if(trainContentDuration.val() != ""){
                        trainContent.duration = trainContentDuration.val();
                        trainContentDuration.val(trainContent.duration);

                        trainContentDuration.css({
                            'border' : ''
                        })
                    }else{
                        trainContentDuration.css({
                            'border' : '1px red solid'
                        })
                    }



                    trainContent.deliveryType = trainContentDeliveryType.val();
                    trainContentDeliveryType.val(trainContent.deliveryType);

                    console.log(trainContentDeliveryType.val());
                    console.log(trainContent);
                });
                contentCount++;
            });

    unitFrag.find(".content-bar-list").append(contentList)
}

function replaceText(element, replaceText){
    element.text(replaceText);
}

//--------------------------------------------Event funtion-------------------------------------------------------------
function addDayCollapse(Fragment, FormIdSelector){
    $(Fragment).find(FormIdSelector)
        .find(".day-form-header").on("click", function(){
            $(FormIdSelector).find(".day-form-body").toggle("slow");
    })
}

function getDaysData(){
    let unitList = data.trainingUnitDTOListDetails;
    let dayMap =  new Map();
    unitList.forEach(item => {
        key = item.dayNumber;
        if (dayMap.has(item.dayNumber)){
            dayMap.get(key).push(item);
        } else {
            dayMap.set(key, [item]);
        }
    });
    return dayMap;
}


function resetOutlineCount(){
    dayCount = 1;
    unitCount = 1;
    contentCount = 1;
}
