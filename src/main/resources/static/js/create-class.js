function addTrainer(clickedLi) {
    var id = clickedLi.getAttribute('value');
    console.log(id);
    var trainer_id = clickedLi.getAttribute('id');
    const test = document.getElementById(trainer_id);
    // var contentId = id.replace('button-', 'group-');
    const group = document.querySelector("#group-" + id);
    $('#group-' + id).css('opacity', '1');

    // var addId = id.replace('button-', 'add-');
    $('#add-' + id).css('display', 'none');
    // var dialogId = id.replace('button-', 'trainer-box-');
    $('#trainer-box-' + id).css('display', 'none');
    $('#over').css('display', 'none');
    // var button = document.getElementById(id);
    var trainer = trainer_id.replace('button-', '');
    console.log(trainer);
    group.innerHTML = "";
    group.innerHTML =
        " <div class=\"overlap-group\">\n" +
        "     <img\n" +
        "             class=\"mask-group\" style='border-radius: 50px' \n" +
        "             src=\"/img/trainer.png\"\n" +
        "     />\n" +
        "     <div class=\"ellipse\"></div>\n" +
        " </div>" +
        "<input name='trainer' type='hidden' value='" + trainer + "'>";

}

$(document).ready(function () {
    $('.arrow-drop-down-wrapper').click(function () {
        var id = $(this).attr('id');
        var contentId = id.replace('unit-', 'content-');

        $('#' + contentId).toggle();
    });
})
$(document).ready(function () {
    $('a.trainer-window').click(function () {
        var loginBox = $(this).attr('href');
        //cho hiện hộp đăng nhập trong 300ms
        $(loginBox).fadeIn(300);


        // thêm phần tử id="over" vào sau body
        $('body').append('<div id="over">');
        $('#over').fadeIn(300);


        return false;
    });


    // khi click đóng hộp thoại
    $(document).on('click', "a.close, #over", function () {
        $('#over, .trainer-box').fadeOut(300, function () {
            $('#over').remove();
        });
        return false;
    });
});
$(document).ready(function () {
    // Kích hoạt datepicker với format MM/dd/yyyy
    $('#datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        autoclose: true,
        minDate: new Date()
    });
});
$(document).ready(function () {
    // Kích hoạt datepicker với format MM/dd/yyyy
    $('#datepicker-end').datepicker({
        dateFormat: 'yy-mm-dd',
        autoclose: true,
        minDate: new Date()
    });
});

