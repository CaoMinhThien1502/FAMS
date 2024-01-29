
const permissionIcons = {
    FULL_ACCESS: 'done', // Thay 'done' bằng tên Material Icon tương ứng
    VIEW: 'visibility',
    MODIFY: 'create',
    ACCESS_DENIED: 'block',
    CREATE: 'add'
};
$("#updateButton").click(function () {
    window.location.href = "/updatePermission";
});
$("#open-filter-dialog-button").click(() => {
    $("#filter-option-dialog")[0].showModal();
});
$(document).ready(function () {
    $("#filter-class-location").select2({
        dropdownParent: $($("#filter-option-dialog")),
        closeOnSelect: false,
        width: "resolve"
    });

    $.ajax({
        url: "/api/permissions",//moi them
        //--------------------------
        method: "GET",
        success: function (response) {
            let tableData = [];
            response.forEach(element => {
                let elementArr = [];
                elementArr.push('<b>' + element.role + '</b>');
                elementArr.push(`<i class="material-icons" style="position: relative; top:5.5px">${permissionIcons[element.syllabus]}</i>`+ " " +element.syllabus);
                elementArr.push(`<i class="material-icons" style="position: relative; top:5.5px">${permissionIcons[element.trainingProgram]}</i>`+ " " +element.trainingProgram);
                elementArr.push(`<i class="material-icons" style="position: relative; top:5.5px">${permissionIcons[element.clazz]}</i>`+ " " +element.clazz);
                elementArr.push(`<i class="material-icons" style="position: relative; top:5.5px">${permissionIcons[element.learningMaterial]}</i>`+ " " +element.learningMaterial);
                elementArr.push(`<i class="material-icons" style="position: relative; top:5.5px">${permissionIcons[element.userManagement]}</i>`+ " " +element.userManagement);
                tableData.push(elementArr);
            });
            //-------------------------------
            $("#user-information-table").DataTable({
                data: tableData,
                searching: false,
                paging: false,
                info: false,
                order:false
            });
        },
        error: function (error) {
            alert(error)
        }
    });
    //----------------------------------
});
function getUserTableData(){
    $.ajax({
        url: "https://fabackend.azurewebsites.net/api/User/Get-All-User",
        method: "GET",
        success: function (response) {
            let tableData = [];
            response.forEach(element => {
                let elementArr = [];
                elementArr.push(element.id);
                elementArr.push(element.name);
                elementArr.push(element.email);
                elementArr.push(element.dob);
                elementArr.push(element.gender);
                elementArr.push(element.userRole);
                tableData.push(elementArr);
            });
            $("#user-information-table").DataTable().clear().rows.add(tableData).draw()
        },
        error: function(error){
            alert(error)
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
$("#reset-filter-option-dialog-button").click(function (event) {
    $("#filter-class-location").val(null).trigger("change");
});
$("#cancel-filter-option-dialog-button").click(function (event) {
    $("#filter-class-location").val(null).trigger("change");
    $("#filter-option-dialog")[0].close();
});
$("#open-add-user-dialog-button").click(() => {
    $("#add-user-dialog")[0].showModal();
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
            isValid=false;
        }
        if (key === "email" && !value.trim().match(/^[a-z0-9]+@\w+\.\w+$/)) {
            $("#invalid-email-address").text("Invalid email address");
            $("#input-user-email-address").addClass("is-invalid");
            isValid=false;
        }
        if (key === "phone" && !value.trim().match(/[0-9]{10}/)) {
            $("#invalid-phone-number").text("Invalid phone number");
            $("#input-user-phone").addClass("is-invalid");
            isValid=false;
        }
        if (key === "dob" && value.trim().length === 0) {
            $("#invalid-date-of-birth").text("Invalid date of birth");
            $("#pick-date-of-birth").addClass("is-invalid");
            isValid=false
        }
        if (value==="true") {
            value = true
        }
        if (value==="false"){
            value = false
        }
        keyValues[key] = value;
    });
    if (isValid){
        console.log(JSON.stringify(keyValues));
        $.ajax({
            url:"/api/User/Add-User",
            method:"POST",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(keyValues),
            success: function(){
                alert("Success");
                $("#add-user-dialog")[0].close();
                getUserTableData();
            },
            error:function(error){
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
    $(this).prop("disabled",true);
    if ($(".nav-collapsed").length === 0) {
        collapseNavbar();
    } else {
        expandNavbar();
    }
    setTimeout(() => {
        $(this).prop("disabled",false);
    }, 150);
});
$(".btn-nav").click(function () {
    $(this).prop("disabled",true);
    if ($(".nav-collapsed").length !== 0) {
        expandNavbar();
    }
    setTimeout(() => {
        $(this).prop("disabled",false);
    }, 150);
});
function expandNavbar() {
    $(".nav-collapsed").removeClass("nav-collapsed");
    $(".nav-text").removeClass("hide");
    $(".nav-dropdown").removeClass("hide");
    $("#main-navigation-menu").animate({ width: navWidth }, 150, function () {
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
    $("#main-navigation-menu").animate({ width: closeNavWidth }, 150, function () {
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
    $(this).prop("disabled",true);
    let dropdown = $(this).find(".nav-dropdown");
    $(".btn-active").removeClass("btn-active");
    $(this).addClass("btn-active");
    if (dropdown.length !== 0) {
        dropdown.toggleClass("nav-dropdown-open");
        $(this).next(".collapsing").children(".btn-nav-sub:first-child").addClass("btn-active");
    }
    setTimeout(() => {
        $(this).prop("disabled",false);
    }, 150);
});
$(".btn-nav-sub").click(function () {
    $(this).prop("disabled",true);
    $(".btn-active").removeClass("btn-active");
    $(this).addClass("btn-active");
    $(this).parent(".collapse").prev(".btn-nav").addClass("btn-active");
    setTimeout(() => {
        $(this).prop("disabled",false);
    }, 150);
});

