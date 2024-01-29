objectiveCount=1;

function loadGeneralBody(){
    convertMapToObject(daysData);
    const syllabusBody = document.getElementById("syllabus-body");
    syllabusBody.innerHTML = '';
    syllabusBody.innerHTML = `
    <div class="syllabus-create-container" id="syllabus-general-body">
            <div class="syllabus-creation-header">
                <div class="progress-frame">
                    <div class="progress-frame-name">
                        Syllabus
                    </div>
                    <div class="progress-bar">
                        <div class="label">
                            <div class="bar radius-border-bar-start-1" style="background:#2D3748"><img class="eclipse-img" src="img/Ellipse offset.svg" alt=""></div>
                            <div class="label-name label-name-padding" >General</div>
                        </div>
                        <div class="label">
                            <div class="bar"></div>
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
                <div class="syllabus-creation-body-right" style="position: relative;">
                    <div class="syllabus-name">
                        <div class="basic-info">
                            <div class="syllabus-name-code">
                                <div class="req-text-box">
                                    <p class="req-text-box-element">Syllabus Name*</p>
                                    <div id="text-box-1">
                                        <input type="text" class="long-round" id="Name-text-box">
                                    </div>
                                </div>
                                <div class="req-text-box">
                                    <p class="req-text-box-element">Code:</p>
                                    <div id="code-text-box" >NPL</div>
                                </div>
                                <div class="req-text-box">
                                    <p class="req-text-box-element">Version:</p>
                                    <div id="text-box-2">
                                        <input pattern="[1-9]" type="text"  class="short-round" id="version-text-box">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="syllabus-tab">
                            <div class="syllabus-sub-tab" id="syllabus-current-tab">
                                <div class="sub-tab-text">General</div>
                            </div>
                            <div class="syllabus-sub-tab added-tab" id="syllabus-sub-tab-outline" onclick="loadOutlineBody()">
                                <div class="sub-tab-text">Outline</div>
                            </div>
                            <div class="syllabus-sub-tab added-tab" id="syllabus-sub-tab-others" onclick="loadOthersBody()">
                                <div class="sub-tab-text">Others</div>
                            </div>
                        </div>
                    </div>
                    <div class="syllabus-content" style="padding-bottom: 550px;">
                        <div id="knowledge-req">
                            <div class="req-text-box">
                                <div class="content-text-bold">Level*</div>
                                <div id="content-text-box-1">
                                    <select class="custom-select" id="level-text-box">
                                        <option value="LOW" class="content-text-normal">LOW</option>
                                        <option value="MEDIUM" class="content-text-normal">MEDIUM</option>
                                        <option value="HIGH" class="content-text-normal">HIGH</option>
                                    </select>
                                </div>
                            </div>
                            <div class="req-text-box">
                                <div class="content-text-bold">Attendee number*</div>
                                <div id="content-text-box-2">
                                    <input type="text" class="short-round" id="attendeeNumber-text-box">
                                </div>
                            </div>
                        </div>
                        <div id="tech-req">
                            <div class="content-text-bold" style="padding-left: 10px;">Technical Requirement(s)*</div>
                            <div id="content-text-box-3">
                                <textarea name="" id="technicalRequirement-box" cols="130" rows="4" class="custom-text-area-1"></textarea>
                            </div>
                        </div>
                        <div id="objectives" style="padding-bottom: 393px;">
                           <div class="objectives-title">
                                  <div class="text-title-black-typo" style="width: 130px;">Course Objectives</div>

                                  <img src="img/add.svg" alt="" class="custom-add-objective-btn" onclick="addObjective()">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="syllabus-creation-body-left">

                </div>
            </div>
            <div class="syllabus-creation-footer">
                <div class="saving-button">
                    <div class="cancel">Cancel</div>
                    <div class="save-as-draft">Save as draft</div>
                    <div class="next">Next</div>
                </div>
            </div>
    </div>
    `;

    $("#syllabus-body").on("load", loadObjectives());

    $(".objective-form .form-body").toggle();



    $("#Name-text-box").val(data.generalInfoFormDTODetails.topicName)
        .on("change", function(){
            data.generalInfoFormDTODetails.topicName = $("#Name-text-box").val();
        });

    $("#code-text-box").text(data.generalInfoFormDTODetails.topicCode);

    $("#version-text-box").val(data.generalInfoFormDTODetails.version)

    $("#level-text-box").val(data.generalInfoFormDTODetails.priority)
        .on("change", function(){
            updateTopicCode();
        });

    $("#attendeeNumber-text-box").val(data.generalInfoFormDTODetails.trainingAudience)
        .on("change", function(){
            data.generalInfoFormDTODetails.trainingAudience = $("#attendeeNumber-text-box").val();
        });

    $("#technicalRequirement-box").val(data.generalInfoFormDTODetails.technicalGroup)
        .on("change", function(){
            data.generalInfoFormDTODetails.technicalGroup = $("#technicalRequirement-box").val();
        });

    $(".cancel").on("click", function(){
        console.log(data);
    });


    $(".next").on("click", function(){
        updateTopicCode();
        loadOutlineBody();
    });


    $(".save-as-draft").on("click", function(){
         saveSyllabus(data, "Draft", redirectToSyllabusList);
    });


    $("#Name-text-box").on("change", function(){
        checkNullName();
    });
    $("#version-text-box").on("change", function(){

        checkNullVersion();
    });
    $("#attendeeNumber-text-box").on("change", function(){
        checkNullAttendeeNumber();
    });
    $("#technicalRequirement-box").on("change", function(){
        checkNullRequirement();
    });
//    $("#version-text-box").on("change", function(){
//        checkNullTextInput5();
//    });
}
//--------------------------Check null function--------------------------------------------------------------------------

