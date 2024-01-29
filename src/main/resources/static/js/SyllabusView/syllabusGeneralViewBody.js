
function loadGeneralViewBody(){
    const syllabusBody = document.getElementById("syllabus-body");
    syllabusBody.innerHTML = '';
    syllabusBody.innerHTML = `
     <div class="syllabus-create-container" id="syllabus-general-body">
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
                        <div class="dropdown-wrapper" >
                            <div class="dropdown">
                                <a onclick="ShowDropDownTab(this)" class="dropbtn">
                                      <img id="progress-frame-name-1-part-2-img" src="img/more_horizontal.svg" alt="">
                                </a>

                                <div class="dropdown-content-box" style="border: 5px solid rgb(204, 204, 204);" >
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

        <div class="syllabus-creation-body" style="flex-direction: column; border-radius: 0px 0px 10px 10px;
                                                                        gap:20px;
                                                                        background: #FFF;">
            <div class="syllabus-tab">
                <div class="syllabus-sub-tab" id="syllabus-current-tab">
                    <div class="sub-tab-text">General</div>
                </div>
                <div class="syllabus-sub-tab added-tab" id="syllabus-sub-tab-outline" onclick="loadOutlineViewBody()">
                    <div class="sub-tab-text">Outline</div>
                </div>
                <div class="syllabus-sub-tab added-tab" id="syllabus-sub-tab-others" onclick="loadOthersViewBody()">
                    <div class="sub-tab-text">Others</div>
                </div>
            </div>
            <div id="syllabus-creation-body-top">
                <div id="syllabus-creation-body-top-1">
                    <div id="syllabus-creation-body-top-1-level">
                        <div id="syllabus-creation-body-top-1-level-left">
                            <img src="img/grade.svg" alt="">
                            Level
                        </div>
                        <div id="syllabus-creation-body-top-1-level-right">
                            ${data.generalInfoFormDTODetails.priority}
                        </div>
                    </div>

                    <div id="syllabus-creation-body-top-1-attendee-number">
                        <div id="syllabus-creation-body-top-1-attendee-number-left">
                            <img src="img/group.svg" alt="">
                            Attendee number
                        </div>
                        <div id="syllabus-creation-body-top-1-attendee-number-right">
                            ${data.generalInfoFormDTODetails.trainingAudience}
                        </div>
                    </div>

                    <div id="syllabus-creation-body-top-1-output-standard">
                        <div id="syllabus-creation-body-top-1-output-standard-left">
                            <img src="img/verified_user.svg" alt="">
                            Output standard
                        </div>
                        <div id="syllabus-creation-body-top-1-output-standard-right">

                        </div>
                    </div>

                </div>
                <div id="syllabus-creation-body-top-2">
                    <div id="syllabus-creation-body-top-2-top">
                        <img src="img/settings.svg" alt="">
                        Technical Requirement(s)
                    </div>
                    <div id="syllabus-creation-body-top-2-bottom">
                        ${data.generalInfoFormDTODetails.technicalGroup}
                    </div>
                </div>
            </div>
            <div id="syllabus-creation-body-bottom">
                <div id="syllabus-creation-body-bottom-top">
                    <img src="img/filter_center_focus.svg" alt="">
                    Course objectives
                </div>
                <div id="syllabus-creation-body-bottom-bottom container" style="width:100%; height:468px;">
                    <table id="objectives-table" class="container">
                        <thead>
                            <th>Code</th>
                            <td></td>
                            <th>Name</th>
                            <td></td>
                            <th>Type</th>
                            <td></td>
                            <th>Description</th>
                            <td></td>
                        </thead>
                        <tbody id="table-body">

                        </tbody>
                    </table>
                </div>
            </div>
    </div>
    `;

    loadVersionSelector();

    loadObjectiveTable(data.generalInfoFormDTODetails.learningObjectivesList);

    $("#syllabus-creation-body-top-1-output-standard-right").text(getOutputStandardsCode());

    if (data.generalInfoFormDTODetails.status=="Active"){
        $("#activate-syllabus-btn").hide();
    }else {
        $("#de-activate-syllabus-btn").hide();
    }

    $(".dropdown-content-box").hide();

    console.log(data);
}

function loadObjectiveTable(objectiveList){
    let dataFrag = document.createDocumentFragment();
    objectiveList.forEach(objective=>{
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${objective.code}<td>
            <td>${objective.name}<td>
            <td>${objective.type}<td>
            <td>${objective.description}<td>
        `;
        $(dataFrag).append(tr);
    });
    $("#table-body").append(dataFrag);
}

function getOutputStandardsCode(){
    let codeList=[];
    data.generalInfoFormDTODetails.learningObjectivesList.forEach(objective=>{codeList.push(objective.code)});
    let code = codeList.join(", ");
    return code;
}

function ShowDropDownTab(el) {
//    $(".dropdown-content-box").show();
    if ( $(".dropdown-content-box").css("display")=="block"){
        $(".dropdown-content-box").slideUp("fast");
    }else{
        $(el.nextElementSibling).slideDown("fast");
    }
}

// Close the dropdown if the user clicks outside of it
$(document).on("click", function(event){
    if(!$(event.target).closest(".dropdown-content-box").length){
        if(!event.target.matches("#progress-frame-name-1-part-2-img")){
            $(".dropdown-content-box").slideUp("fast");
        }

    }
});

function toEdit(){
    window.location.href="/syllabus/edit?syllabus="+data.generalInfoFormDTODetails.syllabusId;
}

function toDuplicate(){
    window.location.href="/syllabus/duplicate?syllabus="+data.generalInfoFormDTODetails.syllabusId;
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

function toSyllabusByVersion(version, topicCode){
    let data = {
        topicCode:topicCode,
        version:version
    }
    let syllabusId;
    $.ajax({
        type: "GET",
        url: "/syllabus/view/version",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function(response){
            //the response is a syllabus id with correct version and topic code
           window.location.href = "/syllabus/view?syllabus="+response;
        },
        error: function(error){
          console.log("Error sending data")
        }
    })

}

function toggleSyllabusStatus(syllabusId){
    let successFunction = function(response){
            const statusBox = $("#progress-frame-name-1-status")

            if (statusBox.text()=="Active"){
                statusBox.text("Inactive");
                $("#activate-syllabus-btn").show();
                $("#de-activate-syllabus-btn").hide();
            }else{
                statusBox.text("Active");
                $("#activate-syllabus-btn").hide();
                $("#de-activate-syllabus-btn").show();
            }


            console.log(response);
        }

    postRequest(syllabusId, "/syllabus/view", successFunction);

}


function deleteSyllabus(syllabusId){
    console.log(syllabusId);
    let successFunction = function(response){
        window.location.href = "/syllabus/list";
        console.log(response);
    }

    if (window.confirm("Do you really want to delete this syllabus?")) {
        deleteRequest(syllabusId, "syllabus/list", successFunction);
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