function myFunction(el) {
    if (el.nextElementSibling.classList.contains("show")) {
        el.nextElementSibling.classList.toggle("show");
    } else {
        let dropdown = document.querySelectorAll(".dropdown-content");
        dropdown.forEach(o => o.classList.remove("show"));
        el.nextElementSibling.classList.toggle("show");
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function addTrainingProgram(clickedLi) {
    var text = clickedLi.getAttribute('value');
    $.ajax({
        type: "GET",
        url: "/trainingprogram/insert-training",
        data: {text: text},
        success: function (data) {
            $('#in-search').css('display', 'none');
            var div = $('#training-program-child');
            div.css('display', 'block');
            const divToClear = document.querySelector(".training-program-child");
            divToClear.innerHTML = " ";
            data.forEach(function (trainingItem) {
                var tp = $('#next-create');
                var input = '<input type="hidden" name="training_name" value="' + trainingItem.name + '" ">';
                tp.append(input);
                var div_child =
                    ' <div  class="training-program-child" id="training-program-child" style="margin-top: -10px;display: block;">' +
                    '   <div class="program-name">\n' +
                    '       <div class="frame">\n' +
                    '           <div class="text-wrapper">' + trainingItem.name + '</div>\n' +
                    '               <input type="hidden" name="training_program_name" value="' + trainingItem.name + '">' +
                    '       </div>\n' +
                    '   </div>\n' +
                    ' <div class="syllabus-meta">\n' +
                    '   <p class="div"><span class="span">' + trainingItem.duration + '</span> <span class="text-wrapper-2">(' + trainingItem.duration * 24 + 'hours)</span></p>\n' +
                    '   <div class="text-wrapper-3">|</div>\n' +
                    '       <p class="div">\n' +
                    '           <span class="span">Modified on </span>\n' +
                    '           <span class="text-wrapper-2">' + trainingItem.modifiedDate + '</span>\n' +
                    '           <span class="span"> by </span>\n' +
                    '           <span class="text-wrapper-4">' + trainingItem.modifiedBy + '</span>\n' +
                    '       </p>\n' +
                    '   </div>' +
                    ' </div>';
                const dayToClear = document.querySelector("#days");
                const hourToClear = document.querySelector("#hours");
                dayToClear.innerHTML = "<div id=\"days\" style=\"color: white\" class=\"text-wrapper\">" + trainingItem.duration + "</div>"
                hourToClear.innerHTML = "<div id=\"hours\" class=\"hours\">(" + trainingItem.duration * 24 + "hours)</div>"
                div.append(div_child);
            });
        }
    });
    $.ajax({
        type: "GET",
        url: "/api/v1/syllabus/show-create-class",
        data: {text: text},
        success: function (data) {
            $('#syllabus-none').css('display', 'none');
            var div_syllabus = $('#syllabus-content');
            div_syllabus.css('display', 'block');
            const syllabus = document.querySelector(".syllabus");
            syllabus.remove();
            var div_content = $('#none-or-content');
            data.forEach(function (syllabusItem) {
                var content =
                    '<div class="syllabus" id="syllabus-content" style="display: block;width: 100%">' +
                    '<div class="frame" style="display: inline-block;margin-top: 10px">\n' +
                    '                                                    <div class="group">\n' +
                    '                                                        <div class="overlap-group">\n' +
                    '                                                            <div class="ellipse"></div>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>\n' +
                    '                                                <div class="frame-wrapper" style="display: inline-block;top: -55px;left: -4px">\n' +
                    '                                                    <div class="div">\n' +
                    '                                                        <div class="program-name">\n' +
                    '                                                            <div class="frame-2">\n' +
                    '                                                                <div class="frame-2">\n' +
                    '                                                                    <div class="div-wrapper">\n' +
                    '                                                                        <div style="color: black" class="text-wrapper">' + syllabusItem.topicName + '</div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                    <div class="activate">\n' +
                    '                                                                        <div class="text-wrapper-2">' + syllabusItem.publicStatus + '</div>\n' +
                    '                                                                    </div>\n' +
                    '                                                                </div>\n' +
                    '                                                            </div>\n' +
                    '                                                        </div>\n' +
                    '                                                        <div class="navbar">\n' +
                    '                                                            <div class="text-wrapper-3">' + syllabusItem.version + '</div>\n' +
                    '                                                            <div class="text-wrapper-3">|</div>\n' +
                    '                                                            <p class="p">\n' +
                    '                                                                <span class="span">on </span>\n' +
                    '                                                                <span class="text-wrapper-4">' + syllabusItem.modifiedDate + '</span>\n' +
                    '                                                                <span class="span"> by ' + syllabusItem.modifiedBy + '</span>\n' +
                    '                                                            </p>\n' +
                    '                                                        </div>\n' +
                    '                                                    </div>\n' +
                    '                                                </div>';
                div_content.append(content);
            });

        }
    })
}

$(document).ready(function () {
    $('#textSearch').on('input', function () {
        var text = $(this).val();
        if (text.length >= 1) {
            $.ajax({
                type: "GET",
                url: "/trainingprogram/search-real-time",
                data: {text: text},
                success: function (data) {
                    var ul = $('#training-search-result-ul');
                    ul.empty();
                    data.forEach(function (trainingItem) {
                        var row = '<li onclick="addTrainingProgram(this)" value="' + trainingItem.name + '" style="color: black;margin-left: -33px;" id="training-search-result" class="training-program-result" >' +
                            ' <div class="training-program-result-content">' +
                            ' <div disabled>' +
                            '  <div class="text-wrapper" >' + trainingItem.name + '</div>' +
                            '<input type="hidden" name="trainingName" id="trainingName" value="' + trainingItem.name + '">' +
                            ' <div class="div">' +
                            '<div class="text-wrapper-2" style="margin-right: 100px">' + trainingItem.duration + 'days</div>' +
                            '<p class="element-by" style="margin-bottom: -6.5px">' +
                            ' <span class="span">' + trainingItem.modifiedDate + '</span>' +
                            ' <span class="text-wrapper-3">by</span>' +
                            ' <span class="span">&nbsp;</span>' +
                            ' <span class="text-wrapper-4">' + trainingItem.modifiedBy + '</span>' +
                            '</p>' +
                            ' </div>' +
                            ' </div>' +
                            ' </div>' +
                            '</li>';
                        ul.append(row);
                        $('#training-search-result').css('display', 'block')
                    });
                }
            });
        } else {
            $('#training-search-result').css('display', 'none')
        }
    });
});
$(document).ready(function () {
    $('#text-input-search-value').on('input', function () {
        var text = $(this).val();
        if (text.length >= 1) {
            $.ajax({
                type: "GET",
                url: "/class/search-real-time",
                data: {text: text},
                success: function (data) {
                    $('#class-information-table').dataTable().fnDestroy();
                    let tableData = [];
                    data.forEach(element => {
                        let elementArr = [];
                        elementArr.push(element.className);
                        elementArr.push(element.classCode);
                        elementArr.push(element.createDate);
                        elementArr.push(element.createBy);
                        elementArr.push(element.duration);
                        if (element.status === "Planning") {
                            elementArr.push("<div class='class-status-planning'>" + element.status + "<div>");
                        } else if (element.status === "Opening") {
                            elementArr.push("<div class='class-status-opening'>" + element.status + "<div>");
                        } else if (element.status === "Scheduled") {
                            elementArr.push("<div class='class-status-scheduled'>" + element.status + "<div>");
                        } else if (element.status === "Completed") {
                            elementArr.push("<div class='class-status-completed'>" + element.status + "<div>");
                        }
                        elementArr.push(element.location);
                        elementArr.push(element.fsu);
                        elementArr.push(" <style>\n" +
                            "                                        .svg {\n" +
                            "                                            pointer-events: none;\n" +
                            "                                        }\n" +
                            "                                        .dropbtn {\n" +
                            "                                            display: inline-block;\n" +
                            "                                            padding: 5px 10px;\n" +
                            "                                            border-radius: 25px;\n" +
                            "                                            white-space: normal;\n" +
                            "                                            text-align: center;\n" +
                            "                                            outline: none !important;\n" +
                            "                                            text-decoration: none !important;\n" +
                            "                                            color: #000 !important;\n" +
                            "                                            cursor: pointer;\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        .dropbtn:active,\n" +
                            "                                        .dropbtn:hover,\n" +
                            "                                        .dropbtn:focus {\n" +
                            "                                            background-color: #f1f1f1 !important;\n" +
                            "                                        }\n" +
                            "                                        .dropdown-content {\n" +
                            "                                            display: none;\n" +
                            "                                            position: absolute;\n" +
                            "                                            min-width: 160px;\n" +
                            "                                            overflow: auto;\n" +
                            "                                            background: #FFF;\n" +
                            "                                            box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.16);\n" +
                            "                                            z-index: 1;\n" +
                            "                                            left: -412%;\n" +
                            "                                            border-radius: 10px;\n" +
                            "                                            width: 229px;\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        .dropdown-content a {\n" +
                            "                                            color: #2C5282;\n" +
                            "                                            font-size: 16px;\n" +
                            "                                            padding: 12px 16px;\n" +
                            "                                            text-decoration: none;\n" +
                            "                                            display: block;\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        .dropdown-content a:hover,\n" +
                            "                                        .dropdown-content a:focus{\n" +
                            "                                            background: rgba(201, 203, 208, 0.37);\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        .show {\n" +
                            "                                            display: block;\n" +
                            "                                        }\n" +
                            "                                    </style>\n" +
                            "                                    <div class=\"dropdown\">\n" +
                            "                                        <a onclick=\"myFunction(this)\" class=\"dropbtn\">\n" +
                            "                                            <div class=\"svg\">\n" +
                            "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                            "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                            "                                                    <path\n" +
                            "                                                            d=\"M13 15C14.1046 15 15 14.1046 15 13C15 11.8954 14.1046 11 13 11C11.8954 11 11 11.8954 11 13C11 14.1046 11.8954 15 13 15Z\"\n" +
                            "                                                            fill=\"#2D3748\" />\n" +
                            "                                                    <path\n" +
                            "                                                            d=\"M20 15C21.1046 15 22 14.1046 22 13C22 11.8954 21.1046 11 20 11C18.8954 11 18 11.8954 18 13C18 14.1046 18.8954 15 20 15Z\"\n" +
                            "                                                            fill=\"#2D3748\" />\n" +
                            "                                                    <path\n" +
                            "                                                            d=\"M6 15C7.10457 15 8 14.1046 8 13C8 11.8954 7.10457 11 6 11C4.89543 11 4 11.8954 4 13C4 14.1046 4.89543 15 6 15Z\"\n" +
                            "                                                            fill=\"#2D3748\" />\n" +
                            "                                                </svg>\n" +
                            "                                            </div>\n" +
                            "                                        </a>\n" +
                            "                                        <div class=\"dropdown-content\">\n" +
                            "                                            <a href=\"/class/" + element.classCode + "/edit" + "\">\n" +
                            "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                            "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                            "                                                    <g clip-path=\"url(#clip0_45_1811)\">\n" +
                            "                                                        <path\n" +
                            "                                                                d=\"M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z\"\n" +
                            "                                                                fill=\"#285D9A\" />\n" +
                            "                                                    </g>\n" +
                            "                                                    <defs>\n" +
                            "                                                        <clipPath id=\"clip0_45_1811\">\n" +
                            "                                                            <rect width=\"24\" height=\"24\" fill=\"white\" />\n" +
                            "                                                        </clipPath>\n" +
                            "                                                    </defs>\n" +
                            "                                                </svg>\n" +
                            "                                                Edit class</a>\n" +
                            "                                            <a href=\"/class/delete/" + element.classCode + "\">\n" +
                            "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                            "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                            "                                                    <g clip-path=\"url(#clip0_45_1817)\">\n" +
                            "                                                        <path\n" +
                            "                                                                d=\"M14.12 10.47L12 12.59L9.87 10.47L8.46 11.88L10.59 14L8.47 16.12L9.88 17.53L12 15.41L14.12 17.53L15.53 16.12L13.41 14L15.53 11.88L14.12 10.47ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z\"\n" +
                            "                                                                fill=\"#2C5282\" />\n" +
                            "                                                    </g>\n" +
                            "                                                    <defs>\n" +
                            "                                                        <clipPath id=\"clip0_45_1817\">\n" +
                            "                                                            <rect width=\"24\" height=\"24\" fill=\"white\" />\n" +
                            "                                                        </clipPath>\n" +
                            "                                                    </defs>\n" +
                            "                                                </svg>\n" +
                            "                                                Delete class</a>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <script>\n" +
                            "                                        function myFunction(el) {\n" +
                            "                                            if (el.nextElementSibling.classList.contains(\"show\")) {\n" +
                            "                                                el.nextElementSibling.classList.toggle(\"show\");\n" +
                            "                                            }\n" +
                            "                                            else {\n" +
                            "                                                let dropdown = document.querySelectorAll(\".dropdown-content\");\n" +
                            "                                                dropdown.forEach(o => o.classList.remove(\"show\"));\n" +
                            "                                                el.nextElementSibling.classList.toggle(\"show\");\n" +
                            "                                            }\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        // Close the dropdown if the user clicks outside of it\n" +
                            "                                        window.onclick = function (event) {\n" +
                            "                                            if (!event.target.matches('.dropbtn')) {\n" +
                            "                                                var dropdowns = document.getElementsByClassName(\"dropdown-content\");\n" +
                            "                                                var i;\n" +
                            "                                                for (i = 0; i < dropdowns.length; i++) {\n" +
                            "                                                    var openDropdown = dropdowns[i];\n" +
                            "                                                    if (openDropdown.classList.contains('show')) {\n" +
                            "                                                        openDropdown.classList.remove('show');\n" +
                            "                                                    }\n" +
                            "                                                }\n" +
                            "                                            }\n" +
                            "                                        }\n" +
                            "                                    </script>");
                        tableData.push(elementArr);
                    });

                    $("#class-information-table").DataTable({
                        data: tableData,
                        searching: false,
                        info: false,
                        paging: true,
                    });
                }
            });
        } else {
            $.ajax({
                type: "GET",
                url: "/class/getAll",
                data: {text: text},
                success: function (data) {
                    $('#class-information-table').dataTable().fnDestroy();
                    let tableData = [];
                    data.forEach(element => {
                        let elementArr = [];
                        elementArr.push(element.className);
                        elementArr.push(element.classCode);
                        elementArr.push(element.createDate);
                        elementArr.push(element.createBy);
                        elementArr.push(element.duration);
                        if (element.status === "Planning") {
                            elementArr.push("<div class='class-status-planning'>" + element.status + "<div>");
                        } else if (element.status === "Opening") {
                            elementArr.push("<div class='class-status-opening'>" + element.status + "<div>");
                        } else if (element.status === "Scheduled") {
                            elementArr.push("<div class='class-status-scheduled'>" + element.status + "<div>");
                        } else if (element.status === "Completed") {
                            elementArr.push("<div class='class-status-completed'>" + element.status + "<div>");
                        }
                        elementArr.push(element.location);
                        elementArr.push(element.fsu);
                        elementArr.push(" <style>\n" +
                            "                                        .svg {\n" +
                            "                                            pointer-events: none;\n" +
                            "                                        }\n" +
                            "                                        .dropbtn {\n" +
                            "                                            display: inline-block;\n" +
                            "                                            padding: 5px 10px;\n" +
                            "                                            border-radius: 25px;\n" +
                            "                                            white-space: normal;\n" +
                            "                                            text-align: center;\n" +
                            "                                            outline: none !important;\n" +
                            "                                            text-decoration: none !important;\n" +
                            "                                            color: #000 !important;\n" +
                            "                                            cursor: pointer;\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        .dropbtn:active,\n" +
                            "                                        .dropbtn:hover,\n" +
                            "                                        .dropbtn:focus {\n" +
                            "                                            background-color: #f1f1f1 !important;\n" +
                            "                                        }\n" +
                            "                                        .dropdown-content {\n" +
                            "                                            display: none;\n" +
                            "                                            position: absolute;\n" +
                            "                                            min-width: 160px;\n" +
                            "                                            overflow: auto;\n" +
                            "                                            background: #FFF;\n" +
                            "                                            box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.16);\n" +
                            "                                            z-index: 1;\n" +
                            "                                            left: -412%;\n" +
                            "                                            border-radius: 10px;\n" +
                            "                                            width: 229px;\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        .dropdown-content a {\n" +
                            "                                            color: #2C5282;\n" +
                            "                                            font-size: 16px;\n" +
                            "                                            padding: 12px 16px;\n" +
                            "                                            text-decoration: none;\n" +
                            "                                            display: block;\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        .dropdown-content a:hover,\n" +
                            "                                        .dropdown-content a:focus{\n" +
                            "                                            background: rgba(201, 203, 208, 0.37);\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        .show {\n" +
                            "                                            display: block;\n" +
                            "                                        }\n" +
                            "                                    </style>\n" +
                            "                                    <div class=\"dropdown\">\n" +
                            "                                        <a onclick=\"myFunction(this)\" class=\"dropbtn\">\n" +
                            "                                            <div class=\"svg\">\n" +
                            "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                            "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                            "                                                    <path\n" +
                            "                                                            d=\"M13 15C14.1046 15 15 14.1046 15 13C15 11.8954 14.1046 11 13 11C11.8954 11 11 11.8954 11 13C11 14.1046 11.8954 15 13 15Z\"\n" +
                            "                                                            fill=\"#2D3748\" />\n" +
                            "                                                    <path\n" +
                            "                                                            d=\"M20 15C21.1046 15 22 14.1046 22 13C22 11.8954 21.1046 11 20 11C18.8954 11 18 11.8954 18 13C18 14.1046 18.8954 15 20 15Z\"\n" +
                            "                                                            fill=\"#2D3748\" />\n" +
                            "                                                    <path\n" +
                            "                                                            d=\"M6 15C7.10457 15 8 14.1046 8 13C8 11.8954 7.10457 11 6 11C4.89543 11 4 11.8954 4 13C4 14.1046 4.89543 15 6 15Z\"\n" +
                            "                                                            fill=\"#2D3748\" />\n" +
                            "                                                </svg>\n" +
                            "                                            </div>\n" +
                            "                                        </a>\n" +
                            "                                        <div class=\"dropdown-content\">\n" +
                            "                                            <a href=\"/class/" + element.classCode + "/edit" + "\">\n" +
                            "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                            "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                            "                                                    <g clip-path=\"url(#clip0_45_1811)\">\n" +
                            "                                                        <path\n" +
                            "                                                                d=\"M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z\"\n" +
                            "                                                                fill=\"#285D9A\" />\n" +
                            "                                                    </g>\n" +
                            "                                                    <defs>\n" +
                            "                                                        <clipPath id=\"clip0_45_1811\">\n" +
                            "                                                            <rect width=\"24\" height=\"24\" fill=\"white\" />\n" +
                            "                                                        </clipPath>\n" +
                            "                                                    </defs>\n" +
                            "                                                </svg>\n" +
                            "                                                Edit class</a>\n" +
                            "                                           <a href=\"/class/delete/" + element.classCode + "\">\n" +
                            "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                            "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                            "                                                    <g clip-path=\"url(#clip0_45_1817)\">\n" +
                            "                                                        <path\n" +
                            "                                                                d=\"M14.12 10.47L12 12.59L9.87 10.47L8.46 11.88L10.59 14L8.47 16.12L9.88 17.53L12 15.41L14.12 17.53L15.53 16.12L13.41 14L15.53 11.88L14.12 10.47ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z\"\n" +
                            "                                                                fill=\"#2C5282\" />\n" +
                            "                                                    </g>\n" +
                            "                                                    <defs>\n" +
                            "                                                        <clipPath id=\"clip0_45_1817\">\n" +
                            "                                                            <rect width=\"24\" height=\"24\" fill=\"white\" />\n" +
                            "                                                        </clipPath>\n" +
                            "                                                    </defs>\n" +
                            "                                                </svg>\n" +
                            "                                                Delete class</a>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <script>\n" +
                            "                                        function myFunction(el) {\n" +
                            "                                            if (el.nextElementSibling.classList.contains(\"show\")) {\n" +
                            "                                                el.nextElementSibling.classList.toggle(\"show\");\n" +
                            "                                            }\n" +
                            "                                            else {\n" +
                            "                                                let dropdown = document.querySelectorAll(\".dropdown-content\");\n" +
                            "                                                dropdown.forEach(o => o.classList.remove(\"show\"));\n" +
                            "                                                el.nextElementSibling.classList.toggle(\"show\");\n" +
                            "                                            }\n" +
                            "                                        }\n" +
                            "\n" +
                            "                                        // Close the dropdown if the user clicks outside of it\n" +
                            "                                        window.onclick = function (event) {\n" +
                            "                                            if (!event.target.matches('.dropbtn')) {\n" +
                            "                                                var dropdowns = document.getElementsByClassName(\"dropdown-content\");\n" +
                            "                                                var i;\n" +
                            "                                                for (i = 0; i < dropdowns.length; i++) {\n" +
                            "                                                    var openDropdown = dropdowns[i];\n" +
                            "                                                    if (openDropdown.classList.contains('show')) {\n" +
                            "                                                        openDropdown.classList.remove('show');\n" +
                            "                                                    }\n" +
                            "                                                }\n" +
                            "                                            }\n" +
                            "                                        }\n" +
                            "                                    </script>");
                        tableData.push(elementArr);
                    });

                    $("#class-information-table").DataTable({
                        data: tableData,
                        searching: false,
                        info: false,
                        paging: true
                    });
                }
            });

        }
    });
});


$.ajax({
    url: "/class/getAll",
    method: "GET",
    success: function (response) {
        let tableData = [];
        response.forEach(element => {
            let elementArr = [];
            elementArr.push(element.className);
            elementArr.push(element.classCode);
            elementArr.push(element.createDate);
            elementArr.push(element.createBy);
            elementArr.push(element.duration);
            if (element.status === "Planning") {
                elementArr.push("<div class='class-status-planning'>" + element.status + "<div>");
            } else if (element.status === "Opening") {
                elementArr.push("<div class='class-status-opening'>" + element.status + "<div>");
            } else if (element.status === "Scheduled") {
                elementArr.push("<div class='class-status-scheduled'>" + element.status + "<div>");
            } else if (element.status === "Completed") {
                elementArr.push("<div class='class-status-completed'>" + element.status + "<div>");
            }
            elementArr.push(element.location);
            elementArr.push(element.fsu);
            elementArr.push(" <style>\n" +
                "                                        .svg {\n" +
                "                                            pointer-events: none;\n" +
                "                                        }\n" +
                "                                        .dropbtn {\n" +
                "                                            display: inline-block;\n" +
                "                                            padding: 5px 10px;\n" +
                "                                            border-radius: 25px;\n" +
                "                                            white-space: normal;\n" +
                "                                            text-align: center;\n" +
                "                                            outline: none !important;\n" +
                "                                            text-decoration: none !important;\n" +
                "                                            color: #000 !important;\n" +
                "                                            cursor: pointer;\n" +
                "                                        }\n" +
                "\n" +
                "                                        .dropbtn:active,\n" +
                "                                        .dropbtn:hover,\n" +
                "                                        .dropbtn:focus {\n" +
                "                                            background-color: #f1f1f1 !important;\n" +
                "                                        }\n" +
                "                                        .dropdown-content {\n" +
                "                                            display: none;\n" +
                "                                            position: absolute;\n" +
                "                                            min-width: 160px;\n" +
                "                                            overflow: auto;\n" +
                "                                            background: #FFF;\n" +
                "                                            box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.16);\n" +
                "                                            z-index: 1;\n" +
                "                                            left: -412%;\n" +
                "                                            border-radius: 10px;\n" +
                "                                            width: 229px;\n" +
                "                                        }\n" +
                "\n" +
                "                                        .dropdown-content a {\n" +
                "                                            color: #2C5282;\n" +
                "                                            font-size: 16px;\n" +
                "                                            padding: 12px 16px;\n" +
                "                                            text-decoration: none;\n" +
                "                                            display: block;\n" +
                "                                        }\n" +
                "\n" +
                "                                        .dropdown-content a:hover,\n" +
                "                                        .dropdown-content a:focus{\n" +
                "                                            background: rgba(201, 203, 208, 0.37);\n" +
                "                                        }\n" +
                "\n" +
                "                                        .show {\n" +
                "                                            display: block;\n" +
                "                                        }\n" +
                "                                    </style>\n" +
                "                                    <div class=\"dropdown\">\n" +
                "                                        <a onclick=\"myFunction(this)\" class=\"dropbtn\">\n" +
                "                                            <div class=\"svg\">\n" +
                "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                "                                                    <path\n" +
                "                                                            d=\"M13 15C14.1046 15 15 14.1046 15 13C15 11.8954 14.1046 11 13 11C11.8954 11 11 11.8954 11 13C11 14.1046 11.8954 15 13 15Z\"\n" +
                "                                                            fill=\"#2D3748\" />\n" +
                "                                                    <path\n" +
                "                                                            d=\"M20 15C21.1046 15 22 14.1046 22 13C22 11.8954 21.1046 11 20 11C18.8954 11 18 11.8954 18 13C18 14.1046 18.8954 15 20 15Z\"\n" +
                "                                                            fill=\"#2D3748\" />\n" +
                "                                                    <path\n" +
                "                                                            d=\"M6 15C7.10457 15 8 14.1046 8 13C8 11.8954 7.10457 11 6 11C4.89543 11 4 11.8954 4 13C4 14.1046 4.89543 15 6 15Z\"\n" +
                "                                                            fill=\"#2D3748\" />\n" +
                "                                                </svg>\n" +
                "                                            </div>\n" +
                "                                        </a>\n" +
                "                                        <div class=\"dropdown-content\">\n" +
                "                                            <a href=\"/class/" + element.classCode + "/edit" + "\">\n" +
                "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                "                                                    <g clip-path=\"url(#clip0_45_1811)\">\n" +
                "                                                        <path\n" +
                "                                                                d=\"M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z\"\n" +
                "                                                                fill=\"#285D9A\" />\n" +
                "                                                    </g>\n" +
                "                                                    <defs>\n" +
                "                                                        <clipPath id=\"clip0_45_1811\">\n" +
                "                                                            <rect width=\"24\" height=\"24\" fill=\"white\" />\n" +
                "                                                        </clipPath>\n" +
                "                                                    </defs>\n" +
                "                                                </svg>\n" +
                "                                                Edit class</a>\n" +
                "                                            <a href=\"/class/delete/" + element.classCode + "\">\n" +
                "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                "                                                    <g clip-path=\"url(#clip0_45_1817)\">\n" +
                "                                                        <path\n" +
                "                                                                d=\"M14.12 10.47L12 12.59L9.87 10.47L8.46 11.88L10.59 14L8.47 16.12L9.88 17.53L12 15.41L14.12 17.53L15.53 16.12L13.41 14L15.53 11.88L14.12 10.47ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z\"\n" +
                "                                                                fill=\"#2C5282\" />\n" +
                "                                                    </g>\n" +
                "                                                    <defs>\n" +
                "                                                        <clipPath id=\"clip0_45_1817\">\n" +
                "                                                            <rect width=\"24\" height=\"24\" fill=\"white\" />\n" +
                "                                                        </clipPath>\n" +
                "                                                    </defs>\n" +
                "                                                </svg>\n" +
                "                                                Delete class</a>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                    <script>\n" +
                "                                        function myFunction(el) {\n" +
                "                                            if (el.nextElementSibling.classList.contains(\"show\")) {\n" +
                "                                                el.nextElementSibling.classList.toggle(\"show\");\n" +
                "                                            }\n" +
                "                                            else {\n" +
                "                                                let dropdown = document.querySelectorAll(\".dropdown-content\");\n" +
                "                                                dropdown.forEach(o => o.classList.remove(\"show\"));\n" +
                "                                                el.nextElementSibling.classList.toggle(\"show\");\n" +
                "                                            }\n" +
                "                                        }\n" +
                "\n" +
                "                                        // Close the dropdown if the user clicks outside of it\n" +
                "                                        window.onclick = function (event) {\n" +
                "                                            if (!event.target.matches('.dropbtn')) {\n" +
                "                                                var dropdowns = document.getElementsByClassName(\"dropdown-content\");\n" +
                "                                                var i;\n" +
                "                                                for (i = 0; i < dropdowns.length; i++) {\n" +
                "                                                    var openDropdown = dropdowns[i];\n" +
                "                                                    if (openDropdown.classList.contains('show')) {\n" +
                "                                                        openDropdown.classList.remove('show');\n" +
                "                                                    }\n" +
                "                                                }\n" +
                "                                            }\n" +
                "                                        }\n" +
                "                                    </script>");
            tableData.push(elementArr);
        });
        $("#class-information-table").DataTable({
            data: tableData,
            searching: false,
            info: false,
            paging: true
        });
    }
});

function getClassTableData() {
    $.ajax({
        url: "https://fabackend.azurewebsites.net/class/getAll",
        method: "GET",
        success: function (response) {
            let tableData = [];
            response.forEach(element => {
                let elementArr = [];
                elementArr.push(element.className);
                elementArr.push(element.classCode);
                elementArr.push(element.createDate);
                elementArr.push(element.createBy);
                elementArr.push(element.duration);
                elementArr.push(element.status);
                elementArr.push(element.location);
                elementArr.push(element.fsu);
                elementArr.push(" <style>\n" +
                    "                                        .svg {\n" +
                    "                                            pointer-events: none;\n" +
                    "                                        }\n" +
                    "                                        .dropbtn {\n" +
                    "                                            display: inline-block;\n" +
                    "                                            padding: 5px 10px;\n" +
                    "                                            border-radius: 25px;\n" +
                    "                                            white-space: normal;\n" +
                    "                                            text-align: center;\n" +
                    "                                            outline: none !important;\n" +
                    "                                            text-decoration: none !important;\n" +
                    "                                            color: #000 !important;\n" +
                    "                                            cursor: pointer;\n" +
                    "                                        }\n" +
                    "\n" +
                    "                                        .dropbtn:active,\n" +
                    "                                        .dropbtn:hover,\n" +
                    "                                        .dropbtn:focus {\n" +
                    "                                            background-color: #f1f1f1 !important;\n" +
                    "                                        }\n" +
                    "                                        .dropdown-content {\n" +
                    "                                            display: none;\n" +
                    "                                            position: absolute;\n" +
                    "                                            min-width: 160px;\n" +
                    "                                            overflow: auto;\n" +
                    "                                            background: #FFF;\n" +
                    "                                            box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.16);\n" +
                    "                                            z-index: 1;\n" +
                    "                                            left: -412%;\n" +
                    "                                            border-radius: 10px;\n" +
                    "                                            width: 229px;\n" +
                    "                                        }\n" +
                    "\n" +
                    "                                        .dropdown-content a {\n" +
                    "                                            color: #2C5282;\n" +
                    "                                            font-size: 16px;\n" +
                    "                                            padding: 12px 16px;\n" +
                    "                                            text-decoration: none;\n" +
                    "                                            display: block;\n" +
                    "                                        }\n" +
                    "\n" +
                    "                                        .dropdown-content a:hover,\n" +
                    "                                        .dropdown-content a:focus{\n" +
                    "                                            background: rgba(201, 203, 208, 0.37);\n" +
                    "                                        }\n" +
                    "\n" +
                    "                                        .show {\n" +
                    "                                            display: block;\n" +
                    "                                        }\n" +
                    "                                    </style>\n" +
                    "                                    <div class=\"dropdown\">\n" +
                    "                                        <a onclick=\"myFunction(this)\" class=\"dropbtn\">\n" +
                    "                                            <div class=\"svg\">\n" +
                    "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                    "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                    "                                                    <path\n" +
                    "                                                            d=\"M13 15C14.1046 15 15 14.1046 15 13C15 11.8954 14.1046 11 13 11C11.8954 11 11 11.8954 11 13C11 14.1046 11.8954 15 13 15Z\"\n" +
                    "                                                            fill=\"#2D3748\" />\n" +
                    "                                                    <path\n" +
                    "                                                            d=\"M20 15C21.1046 15 22 14.1046 22 13C22 11.8954 21.1046 11 20 11C18.8954 11 18 11.8954 18 13C18 14.1046 18.8954 15 20 15Z\"\n" +
                    "                                                            fill=\"#2D3748\" />\n" +
                    "                                                    <path\n" +
                    "                                                            d=\"M6 15C7.10457 15 8 14.1046 8 13C8 11.8954 7.10457 11 6 11C4.89543 11 4 11.8954 4 13C4 14.1046 4.89543 15 6 15Z\"\n" +
                    "                                                            fill=\"#2D3748\" />\n" +
                    "                                                </svg>\n" +
                    "                                            </div>\n" +
                    "                                        </a>\n" +
                    "                                        <div class=\"dropdown-content\">\n" +
                    "                                             <a href=\"/class/" + element.classCode + "/edit" + "\">\n" +
                    "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                    "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                    "                                                    <g clip-path=\"url(#clip0_45_1811)\">\n" +
                    "                                                        <path\n" +
                    "                                                                d=\"M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM5.92 19H5V18.08L14.06 9.02L14.98 9.94L5.92 19ZM20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3C17.4 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63Z\"\n" +
                    "                                                                fill=\"#285D9A\" />\n" +
                    "                                                    </g>\n" +
                    "                                                    <defs>\n" +
                    "                                                        <clipPath id=\"clip0_45_1811\">\n" +
                    "                                                            <rect width=\"24\" height=\"24\" fill=\"white\" />\n" +
                    "                                                        </clipPath>\n" +
                    "                                                    </defs>\n" +
                    "                                                </svg>\n" +
                    "                                                Edit class</a>\n" +
                    "                                            <a href=\"/class/delete/" + element.classCode + "\">\n" +
                    "                                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\"\n" +
                    "                                                     viewBox=\"0 0 24 24\" fill=\"none\">\n" +
                    "                                                    <g clip-path=\"url(#clip0_45_1817)\">\n" +
                    "                                                        <path\n" +
                    "                                                                d=\"M14.12 10.47L12 12.59L9.87 10.47L8.46 11.88L10.59 14L8.47 16.12L9.88 17.53L12 15.41L14.12 17.53L15.53 16.12L13.41 14L15.53 11.88L14.12 10.47ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z\"\n" +
                    "                                                                fill=\"#2C5282\" />\n" +
                    "                                                    </g>\n" +
                    "                                                    <defs>\n" +
                    "                                                        <clipPath id=\"clip0_45_1817\">\n" +
                    "                                                            <rect width=\"24\" height=\"24\" fill=\"white\" />\n" +
                    "                                                        </clipPath>\n" +
                    "                                                    </defs>\n" +
                    "                                                </svg>\n" +
                    "                                                Delete class</a>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                    <script>\n" +
                    "                                        function myFunction(el) {\n" +
                    "                                            if (el.nextElementSibling.classList.contains(\"show\")) {\n" +
                    "                                                el.nextElementSibling.classList.toggle(\"show\");\n" +
                    "                                            }\n" +
                    "                                            else {\n" +
                    "                                                let dropdown = document.querySelectorAll(\".dropdown-content\");\n" +
                    "                                                dropdown.forEach(o => o.classList.remove(\"show\"));\n" +
                    "                                                el.nextElementSibling.classList.toggle(\"show\");\n" +
                    "                                            }\n" +
                    "                                        }\n" +
                    "\n" +
                    "                                        // Close the dropdown if the user clicks outside of it\n" +
                    "                                        window.onclick = function (event) {\n" +
                    "                                            if (!event.target.matches('.dropbtn')) {\n" +
                    "                                                var dropdowns = document.getElementsByClassName(\"dropdown-content\");\n" +
                    "                                                var i;\n" +
                    "                                                for (i = 0; i < dropdowns.length; i++) {\n" +
                    "                                                    var openDropdown = dropdowns[i];\n" +
                    "                                                    if (openDropdown.classList.contains('show')) {\n" +
                    "                                                        openDropdown.classList.remove('show');\n" +
                    "                                                    }\n" +
                    "                                                }\n" +
                    "                                            }\n" +
                    "                                        }\n" +
                    "                                    </script>");
                tableData.push(elementArr);
            });
            $("#class-information-table").DataTable().clear().rows.add(tableData).draw()
        },
        error: function (error) {
            console.log(error)
        }
    });
};

$("#filter-form").submit(function (event) {
    event.preventDefault();
    console.log($(this).serializeArray());
    var arr1 = $(this).serializeArray();
    var keyValues = {};
    $.each(arr1, function (index, item) {
        // Use the "name" as the key and "value" as the value
        var key = item.name;
        var value = item.value;
        // Check if the key already exists, if so, create an array to store values
        if (keyValues.hasOwnProperty(key)) {
            keyValues[key].push(value);
        } else {
            if (key.endsWith("List")) {
                keyValues[key] = [];
                keyValues[key].push(value);
            } else {
                if (value !== "") {
                    keyValues[key] = value;
                }
            }
        }
    });
    console.log(JSON.stringify(keyValues));
});


$("#toggle-user-status").click(function () {
    $(this).prop("disabled", true);
    if ($("#user-status-label")[0].textContent === "Active") {
        $("#user-status-label")[0].textContent = "Inactive";
    } else {
        $("#user-status-label")[0].textContent = "Active";
    }
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});
$("#add-user-form").submit(function (event) {
    event.preventDefault();
    $(".is-invalid").removeClass("is-invalid")
    $(".invalid-feedback").text("");
    let arr1 = $(this).serializeArray();
    let keyValues = {}
    let isValid = true;
    $.each(arr1, function (index, item) {
        let key = item.name;
        let value = item.value;
        if (key === "name" && value.trim().length === 0) {
            $("#invalid-user-name").text("Invalid username");
            $("#input-user-name").addClass("is-invalid");
            isValid = false;
        }
        if (key === "email" && !value.trim().match(/^[a-z0-9]+@\w+\.\w+$/)) {
            $("#invalid-email-address").text("Invalid email address");
            $("#input-user-email-address").addClass("is-invalid");
            isValid = false;
        }
        if (key === "phone" && !value.trim().match(/[0-9]{10}/)) {
            $("#invalid-phone-number").text("Invalid phone number");
            $("#input-user-phone").addClass("is-invalid");
            isValid = false;
        }
        if (key === "dob" && value.trim().length === 0) {
            $("#invalid-date-of-birth").text("Invalid date of birth");
            $("#pick-date-of-birth").addClass("is-invalid");
            isValid = false
        }
        if (value === "true") {
            value = true
        }
        if (value === "false") {
            value = false
        }
        keyValues[key] = value;
    });
    if (isValid) {
        console.log(JSON.stringify(keyValues));
        $.ajax({
            url: "class/create",
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(keyValues),
            success: function () {
                alert("Success");
                $("#add-user-dialog")[0].close();
                getUserTableData();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
});
$("#input-user-name").click(function () {
    $(this).removeClass("is-invalid");
});
$("#input-user-email-address").click(function () {
    $(this).removeClass("is-invalid");
});
$("#input-user-phone").click(function () {
    $(this).removeClass("is-invalid");
});
$("#pick-date-of-birth").click(function () {
    $(this).removeClass("is-invalid");
});
$(".close-add-user-dialog-button").click(function (event) {
    event.preventDefault();
    $(".is-invalid").removeClass("is-invalid")
    $(".invalid-feedback").text("");
    $("#add-user-form")[0].reset();
    $("#add-user-dialog")[0].close();
});
var navWidth;
var closeNavWidth;
$(document).ready(function () {
    var mainNavMenu = $("#main-navigation-menu");
    navWidth = mainNavMenu.outerWidth(true);
    $("#main-navigation-menu").css("width", navWidth);
    closeNavWidth = $("#btn-nav-toggle").outerWidth(true) + navWidth - mainNavMenu.width();
    $("#btn-nav-toggle-open-icon").css("opacity", "0.5");
    $("#btn-nav-toggle-open-icon").css("transform", "rotate(-45deg)");
});
$("#btn-nav-toggle").click(function () {
    $(this).prop("disabled", true);
    if ($(".nav-collapsed").length === 0) {
        collapseNavbar();
    } else {
        expandNavbar();
    }
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});
$(".btn-nav").click(function () {
    $(this).prop("disabled", true);
    if ($(".nav-collapsed").length !== 0) {
        expandNavbar();
    }
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});

function expandNavbar() {
    $(".nav-collapsed").removeClass("nav-collapsed");
    $(".nav-text").removeClass("hide");
    $(".nav-dropdown").removeClass("hide");
    $("#main-navigation-menu").animate({width: navWidth}, 150, function () {
    });
    $("#btn-nav-toggle-open-icon").animate(
        {
            opacity: 0.5,
            angle: -45
        },
        {
            duration: 75,
            step: function (now, fx) {
                if (fx.prop === "angle") {
                    $(this).css("transform", "rotate(" + now + "deg)");
                } else {
                    $(this).css("opacity", now);
                }
            },
            complete: function () {
                $("#btn-nav-toggle-open-icon").addClass("hide");
                $("#btn-nav-toggle-close-icon").removeClass("hide");
                $("#btn-nav-toggle-close-icon").animate(
                    {
                        opacity: 1,
                        angle: 0

                    },
                    {
                        duration: 75,
                        step: function (now, fx) {
                            if (fx.prop === "angle") {
                                $(this).css("transform", "rotate(" + now + "deg)");
                            } else {
                                $(this).css("opacity", now);
                            }
                        }
                    }
                );
            }
        });
}

function collapseNavbar() {
    $("#main-navigation-menu").addClass("nav-collapsed");
    $(".collapse.show").removeClass("show");
    $(".nav-dropdown-open").removeClass("nav-dropdown-open");
    $("#main-navigation-menu").animate({width: closeNavWidth}, 150, function () {
        $(".nav-text").addClass("hide");
        $(".nav-dropdown").addClass("hide");
    });
    $("#btn-nav-toggle-close-icon").animate(
        {
            opacity: 0.5,
            angle: 45
        },
        {
            duration: 75,
            step: function (now, fx) {
                if (fx.prop === "angle") {
                    $(this).css("transform", "rotate(" + now + "deg)");
                } else {
                    $(this).css("opacity", now);
                }
            },
            complete: function () {
                $("#btn-nav-toggle-close-icon").addClass("hide");
                $("#btn-nav-toggle-open-icon").removeClass("hide");
                $("#btn-nav-toggle-open-icon").animate(
                    {
                        opacity: 1,
                        angle: 0
                    },
                    {
                        duration: 75,
                        step: function (now, fx) {
                            if (fx.prop === "angle") {
                                $(this).css("transform", "rotate(" + now + "deg)");
                            } else {
                                $(this).css("opacity", now);
                            }
                        }
                    }
                );
            }
        }
    );
}

$(".btn-nav").click(function () {
    $(this).prop("disabled", true);
    let dropdown = $(this).find(".nav-dropdown");
    $(".btn-active").removeClass("btn-active");
    $(this).addClass("btn-active");
    if (dropdown.length !== 0) {
        dropdown.toggleClass("nav-dropdown-open");
        $(this).next(".collapsing").children(".btn-nav-sub:first-child").addClass("btn-active");
    }
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});
$(".btn-nav-sub").click(function () {
    $(this).prop("disabled", true);
    $(".btn-active").removeClass("btn-active");
    $(this).addClass("btn-active");
    $(this).parent(".collapse").prev(".btn-nav").addClass("btn-active");
    setTimeout(() => {
        $(this).prop("disabled", false);
    }, 150);
});