function checkNullRequirement(){
    const textInput4 = document.getElementById("technicalRequirement-box");
        if(!document.getElementById("para4")){
            const para4 = document.createElement("dialog");
            para4.appendChild(document.createTextNode("Input required !"));
            para4.id = "para4";
            para4.setAttribute("class", "custom-dialog-alert");
            para4.setAttribute("style", "left: 200px; bottom: -20px;");
            document.getElementById("content-text-box-3").appendChild(para4);
            document.getElementById("content-text-box-3").setAttribute("style", "position: relative;");
        }
        if(!(textInput4.value)){

            para4.open = true;
            $("#technicalRequirement-box").css({
                "border": "1px solid red"
            });
        }
        else{
            $("#technicalRequirement-box").css({
                "border": "1px solid black"
            });
            document.getElementById("para4").open = false;
        }
}

function checkNullAttendeeNumber(){
    const textInput3 = document.getElementById("attendeeNumber-text-box");
        if(!document.getElementById("para3")){
            const para3 = document.createElement("dialog");
            para3.appendChild(document.createTextNode("Input required !"));
            para3.id = "para3";
            para3.setAttribute("class", "custom-dialog-alert");
            para3.setAttribute("style", "bottom: -21px");
            document.getElementById("content-text-box-2").appendChild(para3);
            document.getElementById("content-text-box-2").setAttribute("style", "position: relative;");
        }
        if(!(textInput3.value)){

            para3.open = true;
            $("#attendeeNumber-text-box").css({
                "border": "1px solid red"
            });
        }
        else{
            $("#attendeeNumber-text-box").css({
                "border": "1px solid black"
            });
            document.getElementById("para3").open = false;
        }
}

function checkNullVersion(){

    const version = data.generalInfoFormDTODetails.version;
    const subVersion = version.substring(1, version.length);

    const textInput2 = document.getElementById("version-text-box");
    let rg = /^[1-9]$/;
        if(!document.getElementById("para2")){
            const para2 = document.createElement("dialog");
            para2.appendChild(document.createTextNode("Input required !"));
            para2.id = "para2";
            para2.setAttribute("class", "custom-dialog-alert");
            document.getElementById("text-box-2").appendChild(para2);
            document.getElementById("text-box-2").setAttribute("style", "position: relative;");
        }
        if(!(textInput2.value) || !rg.test($("#version-text-box").val())){
            if(!(textInput2.value)){
                $("#para2").text("Input required !")
            }else{
                $("#para2").text("Enter one number!")
            }

            para2.open = true;
            $("#version-text-box").css({
                "border": "1px solid red"
            });
        }
        else{

            $("#version-text-box").css({
                "border": "1px solid black"
            });
            document.getElementById("para2").open = false;

            let newVersion = $("#version-text-box").val()+subVersion;
            $("#version-text-box").val(newVersion);
            data.generalInfoFormDTODetails.version = newVersion;
            console.log(newVersion);
            console.log(subVersion);
        }


}

