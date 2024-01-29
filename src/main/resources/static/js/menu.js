<!--menu-->
// Home
function redirectToHome() {
    window.location.href = "/home";
}

// Syllabus
function redirectToSyllabusList() {
    window.location.href = "/syllabus/list";
}
function redirectToCreateSyllabus() {
    window.location.href = "/syllabus/create";
}

// Training Program
function redirectToProgramList() {
    window.location.href = "/trainingprogram";
}
function redirectToUpdateTrainingProgram() {
    window.location.href = "/trainingprogram/update";
}
function redirectToCreateProgram() {

    window.location.href = "/trainingprogram/create";

}
// Class
function redirectToClassList() {
    window.location.href = "/class";
}
function redirectToCreateClass() {
    window.location.href = "/createClass";
}

// Training Calender
function redirectToTrainingCalender() {
    window.location.href = "/user";
}

// User Management
function redirectToUserList() {
    window.location.href = "/user";
}
function redirectToUserPermissionList() {
    window.location.href = "/userPermission";
}

// Training Calender
function redirectToLearningMaterial() {
    window.location.href = "/viewMaterials";
}

//Setting
function redirectToSettingAccount() {
    window.location.href = "/account/details";
}
function redirectToSettingCalendar() {
    window.location.href = "/calendar";
}

$(document).ready(function(){

    $.ajax({
        url: '/api/user/username',  // Điều chỉnh đường dẫn API của bạn
        success: function(response) {
            // Cập nhật nội dung phần tử HTML với giá trị từ session
            document.getElementById('groupName').innerText = response;
        },
        error: function(error) {
            console.error('Lỗi khi lấy giá trị từ session:', error);
        }
    });


 });
