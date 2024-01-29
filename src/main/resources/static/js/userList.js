$("#open-filter-dialog-button").click(() => {
  $("#filter-option-dialog")[0].showModal();
});
$(document).ready(function () {
  $("#filter-class-location").select2({
    dropdownParent: $($("#filter-option-dialog")),
    closeOnSelect: false,
    width: "resolve"
  });
  //show all
  showAllUsers();
});

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
$("#open-import-user-dialog-button").click(() => {
  $("#import-user-dialog")[0].showModal();
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

//............................................................................................................................
//chặn from nhập dob không cho nhật ngày > ngày hiện tại
// Lấy ngày hiện tại
var today = new Date().toISOString().split('T')[0];
// Gán giá trị max vào input date
document.getElementById("dob").setAttribute("max", today);
document.getElementById("pick-date-of-birth").setAttribute("max", today);
//............................................................................................................................
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
      $("#invalid-user-name").text("Name address is invalid. Please check and input again.");
      $("#input-user-name").addClass("is-invalid");
      isValid = false;
    }
    if (key === "name" && value.trim().length === 0) {
      $("#invalid-user-name").text("Name address is invalid. Please check and input again.");
      $("#input-user-name").addClass("is-invalid");
      isValid = false;
    }
    //check email
    if (key === "email") {
      checkValidCreateUser(value);
      if(existeEmailUser.includes(value)){
        $("#invalid-email-address").text("Email address is existed. Please check and input another email address.");
        $("#input-user-email-address").addClass("is-invalid");
        isValid = false;
      } else
      if(!value.trim().match(/^[a-z0-9]+@\w+\.\w+$/)){
        $("#invalid-email-address").text("Email address is invalid. Please check and input again.");
        $("#input-user-email-address").addClass("is-invalid");
        isValid = false;
      }
    }

    //check phone
    if (key === "phone" && !value.trim().match(/^[0-9]{10}$/)) {
      $("#invalid-phone-number").text("Phone is invalid. Please check and input again");
      $("#input-user-phone").addClass("is-invalid");
      isValid = false;
    }
    //check dob
    // Lấy ngày hiện tại
    var currentDate = new Date();

    if (key === "dob") {
      // Lấy ngày sinh từ value (giả sử value là định dạng ngày tháng năm YYYY-MM-DD)
      var dobValue = value.trim();
      var dobDate = new Date(dobValue);

      if (value.trim().length === 0 || isNaN(dobDate) || dobDate > currentDate){
        $("#invalid-date-of-birth").text("Date of birth is invalid. Please check and input again");
        $("#pick-date-of-birth").addClass("is-invalid");
        isValid = false
      }
    }
    if (key === "status") {
      value = value === "true";
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
      url: "/api/user/create",
      method: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(keyValues),
      success: function (response) {
        if (response){

          swal({
            title: "User is created successfully!",
            text: "Password has been sent to your Email.",
            icon: "success"
          });

        } else {
          swal({
            title: "User is created failed!",
            text: "Email already exists, please enter another email.",
            icon: "error"
          });
        }
        $("#add-user-dialog")[0].close();
        //quay về trang show all users
        performSearch(keysSearch)
        //window.location.href = "/user";
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
});

function checkValidCreateUser(emailAdd){
  $.ajax({
    url: "/api/user/checkemail/" + emailAdd,
    method: "POST",
    contentType: "application/json; charset=utf-8",
    success: function (response) {
      if (response) {
        $("#invalid-email-address").text(
            "Email address is existed. Please check and input another email address.");
        $("#input-user-email-address").addClass("is-invalid");
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}
// ..........................................................................................................................

const form = document.getElementById('import-user-form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const fileInput = document.getElementById('userFileInput');
  let errorMessage = "";

  // Lấy giá trị của select
  const encoding = document.getElementById("encoding-select").value;
  const separator = document.getElementById("separator-select").value;
  //const fullNameCheckbox = document.getElementById('fullname-checkbox').checked;
  const emailCheckbox = document.getElementById('email-checkbox').checked;
  const radioValue = document.querySelector('input[name="choice"]:checked').value;

  formData.append('encoding', encoding);
  formData.append('separator', separator);
  //formData.append('fullNameCheckbox', fullNameCheckbox);
  formData.append('emailCheckbox', emailCheckbox);
  formData.append('radio', radioValue);

  fileInput.addEventListener('change', handleFileSelect);
  function handleFileSelect(e) {
    formData.append('file', fileInput.files[0]);
  }
  $.ajax({
    url: '/api/user/import',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(response) {
      $('#importMessage').html(response.replace(/\n/g, '<br>'));
      $('#importMessageModal').modal('show');
      $("#import-user-form")[0].reset();
      $("#import-user-dialog")[0].close();
    },
    error: function(error) {
      errorMessage = error.responseText;
      showExportLogButton();
      $('#importMessage').html(errorMessage.replace(/\n/g, '<br>'));
      $('#importMessageModal').modal('show');
      $("#import-user-form")[0].reset();
      $("#import-user-dialog")[0].close();
    }
  });
  function showExportLogButton() {
    $('#exportLogBtn').show();
  }

  $('#importMessageModal').on('click', '#exportLogBtn', function () {
    // Thực hiện logic tải xuống file txt ở đây
    downloadLogFile();
  });

  //Download error_log.txt
  function downloadLogFile() {

    // Tạo đối tượng Blob từ nội dung
    var blob = new Blob([errorMessage], { type: 'text/plain' });

    // Tạo đường link để tải xuống
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'error_log.txt';

    // Thêm link vào trang và tự động kích hoạt sự kiện click
    document.body.appendChild(link);
    link.click();

    // Xóa đối tượng link sau khi tải xuống
    document.body.removeChild(link);
  }
}

$(document).ready(function () {
  const emailCheckbox = $("#email-checkbox");
  const allowRadio = $("#allowRadio");
  const replaceRadio = $("#replaceRadio");
  const skipRadio = $("#skipRadio");

  emailCheckbox.change(function () {
    const checked = emailCheckbox.prop("checked");
    allowRadio.prop("disabled", !checked);
    replaceRadio.prop("disabled", !checked);
    skipRadio.prop("disabled", !checked);
  });

  //close message modal
  $('#importMessageModal').on('click', '.btn-secondary', function () {
    $('#importMessageModal').modal('hide');
    window.location.href = "/user";
  });
  $(document).ready(function () {
    const importMessageModal = $('#importMessageModal');
    importMessageModal.on('shown.bs.modal', function () {
      importMessageModal.on('click', function (event) {
        if (event.target === importMessageModal[0]) {
          window.location.href = '/user';
        }
      });
    });
  });
});

//Select file to import
$(document).ready(function () {
  const userFileInput = $("#userFileInput");
  const importFile = $("#choose-file");
  const fileInfo = $("#file-info");
  const selectedFilename = $("#selected-filename");
  const changeFileButton = $("#change-file");

  importFile.click(function (e) {
    e.preventDefault();
    userFileInput.click();
  });

  userFileInput.change(function (event) {
    const file = event.target.files[0];

    if(file) {
      const acceptedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

      if(!acceptedTypes.includes(file.type)) {
        alert("Only accept CSV và XLSX file.");
        userFileInput.val("");
      } else {
        importFile.hide();
        selectedFilename.text(file.name);
        fileInfo.show();
      }
    }
  });

  changeFileButton.click(function () {
    userFileInput.val("");
    fileInfo.hide();
    importFile.show();
  });
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
$(".close-import-user-dialog-button").click(function (event) {
  event.preventDefault();
  $("#import-user-form")[0].reset();
  $("#import-user-dialog")[0].close();
});

function myFunction(el) {
  if (el.nextElementSibling) {
    if (el.nextElementSibling.classList.contains("show")) {
      el.nextElementSibling.classList.toggle("show");
    } else {
      let dropdown = document.querySelectorAll(".dropdown-content");
      dropdown.forEach(o => o.classList.remove("show"));
      el.nextElementSibling.classList.toggle("show");
    }
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
// .............................................................................................................................
let existeEmailUser = [];
// showAllUser
function showAllUsers() {
  // Gọi API và hiển thị kết quả
  $.ajax({
    url: "/api/user",
    method: "GET",
    success: function (response) {
      let tableData = [];
      response.forEach(element => {
        // lưu email để check
        existeEmailUser.push(element.email);

        let elementArr = [];
        if (element.role.role.toLowerCase() !== "super_admin") {
          elementArr.push(element.userId);
          elementArr.push('<strong>' + element.name + '</strong>');
          elementArr.push(element.email);
          const dob = new Date(element.dob);
          elementArr.push(dob.toLocaleDateString('en-GB'));
          // Thêm icon dựa trên giá trị gender
          if (element.gender.toLowerCase() === "male") {
            elementArr.push(
                '<img src="img/male.png" alt="Male" title="Male" class="gender-icon">');
          } else if (element.gender.toLowerCase() === "female") {
            elementArr.push(
                '<img src="img/female.png" alt="Female" title="Female" class="gender-icon">');
          }
          // status
          if (element.status) {
            elementArr.push(
                '<strong>Active</strong>');
          } else {
            elementArr.push(
                '<strong>InActive</strong>');
          }
          // .................................
          // role
          let changeRole = "";
          // if (element.role.role.toLowerCase() === "super_admin") {
          //   changeRole = "Change role"
          //   elementArr.push(
          //       '<p class="type-role-superadmin">' + element.role.role
          //       + '</p>');
          //   elementArr.push("");
          // } else
          if (element.role.role.toLowerCase() === "admin") {
            changeRole = "Change role to Trainer"
            elementArr.push(
                '<p class="type-role-admin">' + element.role.role + '</p>');
          } else {
            changeRole = "Change role to Admin"
            elementArr.push(
                '<p class="type-role-other">' + element.role.role + '</p>');
          }
          //option setting
          if (element.status){
            elementArr.push('<div class="dropdown">\n' +
                '                <a class="dropbtn" onclick="myFunction(this)" ><img src="img/more_horizontal.svg" style="pointer-events: none;"></a>\n'
                +
                '                <div class="dropdown-content">\n' +
                '                    <a href="#"  onclick="showEditUserDialog('
                + element.userId + ')">\n' +
                '                        <img src="img/create.svg">\n' +
                '                        Edit user</a>\n' +
                '                    <a href="#" id="changeRoleBtn" onclick="doChangeRole('
                + element.userId + ')">\n' +
                '                        <img src="img/role.svg">\n'
                + changeRole + '\n' +
                '                    </a>\n' +
                '                    <a href="#" onclick="deactivateUser('
                + element.userId + ')">\n' +
                '                        <img src="img/visibility_off.svg">\n'
                +
                '                        De-activate user</a>\n' +
                // '                    <a href="#contact">\n' +
                // '                        <img src="img/delete_forever.svg">\n' +
                // '                        Delete user</a>\n' +
                '                </div>\n' +
                '</div>');
          } else {
            elementArr.push('<div class="dropdown">\n' +
                '                <a class="dropbtn" onclick="myFunction(this)" ><img src="img/more_horizontal.svg" style="pointer-events: none;"></a>\n'
                +
                '                <div class="dropdown-content">\n' +
                '                    <a href="#"  onclick="showEditUserDialog('
                + element.userId + ')">\n' +
                '                        <img src="img/create.svg">\n' +
                '                        Edit user</a>\n' +
                '                    <a href="#" id="changeRoleBtn" onclick="doChangeRole('
                + element.userId + ');">\n' +
                '                        <img src="img/role.svg">\n'
                + changeRole + '\n' +
                '                    </a>\n' +
                '                    <a href="#" onclick="deactivateUser('
                + element.userId + ')">\n' +
                '                        <img src="img/visibility.svg">\n' +
                '                        Activate user</a>\n' +
                // '                    <a href="#contact">\n' +
                // '                        <img src="img/delete_forever.svg">\n' +
                // '                        Delete user</a>\n' +
                '                </div>\n' +
                '</div>');
          }
          tableData.push(elementArr);
        }
      });
      $("#user-information-table").DataTable({
        data: tableData,
        searching: false,
        paging: true,
        info: false,
        pageLength: 10,
        dom: 'lrtip',
      });

    },
    error: function (error) {
      alert(error)
    }
  });
}
// .............................................................................................................................
// search
// .............................................................................................................................
// Lưu trữ tất cả dữ liệu từ tìm kiếm
let allSearchResults = [];
let keysSearch = [];
// Get the input field
var input = document.getElementById("search-input");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter" && input.value.trim() !== "") {
    let search = document.getElementById("search-keyword");
    let item = document.createElement("div");
    item.className = "search-item";
    const key = input.value.trim().toLowerCase();
    item.innerHTML += `
                    ${key}
                    <span>&#10005;</span>
                `
    // Xu ly search
    // Call the API with the search value
    keysSearch.push(key);
    performSearch(keysSearch);
    // End
    search.appendChild(item);
    input.value = "";
    let deleteButton = item.getElementsByTagName("span")[0];
    deleteButton.addEventListener("click", () => {
      // Lấy giá trị đã chọn để loại bỏ
      const index = keysSearch.indexOf(key);
      if (index !== -1) {
        keysSearch.splice(index, 1);
        performSearch(keysSearch);
      }

      item.remove();
    });
  }
});

document.querySelectorAll(".search-item").forEach(element => {
  let deleteButton = element.getElementsByTagName("span")[0];
  deleteButton.addEventListener("click", () => {
    // Xóa từ khóa khỏi mảng keysSearch
    const removedValue = element.textContent.trim();
    const index = keysSearch.indexOf(removedValue);
    if (index !== -1) {
      keysSearch.splice(index, 1);
      performSearch(keysSearch);
    }
    element.remove();
  });
});

function performSearch(searchValue) {
  let linkUrl = "";
  if (searchValue.length === 0) {
    linkUrl = "/api/user";
  } else {
    linkUrl = "/api/user/bynames?names=" + searchValue
  }
  // Gọi API và hiển thị kết quả
  $.ajax({
    url: linkUrl,
    method: "GET",
    success: function (response) {
      // Lưu kết quả tìm kiếm vào mảng
      allSearchResults = [];
      allSearchResults.push(response);
      // Hiển thị kết quả tìm kiếm
      updateTableWithData(allSearchResults);
    },
    error: function (error) {
      alert(error)
    }
  });
}

function updateTableWithData(data) {
  // Xóa hết nội dung cũ của bảng
  $("#user-information-table").DataTable().clear().draw();

  // Thêm dữ liệu mới vào bảng
  let tableData = [];
  // Duyệt qua từng kết quả tìm kiếm và thêm vào mảng dữ liệu bảng
  data.forEach(searchResult => {
    searchResult.forEach(element => {
      // lưu email để check
      existeEmailUser.push(element.email);

      let elementArr = [];
      if (element.role.role.toLowerCase() !== "super_admin") {
        elementArr.push(element.userId);
        elementArr.push('<strong>' + element.name + '</strong>');
        elementArr.push(element.email);
        const dob = new Date(element.dob);
        elementArr.push(dob.toLocaleDateString('en-GB'));
        // Thêm icon dựa trên giá trị gender
        if (element.gender.toLowerCase() === "male") {
          elementArr.push(
              '<img src="img/male.png" alt="Male" title="Male" class="gender-icon">');
        } else if (element.gender.toLowerCase() === "female") {
          elementArr.push(
              '<img src="img/female.png" alt="Female" title="Female" class="gender-icon">');
        }
        // status
        if (element.status) {
          elementArr.push(
              '<strong>Active</strong>');
        } else {
          elementArr.push(
              '<strong>InActive</strong>');
        }
        // .................................
        // role
        let changeRole = "";
        // if (element.role.role.toLowerCase() === "super_admin") {
        //   changeRole = "Change role"
        //   elementArr.push(
        //       '<p class="type-role-superadmin">' + element.role.role
        //       + '</p>');
        //   elementArr.push("");
        // } else
        if (element.role.role.toLowerCase() === "admin") {
          changeRole = "Change role to Trainer"
          elementArr.push(
              '<p class="type-role-admin">' + element.role.role + '</p>');
        } else {
          changeRole = "Change role to Admin"
          elementArr.push(
              '<p class="type-role-other">' + element.role.role + '</p>');
        }
        //option setting
        if (element.status){
          elementArr.push('<div class="dropdown">\n' +
              '                <a class="dropbtn" onclick="myFunction(this)" ><img src="img/more_horizontal.svg" style="pointer-events: none;"></a>\n'
              +
              '                <div class="dropdown-content">\n' +
              '                    <a href="#"  onclick="showEditUserDialog('
              + element.userId + ')">\n' +
              '                        <img src="img/create.svg">\n' +
              '                        Edit user</a>\n' +
              '                    <a href="#" id="changeRoleBtn" onclick="doChangeRole('
              + element.userId + ')">\n' +
              '                        <img src="img/role.svg">\n'
              + changeRole + '\n' +
              '                    </a>\n' +
              '                    <a href="#" onclick="deactivateUser('
              + element.userId + ')">\n' +
              '                        <img src="img/visibility_off.svg">\n'
              +
              '                        De-activate user</a>\n' +
              // '                    <a href="#contact">\n' +
              // '                        <img src="img/delete_forever.svg">\n' +
              // '                        Delete user</a>\n' +
              '                </div>\n' +
              '</div>');
        } else {
          elementArr.push('<div class="dropdown">\n' +
              '                <a class="dropbtn" onclick="myFunction(this)" ><img src="img/more_horizontal.svg" style="pointer-events: none;"></a>\n'
              +
              '                <div class="dropdown-content">\n' +
              '                    <a href="#"  onclick="showEditUserDialog('
              + element.userId + ')">\n' +
              '                        <img src="img/create.svg">\n' +
              '                        Edit user</a>\n' +
              '                    <a href="#" id="changeRoleBtn" onclick="doChangeRole('
              + element.userId + ');">\n' +
              '                        <img src="img/role.svg">\n'
              + changeRole + '\n' +
              '                    </a>\n' +
              '                    <a href="#" onclick="deactivateUser('
              + element.userId + ')">\n' +
              '                        <img src="img/visibility.svg">\n' +
              '                        Activate user</a>\n' +
              // '                    <a href="#contact">\n' +
              // '                        <img src="img/delete_forever.svg">\n' +
              // '                        Delete user</a>\n' +
              '                </div>\n' +
              '</div>');
        }
        tableData.push(elementArr);
      }
    });
  });
  // Cập nhật bảng với dữ liệu mới
  $("#user-information-table").DataTable().rows.add(tableData).draw();
}

// ...........................................................................................................................
var navWidth;
var closeNavWidth;
$(document).ready(function () {
  var mainNavMenu = $("#main-navigation-menu");
  navWidth = mainNavMenu.outerWidth(true);
  $("#main-navigation-menu").css("width", navWidth);
  closeNavWidth = $("#btn-nav-toggle").outerWidth(true) + navWidth
      - mainNavMenu.width();
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
    $(this).next(".collapsing").children(".btn-nav-sub:first-child").addClass(
        "btn-active");
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

const {DatePicker, Calendar} = ReactMultiDatePicker;

ReactDOM.render(
    React.createElement(DatePicker, {
      plugins: [React.createElement(DatePickerHeader)],
      range: true,
      style: {
        border: "none",
        "box-shadow": "none"
      }
    }),
    document.getElementById("datePickerWithPlugin")
);

// Get the input field
var input = document.getElementById("search-input");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter" && input.value.trim() !== "") {
    let search = document.getElementById("search-keyword");
    let item = document.createElement("div");
    item.className = "search-item";
    item.innerHTML += `
                    ${input.value}
                    <span>&#10005;</span>
                `
    search.appendChild(item);
    input.value = "";
    let deleteButton = item.getElementsByTagName("span")[0];
    deleteButton.addEventListener("click", () => {
      item.remove();
    });
  }
});

document.querySelectorAll(".search-item").forEach(element => {
  let deleteButton = element.getElementsByTagName("span")[0];
  deleteButton.addEventListener("click", () => {
    element.remove();
  });
});
// .......................................................................................................................
// change role user
// .......................................................................................................................



// .......................................................................................................................
// update user
// .......................................................................................................................
// Định nghĩa hàm để hiển thị dialog
function showEditUserDialog(userId) {
  var editUserDialog = document.getElementById('edit-user-dialog');
  if (editUserDialog) {
    editUserDialog.style.display = 'block';
    $('.overlay').show();
    $('#edit-user-dialog').show();
    $('#edit-user-dialog').css('z-index', 1000);
    // Gửi AJAX request để lấy thông tin chi tiết của người dùng
    $.ajax({
      url: '/api/user/' + userId, // Thay thế {id} bằng ID của người dùng
      method: 'GET',
      success: function(response) {
        // Điền thông tin người dùng vào biểu mẫu "Edit User"
        $('#name').val(response.name);
        $('#email').val(response.email);
        var roleIdValue = response.role.permissionId.toString();
        var options = document.querySelectorAll('#update-roleId option');
        options.forEach(function(option) {
          if (option.value === roleIdValue) {
            option.selected = true;
            return;
          }
        });

        $('#phone').val(response.phone);

        // Lấy ngày hiện tại
        var today = new Date().toISOString().split('T')[0];
        // Gán giá trị max vào input date
        document.getElementById("dob").setAttribute("max", today);
        $('#dob').val(response.dob);

        // Đặt giới tính
        if (response.gender.toLowerCase() === 'male') {
          $('#gender-male').prop('checked', true);
        } else {
          $('#gender-female').prop('checked', true);
        }

        // Đặt trạng thái
        if (response.status === true) {
          $('#status-edit').prop('checked', true);
          $('#status-label').text('Active');
        } else {
          $('#status-edit').prop('checked', false);
          $('#status-label').text('InActive');
        }

        // Mở dialog
        $('#edit-user-dialog').show();
      },
      error: function(error) {
        alert(error);
      }
    });
    // form check status
    $("#status-edit").click(function () {
      $(this).prop("disabled", true);
      if ($("#status-label")[0].textContent === "Active") {
        $("#status-label")[0].textContent = "Inactive";
      } else {
        $("#status-label")[0].textContent = "Active";
      }
      setTimeout(() => {
        $(this).prop("disabled", false);
      }, 150);
    });
    // SAVE edit user
    $("#edit-user-form").submit(function (event) {
      event.preventDefault();
    // $('#submit-edit-user-dialog-button').click(function() {
      // event.preventDefault();
      var updatedUserData = {
        roleId: $('#update-roleId').val(),
        name: $('#name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        dob: $('#dob').val(),
        gender: $('#gender-male').is(':checked') ? 'Male' : 'Female',
        status: $('#status-edit').prop('checked')
      };
      $.ajax({
        url: '/api/user/update/' + userId,
        method: 'PUT',
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(updatedUserData),
        success: function(response) {
          if (response){

            swal({
              title: "User is updated successfully!",
              text: "",
              icon: "success"
            });

          } else {
            swal({
              title: "User is updated failed!!!",
              text: "",
              icon: "error"
            });
          }
          $("#edit-user-dialog").hide();
          $('.overlay').hide();
          //quay về trang show all users
          performSearch(keysSearch)

        },
        error: function(error) {
          // Xử lý khi có lỗi
          alert('Error: ' + error);
        }
      });
    });
  }
  // Đặt sự kiện click trên nút đóng để ẩn dialog
  $(document).on('click', '.close-edit-user-dialog-button', function() {
    // Ẩn dialog khi nút đóng được nhấn
    $('.overlay').hide();
    $('#edit-user-dialog').hide();
  });
}
$(".close-edit-user-dialog-button").click(function (event) {
  event.preventDefault();
  $("#edit-user-form")[0].reset();
  $("#edit-user-dialog")[0].close();
});
//........................................................................................................................
// Thêm hàm JavaScript để xử lý sự kiện click vào "De-activate user"
function deactivateUser(userId) {
  $.ajax({
    url: "/api/user/changeStatus/" + userId,
    method: "POST",
    success: function (response) {
      // Gọi lại hàm hiển thị tất cả người dùng sau khi xóa thành công
      performSearch(keysSearch);

    },
    error: function (error) {
      alert(error);
    }
  });
}
// ................
function doChangeRole(userId){
  $.ajax({
    url: '/api/user/changeRole/' + userId,
    method: 'PUT',
    contentType:"application/json; charset=utf-8",
    success: function(response) {
      // alert("Update Success");
      performSearch(keysSearch);
      // Cập nhật giao diện hoặc thông báo thành công
    },
    error: function(error) {
      // Xử lý khi có lỗi
      alert('Error: ' + error);
    }
  });
}