function checkNullName(){
    const textInput1 = document.getElementById("Name-text-box");

    if(!document.getElementById("para1")){
        const para1 = document.createElement("dialog");
        para1.appendChild(document.createTextNode("Input required !"));
        para1.id = "para1";
        para1.setAttribute("class", "custom-dialog-alert");
        document.getElementById("text-box-1").appendChild(para1);
        document.getElementById("text-box-1").setAttribute("style", "position: relative;");
    }
    if(!(textInput1.value)){
        para1.open = true;
        $("#Name-text-box").css({
            "border": "1px solid red"
        });
    }
    else{
        $("#Name-text-box").css({
            "border": "1px solid black"
        });
        document.getElementById("para1").open = false;
    }
///
}

function checkNullTextInputForObjectiveName(id, objectiveNameBoxId){
    textInput = document.getElementById(id);
    if(textInput != null){
        if(!document.getElementById(id+"-para")){
            para = document.createElement("p");
            para.id = id + "-para";
            para.appendChild(document.createTextNode("Input required !"));
            para.setAttribute("class", "custom-dialog-alert");
            para.setAttribute("style", "margin: 0; bottom: -20px;");
            document.getElementById(objectiveNameBoxId).appendChild(para);
            document.getElementById(objectiveNameBoxId).setAttribute("style", "position: relative;");
        }
        if(textInput.value == ""){
            document.getElementById(id + "-para").style.display = 'block';
        }else{
            document.getElementById(id + "-para").style.display = 'none';
        }
    }
}

function checkNullTextInputForObjectiveDescription(objectiveDescriptionId, objectiveDescriptionBoxId){
    textInput = document.getElementById(objectiveDescriptionId);
    if(textInput != null){
        if(!document.getElementById(objectiveDescriptionId+"-para")){
            para = document.createElement("p");
            para.id = objectiveDescriptionId + "-para";
            para.appendChild(document.createTextNode("Input required !"));
            para.setAttribute("class", "custom-dialog-alert");
            para.setAttribute("style", "bottom: -35px;");
            document.getElementById(objectiveDescriptionBoxId).appendChild(para);
            document.getElementById(objectiveDescriptionBoxId).setAttribute("style", "position: relative;");
        }
        if(textInput.value == ""){
            document.getElementById(objectiveDescriptionId + "-para").style.display = 'block';
        }else{
            document.getElementById(objectiveDescriptionId + "-para").style.display = 'none';
        }
    }
}

//--------------------------data related function--------------------------------------------------------------------------

