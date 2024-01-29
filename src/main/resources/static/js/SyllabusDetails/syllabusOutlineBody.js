//let dayCount=1;
let daysData = getDaysData();
//let dayCount = daysData.size;
let newContentList = [];
let unitCount=1;
let contentCount=1;
let selectUnit = 0;
function loadOutlineBody(){
    let syllabusBody = document.getElementById("syllabus-body");
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
                            <div class="bar completed-bar radius-border-bar-start"></div>
                            <div class="label-name label-name-padding">General</div>
                        </div>
                        <div class="label">
                            <div class="bar completed-bar radius-border-bar-end"><img class="eclipse-img" src="img/Ellipse offset.svg" alt=""></div>
                            <div class="label-name label-name-padding">Outline</div>
                        </div>
                        <div class="label">
                            <div class="bar"></div>
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
                                    <p class="req-text-box-element">Syllabus Name:</p>
                                        <div id="Name-text-box">
                                            <input type="text" class="long-round">
                                        </div>
                                </div>
                                <div class="req-text-box">
                                    <p class="req-text-box-element">Code:</p>
                                    <div id="code-text-box">NLP</div>
                                </div>
                                <div class="req-text-box">
                                    <p class="req-text-box-element">Version:</p>
                                        <div id="version-text-box">1.0</div>
                                </div>
                            </div>
                        </div>
                        <div class="syllabus-tab">
                            <div class="syllabus-sub-tab added-tab" onclick="loadGeneralBody(); resetOutlineCount();">
                                <div class="sub-tab-text">General</div>
                            </div>
                            <div class="syllabus-sub-tab" id="syllabus-current-tab">
                                <div class="sub-tab-text">Outline</div>
                            </div>
                            <div class="syllabus-sub-tab added-tab" onclick="loadOthersBody(); resetOutlineCount();">
                                <div class="sub-tab-text">Others</div>
                            </div>
                        </div>
                    </div>
                    <div class="syllabus-content" style="padding-bottom:500px;">
                    <div id="days" style="width:100%;padding-bottom:540px;">

                    </div>
                        <div class="add-day">
                            <div class="add-day-btn" onclick="addDayForm()">
                                <img src="img/add.svg" alt="Image of circle plus button">
                                <div class="white-text-typo-small">Add day</div>
                            </div>
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
                <div class="syllabus-creation-footer-previous">
                    <div class="previous-box">
                        <div class="previous-button">Previous</div>
                    </div>
                    <div class="saving-button">
                        <div class="cancel">Cancel</div>
                        <div class="save-as-draft">Save as draft</div>
                        <div class="next">Next</div>
                    </div>
                </div>
            </div>

            <dialog id="delete-popup" style="border: 0;">
                <div class="Create-Delete-day">
                        <div class="popup-body">
                            <div class="popup-title">
                                <img src="img/error-report.png">
                                <span style="font-weight: 700">Delete Day</span>
                            </div>
                            <hr style="border: 1px solid #000;">
                            <div class="popup-content" id="popup-content" style="text-align: center; font-weight: 700">
                                Delete all content of the Day ?
                            </div>
                        </div>
                        <div class="popup-btn">
                            <a id="cancel-btn" onclick="$('#delete-popup')[0].close();">Cancel</a>
                            <a id="confirm-btn">Confirm</a>
                        </div>
                    </div>
                </div>
            </dialog>

            <dialog id="Notification-popup" style="border: 0; ">
                <div class="Create-Delete-day">
                        <div class="popup-body">
                            <div class="popup-title" style="display: block;>
                                <span style="font-weight: 700">Notification</span>
                            </div>
                            <hr style="border: 1px solid #000;">
                            <div class="popup-content" id="Notification-content" style="text-align: center; font-weight: 700">

                            </div>
                        </div>
                        <div class="popup-btn">
                            <a id="confirm-btn" onclick="$('#Notification-popup')[0].close(); $('#Notification-content').empty();">Confirm</a>
                        </div>
                    </div>
                </div>
            </dialog>

            <dialog id="upload-popup">
                <div class="upload-form">
                        <div class="popup-title" id="upload-title">
                            <span style="line-height: 60px;">Uploaded files</span>
                        </div>
                        <div class="popup-body">
                            <input id="fileInput" type="file" accept="image/*, video/*, .doc, .docx, .xml, .pdf, .ppt, .pptx" style="display: none;" multiple>
                            <div class="popup-content file-box" id="file-info">
                                <div style="text-align: right;"></div>
                            </div>
                        </div>

                    <div class="popup-btn">
                        <a id="upload-btn" onclick="$('#fileInput').click()">choose file</a>
                        <a id="confirm-btn" onclick="$('#upload-popup')[0].close();">Confirm</a>
                    </div>
                </div>
            </dialog>

    `;



    updateTopicCode();


     $("#Name-text-box").text(data.generalInfoFormDTODetails.topicName);
     $("#code-text-box").text(data.generalInfoFormDTODetails.topicCode);
     $("#version-text-box").text(data.generalInfoFormDTODetails.version);

     $(".add_content_btn").on("click", function(){

     });



    const time_allocation_percent = time_allocation_calculation()
    show_time_allocation_percent(time_allocation_percent[0],time_allocation_percent[1],time_allocation_percent[2],time_allocation_percent[3],time_allocation_percent[4], time_allocation_percent[5])
    circle(time_allocation_percent[0],time_allocation_percent[1],time_allocation_percent[2],time_allocation_percent[3],time_allocation_percent[4], time_allocation_percent[5])

    $(".training-unit-form").toggle();

    $(".cancel").on("click", function(){
            console.log(data);
    });



    $(".previous-button").on("click",loadGeneralBody);

     $(".save-as-draft").on("click", function(){

         convertMapToObject(daysData);
         saveSyllabus(data, "Draft", redirectToSyllabusList);
     });


    loadDays(daysData);


    $(".next").on("click", function(){
            let flag = 0;
            for(i=1; i <= contentCount; i++){
                content = $(document.getElementById("content-form-" + i));

                if(content.find(".custom-text-box-1").val() == ""
                || content.find(".duration .custom-box").val() == ""
//                || content.find(".status").val() == ""
//                || content.find(".delivery-type .custom-box").val() == ""
                ){
                    alert("Missing value !")
                    flag += 1;
                }
            }
            if(flag == 0){
                updateTrainingUnitDTOList(daysData);
                convertMapToObject(daysData);
                loadOthersBody();
            }


    });

}


//--------------------------------------------Add form funtion----------------------------------------------------------
function addDayForm(){
    dayCount = daysData.size + 1;

    let days = document.getElementById("days");
    let newDayFrag = document.createDocumentFragment();

    let newDay = []
    daysData.set(dayCount, newDay);

    let currentForm = document.createElement("div");
    currentForm.id = "day-form-" + dayCount;
    currentForm.innerHTML += dayForm;
    newDayFrag.appendChild(currentForm);

    let FormIdSelector = "#" +currentForm.id;
    let unitsId = "unit-list-" + unitCount;

    newDayFrag.querySelector(FormIdSelector)
                    .querySelector(".unit-list").id = unitsId;

    newDayFrag.querySelector(FormIdSelector)
            .querySelector('.add-unit-btn')
            .addEventListener("click", function(){
                addUnitCreation(unitsId, dayCount);
            }, false);

    newDayFrag.querySelector(FormIdSelector)
            .querySelector('.day-title').textContent = "Day " + dayCount;

    addDayCollapse(newDayFrag, FormIdSelector);
    addDayDelete(newDayFrag, FormIdSelector);

    days.appendChild(newDayFrag);

//    daysData.push()
}

function addUnitCreation(unitsId, currentDay){

    let unitList = document.getElementById(unitsId);
    let creationUnitFrag = document.createDocumentFragment();

    let form = document.createElement("div");

    form.classList.add("create-unit");
    form.classList.add("create-unit-form");
    form.innerHTML += unitCreationForm;

    creationUnitFrag.appendChild(form);

    creationUnitFrag.querySelector(".create-input-button")
        .addEventListener("click", function(){
            let unitName = $(".create-unit-form .input-box").val()

            addUnitForm(unitList, currentDay, unitName);
            $(".create-unit-form").remove();
        })

    $(creationUnitFrag.querySelector(".input-box"))
        .keypress(function(e){
//          13 is enter keycode
            if(e.keyCode == '13'){
                let unitName = $(".create-unit-form .input-box").val()
                addUnitForm(unitList, currentDay ,unitName);
                $(".create-unit-form").remove();
            }
        });

    unitList.appendChild(creationUnitFrag);
}

function addUnitForm(unitList, currentDay, unitName){

    let unitId = "unit-form-" + unitCount;
    let newUnit = {
        unitCode: null,
        unitName: unitName,
        unitNumber: unitCount,
        dayNumber: currentDay,
        trainingContentDTOList: []
    }

    let newUnitFrag = document.createDocumentFragment();

    let unitForm = document.createElement("div");
    unitForm.classList.add("create-content-form");
    unitForm.id = unitId;
    unitSelector = "#"+unitId

    unitForm.innerHTML += unitContentForm;
    newUnitFrag.appendChild(unitForm);

     $(newUnitFrag).find(".dropdown-icon img").on("click", function(){
                $(unitSelector).find(".content-list").slideToggle();
            });

//  load data in
    $(newUnitFrag).find(".unit-code div").text("Unit  "+newUnit.unitNumber);
    $(newUnitFrag).find(".unit-name .name").text(newUnit.unitName);

    $(newUnitFrag).find(".create-button").on("click", function(){
        editUnitName(unitSelector, newUnit)
    });

    newUnitFrag.querySelector(".create-content-form")
        .querySelector('.add_content_btn')
        .addEventListener("click", function () {


            addContentForm(unitId, currentDay);
        });

    daysData.get(Number(currentDay)).push(newUnit);

//    daysData.get(currentDay).push(newUnit);

    unitList.appendChild(newUnitFrag);
    unitCount += 1;
}

function addContentForm(formId, currentDay){
    let unitId = formId;
    let unitSelector = '#' + unitId;

    let contentList= document.getElementById(unitId).querySelector(".unit-detail-form").querySelector(".content-list").querySelector(".content-bar-list");

//
    newContent = {
                   "content" : "Content for Unit 1",
                   "learningObjective" : {
                        "code": "H2SD"
                   },
                   "duration" : 60,
                   "trainingFormat" : "ONLINE",
                   "deliveryType" : "ASSIGNMENT_LAB"
                 }
    //add the newContent to a list to keep track
    newContentList.push(newContent);

    let newContentFrag = document.createDocumentFragment();
    let contentForm = document.createElement("div");
    contentForm.classList.add("input-content");
    contentForm.classList.add("content-form");
    contentForm.id = "content-form-" + contentCount;
    contentForm.innerHTML += trainContentForm;
    contentList.appendChild(contentForm);
    contentCount+=1;
    $(document.getElementById(contentForm.id)).find(".output-standard .custom-box").append(loadObjectivesCode());
    //de active upload btn if the content is not save in data base

    $(document.getElementById(contentForm.id)).find(".import-lo img")
        .attr("src", "img/syllabus-outline-Group-inactive.svg")
        .on("click", function(){
            const message = "Please save this content to database before uploading file!"
            showNotification(message);
        });


    //mapping form data with object data
    contentList = $(contentList);

    let trainContentContent = contentList.find("#"+contentForm.id+" .custom-text-box-1");
    let trainContentOutputStandard = contentList.find("#"+contentForm.id+" .output-standard .custom-box");

    let trainContentDuration = contentList.find("#"+contentForm.id+" .duration .custom-box");


    let trainContentStatus = contentList.find("#"+contentForm.id+" .status .status-typo .switch .check-box");
    let trainContentStatusSpan = contentList.find("#"+contentForm.id+" .status .status-typo .switch .check-box-span");

    let trainContentDeliveryType = contentList.find("#"+contentForm.id+" .delivery-type .custom-box");

//     Set default training format
    newContent.trainingFormat = "OFFLINE";
    trainContentStatusSpan.text("OFFLINE");
    trainContentStatusSpan.css({
        'padding-right' : '7px',
        'transition' : '.4s',
        'justify-content' : 'flex-end'
    })

    trainContentStatus.on("change", function(){
         if(trainContentStatus.is(':checked')){
             newContent.trainingFormat = "ONLINE";

             trainContentStatusSpan.css({
                 'padding-left' : '7px',
             'justify-content' : 'flex-start'
             })
         }else{
             newContent.trainingFormat = "OFFLINE";

             trainContentStatusSpan.css({
                 'padding-right' : '7px',
             'justify-content' : 'flex-end'
             })
         }
         trainContentStatusSpan.text("");
         setTimeout(replaceText, 200, trainContentStatusSpan, newContent.trainingFormat);
    })

    trainContentDeliveryType.on("change", function(){
        newContent.deliveryType = trainContentDeliveryType.val();
        trainContentDeliveryType.val(newContent.deliveryType);
    })

    $(document.getElementById(formId)).on("change", function(){
        if(trainContentContent.val() != ""){
            newContent.content = trainContentContent.val();
            trainContentContent.val(newContent.content);

            trainContentContent.css({
                'border' : ''
            })
        }else{
            trainContentContent.css({
                'border' : '1px red solid'
            })
        }


        newContent.learningObjective.code = trainContentOutputStandard.val();
        trainContentOutputStandard.val(newContent.learningObjective.code);

        if(trainContentDuration.val() != ""){
            newContent.duration = trainContentDuration.val();
            trainContentDuration.val(newContent.duration);

            trainContentDuration.css({
                'border' : ''
            })
        }else{
            trainContentDuration.css({
                'border' : '1px red solid'
            })
        }

    })

    currentUnit= daysData.get(Number(currentDay)).length - 1;
    daysData.get(Number(currentDay))[currentUnit].trainingContentDTOList.push(newContent);
}

//--------------------------------------------Load form function---------------------------------------------------------
function loadDays(daysData){

    let dayList = $("#days");
    let DayFrag = $(document.createDocumentFragment());

    dayCount = 1;
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
                    addUnitCreation(unitsId, (thisDayForm[0].id)[thisDayForm[0].id.length - 1]);
        });

        DayFrag.find(FormIdSelector)
            .find('.day-title').text("Day " + dayCount);

        dayCount++;
        addDayCollapse(DayFrag, FormIdSelector);
        addDayDelete(DayFrag, FormIdSelector);
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

            addContentForm(formId, currentDay);
      });


        DayFrag.find(unitsSelector).append(unitFrag);
        unitCount++;
     });

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
                // add open material upload dialog
                contentList.find("#"+formId+" .import-lo").on("click", function(){
//                    console.log(trainContent);
                    addUploadDialog(trainContent.id);
                });

                //check if the content is an unsaved one
                console.log(newContentList.includes(trainContent));

                if (newContentList.includes(trainContent)){
                    contentList.find("#"+formId).find(".import-lo img")
                        .attr("src", "img/syllabus-outline-Group-inactive.svg")
                        .on("click", function(){
                            const message = "Please save this content to database before uploading file!"
                            showNotification(message);
                        });
                }


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



function addDayDelete(Fragment ,FormIdSelector){
    $(Fragment).find(FormIdSelector)
        .find(".day-number img").on("click", function(e){
            e.stopPropagation()
            let dayTitle = $(FormIdSelector).find('.day-title').text().split(" ");
            let deletedDay = Number(dayTitle[1]);
            console.log(deletedDay);
            let unitCodeList = [];
            daysData.get(deletedDay).forEach(unit=>{
                unitCodeList.push(unit.unitCode);
            });



            let reloadDays = function(response){
                daysData.delete(deletedDay);
//                console.log("day deleted");
                let cache = new Map();
                for (let [key,value] of daysData){
                    if (key<deletedDay){
                       cache.set(key, value);
                       continue
                    }else{
                        let newKey = key-1;
                        cache.set(newKey, value);
                    }
                }
                daysData = cache;
                cache = undefined;

                dayCount = 1;
                $(FormIdSelector).remove();

                //reload the data
                $("#days").empty();
                loadDays(daysData);

                $("#delete-popup")[0].close();
            }
            $("#delete-popup #confirm-btn").on("click", function(){
//               console.log(unitCodeList);
               deleteRequest(unitCodeList.toString(), "/syllabus/edit/days", reloadDays);

            });
            $("#delete-popup")[0].showModal();
        });
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


function convertMapToObject(daysData){
    let unitList = []
//    console.log(daysData);
    daysData.forEach(function(unitsData, day){
        unitsData.forEach(function(unit){
            unit.unitNumber = Number(unit.unitNumber);

            unitList.push(unit);
        })
    })
    data.trainingUnitDTOListDetails = unitList;
}

function updateTrainingUnitDTOList(daysData){
    let newTrainingUnitDTOList = [];
    daysData.forEach(function(unitsData, day){
        unitsData.forEach(function(unitData, unit){
                    let unitDataConverted = {
                        'unitCode' : unitData.unitCode,
                        'unitName' : unitData.unitName,
                        'unitNumber' : unitData.unitNumber,
                        'dayNumber' : unitData.dayNumber,
                        'trainingContentDTOList': unitData.trainingContentDTOList
                    }
                    newTrainingUnitDTOList.push(unitDataConverted);
        });
    });
    return newTrainingUnitDTOList;
}


function resetOutlineCount(){
    dayCount = 1;
    unitCount = 1;
    contentCount = 1;
}

function updateDayTitles(daysData){
    let keyList = Array.from(daysData.keys());

    keyList.forEach(key=>{
        let cache = key+1
        title = "Day "+cache;
        dayIdSelector = "#day-form-" + cache;

        $(dayIdSelector).find('.day-title').text(title);
    });
}

function genUnitCode(){
    let timeStamp = Date.now();
    let unitCode = "U"+Math.round(timeStamp/1000).toString();
    return unitCode;
}

function editUnitName(unitSelector, unitData){
    let inputBox = document.createElement("div");
    inputBox.classList.add("input-button");
    inputBox.innerHTML = `
             <input class="input-box" type="text" placeholder="Type unit name">

            <div class="create-input-button">
                <div class="white-text-typo-small">Confirm</div>
            </div>

            <div class="cancel-input-button">
                <div class="cancel-text-typo-small">Cancel</div>
            </div>
    `;
    let editBoxFrag = document.createDocumentFragment();
    editBoxFrag.appendChild(inputBox);
//     `<input class="input-box" type="text" placeholder="Type new unit name">`;

    $(unitSelector).find(".create-button").hide();
    $(unitSelector).find(".unit-name-duration .name").hide();

    $(editBoxFrag).find(".input-box").keypress(function(e){
         if(e.keyCode == '13'){
            $(unitSelector).find(".unit-name-duration .name").text($(".input-box").val());
            unitData.unitName = $(".input-box").val();
            $(".input-box").remove();
            $(unitSelector).find(".create-button").show();
            $(unitSelector).find(".unit-name-duration .name").show();
            editBoxFrag.appendChild(inputBox);
        }
    });

    $(editBoxFrag).find(".create-input-button").on("click", function(){
        $(unitSelector).find(".unit-name-duration .name").text($(".input-box").val());
        unitData.unitName = $(".input-box").val();
        $(".input-box").remove();
        $(unitSelector).find(".create-button").show();
        $(unitSelector).find(".unit-name-duration .name").show();
        editBoxFrag.appendChild(inputBox);
    });


    $(editBoxFrag).find(".cancel-input-button").on("click", function(){
//        $(unitSelector).find(".unit-name-duration .name").text($(".input-box").val());
//        unitData.unitName = $(".input-box").val();
        $(".input-box").remove();
        $(unitSelector).find(".create-button").show();
        $(unitSelector).find(".unit-name-duration .name").show();
        editBoxFrag.appendChild(inputBox);
    });

    $(editBoxFrag).insertBefore($(unitSelector).find(".unit-name-duration .duration"));
}


function addUploadDialog(contentId){
    $.ajax({
        url:"material/content-materials",
        data: {"id": contentId},
        dataType: "json",
        success: function(response){
            //get already uploaded files from server
            let materialList = response;
            $("#file-info").empty();
            materialList.forEach(file=>{
                let fileName = `
                    <div style="text-align: right";>
                        <a href="/material/download?filename=${file.name}">${file.name}</a>
                        <img class="material-delete-btn" onclick="deleteMaterial('${file.name}');" src="img/delete_gray.svg"/>

                    </div> `;
                $("#file-info").append(fileName);
            });
            $('#fileInput').on("change", function(){
                const file = this.files[0];
                const name = file.name;
                $.ajax({
                    method: 'GET',
                    url : '/material/check-duplicate',
                    data: {name:name},
                    success:function (data){
                        if(data === ''){
                            // Lưu giá trị vào input file
                            let formData = new FormData();
                            formData.append('material', file);
                            formData.append('code', contentId);
                            formData.append('tp', null);
                            formData.append('tp_code', null);
                            formData.append('day', null);
                            formData.append('name', null);
                            formData.append('content', null);
                            $.ajax({
                                method: 'POST',
                                url: '/material/upload',
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                      let fileName = `
                                          <div style="text-align: right";>
                                              <a href="/material/download?filename=${file.name}">${file.name}</a>
                                              <img class="material-delete-btn" onclick="deleteMaterial('${file.name}');" src="img/delete_gray.svg"/>

                                          </div> `;
                                      $("#file-info").append(fileName);
                                }
                            });
                        }else{
                            showNotification("File is already uploaded!");
                        }
                    },
                    error: function(){
                        showNotification("Fail to upload file");
                    }
                });
            });
            $("#upload-popup")[0].showModal();
        },
        error:function(){
//            console.log(trainContent);
        }
    });

//    <span class="material-delete-btn" onclick="deleteMaterial('${file.name}');">X</span>
}


function showNotification(message){
    $("#Notification-content").text(message);
    $("#Notification-popup")[0].showModal();
}

function deleteMaterial(fileName){
        $.ajax({
            method: 'GET',
            url: '/material/delete/content?filename=' + fileName,
            processData: false,
            contentType: false,
            success: function (data) {
                $("#file-info div").each(function(){
                        if($(this).find("a").text()==fileName){
                            $(this).remove();

                        }
                });

            }
        });
}


