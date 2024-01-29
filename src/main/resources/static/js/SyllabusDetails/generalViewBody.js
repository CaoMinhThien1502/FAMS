
function loadGeneralViewBody(){
    const syllabusBody = document.getElementById("syllabus-body");
    syllabusBody.innerHTML = '';
    syllabusBody.innerHTML = `
     <div class="syllabus-create-container" id="syllabus-general-body">
        <div class "syllabus-view-Header" style="width: 98%; ">
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
                                        <img src="img/line-200.svg" alt="">
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
                            <select id="version-selector">
                                <option value="" disabled selected hidden>${data.generalInfoFormDTODetails.version}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div id="program-meta-data">
                <div id="program-meta-data-line-1">
                    <div id="program-meta-data-line-1-text-1">8</div>
                    <div id="program-meta-data-line-1-text-2">days</div>
                    <div id="program-meta-data-line-1-text-3">(68 hours)</div>
                </div>
                <div id="program-meta-data-line-2">
                    Modified on 23/07/2022 by Warrior Tran
                </div>
            </div>
        </div>

        <div class="syllabus-creation-body" style="flex-direction: column; border-radius: 0px 0px 10px 10px;
                                                                        border-top: 1px solid var(--Box, #F1F1F1);gap:20px;
                                                                        background: #FFF;">
            <div class="syllabus-tab" style="margin-left: 20px;">
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
            <div id="syllabus-creation-body-top">
                <div id="syllabus-creation-body-top-1">
                    <div id="syllabus-creation-body-top-1-level">
                        <div id="syllabus-creation-body-top-1-level-left">
                            <img src="img/grade.svg" alt="">
                            Level
                        </div>
                        <div id="syllabus-creation-body-top-1-level-right">
                            All Levels
                        </div>
                    </div>

                    <div id="syllabus-creation-body-top-1-attendee-number">
                        <div id="syllabus-creation-body-top-1-attendee-number-left">
                            <img src="img/group.svg" alt="">
                            Attendee number
                        </div>
                        <div id="syllabus-creation-body-top-1-attendee-number-right">
                            20
                        </div>
                    </div>

                    <div id="syllabus-creation-body-top-1-output-standard">
                        <div id="syllabus-creation-body-top-1-output-standard-left">
                            <img src="img/verified_user.svg" alt="">
                            Output standard
                        </div>
                        <div id="syllabus-creation-body-top-1-output-standard-right">
                            H4SD
                        </div>
                    </div>

                </div>
                <div id="syllabus-creation-body-top-2">
                    <div id="syllabus-creation-body-top-2-top">
                        <img src="img/settings.svg" alt="">
                        Technical Requirement(s)
                    </div>
                    <div id="syllabus-creation-body-top-2-bottom">
                        <ul>Trainees’ PCs need to have following software installed & run without any issues:
                            <li>Microsoft SQL Server 2005 Express</li>
                            <li>Microsoft Visual Studio 2017</li>
                            <li>Microsoft Office 2007 (Visio, Word, PowerPoint)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="syllabus-creation-body-bottom">
                <div id="syllabus-creation-body-bottom-top">
                    <img src="img/filter_center_focus.svg" alt="">
                    Course objectives
                </div>
                <div id="syllabus-creation-body-bottom-bottom">
                    This topic is to introduce about C# programming language knowledge; adapt trainees with skills, lessons and practices which is specifically used in the Fsoft projects.
                    In details, after completing the topic, trainees will:
                    - Understand basic concepts of high-level programming languages (keyword, statement, operator, control-of-flow)
                    - Understand and distinguish two concepts: class (Class) and object (Object)
                    - Understand and apply object-oriented programming knowledge to resolve simple problems (Inheritance, Encapsulation, Abstraction, Polymorphism)
                    - Working with some of the existing data structures in C# (List, ArrayList, HashTable, Dictionary)
                    - Know how to control program errors (use try ... catch..finally, throw, throws)
                    - Be able to working with concurrency and multi-thread in C#
                    - Be able to working with common classes in ADO.net: SqlConnection, SqlCommand, SqlParameter, SqlDataAdapter, SqlDataReader
                    - Be able to manipulate SQL data from Window Form Application via 4 basic commands: Add, Update, Delete, Select
                    - Know how to design UI screen in Window Form Application
                    - Know how to use approciate controls for each field/data type: Textbox, Label, Combobox, Radio, DateTimePicker,  NumericUpDown, RichTextBox
                </div>
            </div>
    </div>
    `;

    loadVersionSelector();

    if (data.generalInfoFormDTODetails.status=="Active"){
        $("#activate-syllabus-btn").hide();
    }else {
        $("#de-activate-syllabus-btn").hide();
    }

    console.log(data);
}




function ShowDropDownTab(el) {
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
        window.location.href = "/syllabus/List";
        console.log(response);
    }

    if (window.confirm("Do you really want to delete this syllabus?")) {
        deleteRequest(syllabusId, "syllabus/details", successFunction);
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
    let total_duration = assignment_lab_duration + concept_lecture_duration + guides_review_duration + test_quiz_duration + exam_duration;
    let assignment_lab_percent= assignment_lab_duration/total_duration*100;
    let concept_lecture_percent = concept_lecture_duration/total_duration*100;
    let guides_review_percent = guides_review_duration/total_duration*100;
    let test_quiz_percent = test_quiz_duration/total_duration*100;
    let exam_percent = exam_duration/total_duration*100;
    let seminar_workshop_percent = seminar_workshop_duration/total_duration*100;
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