function loadObjectives(){
        objectives = document.getElementById("objectives");
        objectiveFormList= document.createDocumentFragment();

        data.generalInfoFormDTODetails.learningObjectivesList.forEach(objective => {

            let form = document.createElement("div");
            let formId = "objective-form-"+objectiveCount;
            form.classList.add("req-text-box-first-form");
            form.classList.add("objective-form");
            form.id = formId;

//          add form html template
            form.innerHTML = objectiveForm;


//           set Input box behaviors on change
            objectiveFormList.appendChild(form);
            let formSelector = "#"+formId;
            let currentForm = objectiveFormList.querySelector(formSelector);

//           expand and collapse
            addFormCollapse(currentForm, formSelector);

//          delete btn
            addObjectiveDelete(currentForm, formSelector);

                    objectiveNameId = "Objective-name-" + objectiveCount;
                    objectiveNameBoxId = "Objective-name-box" + objectiveCount;
                    currentForm
                        .querySelector(".Objective-name")
                        .id = objectiveNameId;
                    currentForm
                        .querySelector(".Objective-name-box")
                        .id = objectiveNameBoxId;
                   currentForm
                        .querySelector("#"+objectiveNameId)
                        .addEventListener("change", function(){
                            for(i = 1; i <= objectiveCount; i++){
                                checkNullTextInputForObjectiveName("Objective-name-" + i, "Objective-name-box" + i);
                            }
                        }, false);
                    //
                   objectiveDescriptionId = "Objective-description-" + objectiveCount;
                   objectiveDescriptionBoxId = "Objective-description-box" + objectiveCount;
                   currentForm
                        .querySelector(".description")
                        .id = objectiveDescriptionId;
                   currentForm
                        .querySelector(".Objective-description-box")
                        .id = objectiveDescriptionBoxId;
                   currentForm
                        .querySelector("#"+objectiveDescriptionId)
                        .addEventListener("change", function(){
                            for(i = 1; i <= objectiveCount; i++){
                                checkNullTextInputForObjectiveDescription("Objective-description-" + i, "Objective-description-box" + i);
                            }
                        }, false);

            $(currentForm).find(".form-title").text(objective.name);

            $(currentForm).find(".Objective-name").val(objective.name);
            $(currentForm).find(".Objective-name").on("change",function(){
                            objective.name = $(currentForm).find(".Objective-name").val();
                            $(currentForm).find(".form-title").text(objective.name);
                        });

            $(currentForm).find(".type").val(objective.type);
            $(currentForm).find(".type").on("change", function(){
                                    objective.type = $(currentForm).find(".type").val();
                                });

            $(currentForm).find(".description").val(objective.description);
            $(currentForm).find(".description").on("change", function(){
                                    objective.description = $(currentForm).find(".description").val();
                                });

           $(currentForm).find(".Objective-code").text(objective.code);


            objectiveCount+=1;
        });
        objectives.appendChild(objectiveFormList);

}

function addObjective(){
        $.get({
            url:"syllabus/edit/newObjective",
            success: function(response){
                let objectives = document.getElementById("objectives");
                let newObjectiveFrag= document.createDocumentFragment();
                let newObjective = {
                                code : response,
                                name : "Learning Objective new",
                                type : "Type A",
                                description : "Description for new objective"
                            }

                let form = document.createElement("div");
                let formId = "objective-form-"+objectiveCount;
                form.classList.add("req-text-box-first-form");
                form.classList.add("objective-form");
                form.id = formId;

                //add form html template
                form.innerHTML = objectiveForm;


                //set Input box behaviors on change
                newObjectiveFrag.appendChild(form);
                let formSelector = "#"+formId;
                let currentForm = newObjectiveFrag.querySelector(formSelector);

                objectiveNameId = "Objective-name-" + objectiveCount;
                objectiveNameBoxId = "Objective-name-box" + objectiveCount;
                currentForm
                    .querySelector(".Objective-name")
                    .id = objectiveNameId;
                currentForm
                    .querySelector(".Objective-name-box")
                    .id = objectiveNameBoxId;
                currentForm
                    .querySelector("#"+objectiveNameId)
                    .addEventListener("change", function(){
                        for(i = 1; i <= objectiveCount; i++){
                            checkNullTextInputForObjectiveName("Objective-name-" + i, "Objective-name-box" + i);
                        }
                    }, false);

                objectiveDescriptionId = "Objective-description-" + objectiveCount;
                objectiveDescriptionBoxId = "Objective-description-box" + objectiveCount;
                currentForm
                    .querySelector(".description")
                    .id = objectiveDescriptionId;
                currentForm
                    .querySelector(".Objective-description-box")
                    .id = objectiveDescriptionBoxId;
                currentForm
                    .querySelector("#"+objectiveDescriptionId)
                    .addEventListener("change", function(){
                        for(i = 1; i <= objectiveCount; i++){
                            checkNullTextInputForObjectiveDescription("Objective-description-" + i, "Objective-description-box" + i);
                        }
                    }, false);
                //expand and collapse btn
                currentForm
                    .querySelector(".custom-drop-down-btn img")
                    .setAttribute("src", "img/collapse-btn.svg");
                addFormCollapse(currentForm, formSelector);

                //delete btn
                addObjectiveDelete(currentForm, formSelector);


                $(currentForm).find(".form-title").text(newObjective.name);

                $(currentForm).find(".Objective-name").val(newObjective.name);
                $(currentForm).find(".Objective-name").on("change",function(){
                                newObjective.name = $(currentForm).find(".Objective-name").val();
                                $(currentForm).find(".form-title").text(newObjective.name);
                            });

                $(currentForm).find(".type").val(newObjective.type);
                $(currentForm).find(".type").on("change", function(){
                                        newObjective.type = $(currentForm).find(".type").val();
                                    });

                $(currentForm).find(".description").val(newObjective.description);
                $(currentForm).find(".description").on("change", function(){
                                        newObjective.description = $(currentForm).find(".description").val();
                                    });

                $(currentForm).find(".Objective-code").text(newObjective.code);


                data.generalInfoFormDTODetails.learningObjectivesList.push(newObjective);
                objectives.appendChild(newObjectiveFrag);

                objectiveCount+=1;
            }
        });
}

function addFormCollapse(currentForm, formSelector){
    /*pass in the current form selector and DOM element then add click event to collapse btn*/
    let bodySelector = formSelector+" .form-body";
    let CollapseBtn= formSelector+" .form-header"+ " .custom-drop-down-btn";

    currentForm
        .querySelector(".form-header")
        .querySelector("button").addEventListener("click", function(){
               $(bodySelector).slideToggle("slow");

               if ($(CollapseBtn).children("img").attr("src")=='img/expand.svg'){
                   $(CollapseBtn).children("img").attr("src",'img/collapse-btn.svg');
               }
               else{
                   $(CollapseBtn).children("img").attr("src",'img/expand.svg');
               }
            });
}

function addObjectiveDelete(currentForm, formSelector){
    /*pass in the current form selector and DOM element then add click event to delete btn*/
    let bodySelector = formSelector+" .form-body";
    currentForm
        .querySelector(".form-header")
        .querySelector(".objectives-tab-left")
        .querySelector(".custom-rm-btn").addEventListener("click", function(){

                let objectiveName = $(bodySelector)[0].querySelector(".Objective-name").value;
                let objectiveCode = getObjCode(objectiveName, data.generalInfoFormDTODetails.learningObjectivesList);
                let deleteData =  data.generalInfoFormDTODetails.topicCode+'-'+objectiveCode

                if (window.confirm("Do you really want to delete this objective?")){
                   console.log("deleteData: "+deleteData);
                   deleteRequest(deleteData, "/syllabus/edit/objective")
                   $(formSelector).remove();
                }

            });
}

function getObjCode(target, objectiveList){
    for (item of objectiveList){
        if (item.name==target){
            objCode = item.code;
            targetIdx = objectiveList.indexOf(item);
            console.log(targetIdx);
            objectiveList.splice(targetIdx,1);
            return objCode;
        }else{
            continue
        }
    }

}

function updateTopicCode(){
    let priorityLevel = $("#level-text-box").val();
    if (priorityLevel!=undefined){
         data.generalInfoFormDTODetails.priority = priorityLevel;
    }else{
        priorityLevel = data.generalInfoFormDTODetails.priority;
    }

    console.log(priorityLevel);
    console.log($("#code-text-box").text());


    if (($("#code-text-box").text()==null||$("#code-text-box").text()=="NLP")&&(data.actionType=="create")){
       let baseCode;
           switch(priorityLevel) {
             case "LOW":
               baseCode = "TL";
               break;
             case "MEDIUM":
               baseCode = "TM";
               break;
             case "HIGH":
               baseCode = "TH";
           }
           $.get({
               url:"syllabus/details/newTopic",
               data:{"baseCode":baseCode},
               success: function(response){
                   console.log(baseCode);
                   $("#code-text-box").text(response);
                   data.generalInfoFormDTODetails.topicCode = response;
               }
           });
    }
}



function circle(assignment_lab_percent, concept_lecture_percent, guides_review_percent, test_quiz_percent, exam_percent, seminar_workshop_percent){
   new ej.charts.AccumulationChart({
    series: [
        {
            dataSource: [
            {x:'Assignment/Lab', y: assignment_lab_percent},
            {x:'Concept/Lecture', y: concept_lecture_percent},
            {x:'Guide/Review',y: guides_review_percent},
            {x:'Test/Quiz',y: test_quiz_percent},
            {x:'Exam',y: exam_percent},
            {x:'Seminar/workshop',y: seminar_workshop_percent}],
            xName: 'x',
            yName: 'y',

            palettes: ["#F4BE37", "#FF9F40", "#0D2535", "#5388D8","#216EE6","#808080"],

            Height:'50%',
            Width: '300px',
        }
    ],
    legendSettings: {
        visible: false,
    },
    }, '.drawing-circle');
}

function time_allocation_calculation(){
    let assignment_lab_duration = 0;
    let concept_lecture_duration = 0;
    let guides_review_duration = 0;
    let test_quiz_duration = 0;
    let exam_duration = 0;
    let seminar_workshop_duration = 0;
    for (unit_code of data.trainingUnitDTOListDetails){
        for (content of unit_code.trainingContentDTOList){
            if (content.deliveryType =="ASSIGNMENT_LAB") {
                assignment_lab_duration += content.duration
            };
            if (content.deliveryType == "CONCEPT_LECTURE"){
                concept_lecture_duration += content.duration
            };

            if (content.deliveryType == "GUIDES_REVIEW"){
                guides_review_duration += content.duration
            };

            if (content.deliveryType == "TEST_QUIZ"){
                test_quiz_duration += content.duration
            };

            if (content.deliveryType == "EXAM"){
                exam_duration += content.duration
            };
            if (content.deliveryType == "SEMINAR_WORKSHOP"){
                exam_duration += content.duration
            };

        };
    };
    var total_duration = assignment_lab_duration + concept_lecture_duration + guides_review_duration + test_quiz_duration + exam_duration;
    var assignment_lab_percent= assignment_lab_duration/total_duration*100;
    var concept_lecture_percent = concept_lecture_duration/total_duration*100;
    var guides_review_percent = guides_review_duration/total_duration*100;
    var test_quiz_percent = test_quiz_duration/total_duration*100;
    var exam_percent = exam_duration/total_duration*100;
    var seminar_workshop_percent = seminar_workshop_duration/total_duration*100;
    if(isNaN(assignment_lab_percent)){
        var assignment_lab_percent=0;
    }
    if(isNaN(guides_review_percent)){
            var guides_review_percent=0;
        }
    if(isNaN(concept_lecture_percent)){
            var concept_lecture_percent=0;
        }
    if(isNaN(test_quiz_percent)){
            var test_quiz_percent=0;
        }
    if(isNaN(exam_percent)){
            var exam_percent=0;
        }
    if(isNaN(seminar_workshop_percent)){
            var seminar_workshop_percent=0;
        }
    return [assignment_lab_percent, concept_lecture_percent, guides_review_percent, test_quiz_percent, exam_percent, seminar_workshop_percent];
}

function show_time_allocation_percent(assignment_lab_percent, concept_lecture_percent, guides_review_percent, test_quiz_percent, exam_percent, seminar_workshop_percent){
    $(".assignment_lab_percent").text("("+parseInt(assignment_lab_percent)+ "%"+")");
    $(".concept_lecture_percent").text("("+parseInt(concept_lecture_percent) + "%"+")");
    $(".guides_review_percent").text("("+parseInt(guides_review_percent) + "%"+")");
    $(".test_quiz_percent").text("("+parseInt(test_quiz_percent )+ "%"+")");
    $(".exam_percent").text("("+parseInt(exam_percent) + "%"+")");
    $(".seminar_workshop_percent").text("("+seminar_workshop_percent + "%"+")");
}


