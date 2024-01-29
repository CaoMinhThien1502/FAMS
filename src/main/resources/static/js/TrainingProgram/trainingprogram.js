//<!--    Initialize DataTable-->
var table = $("#training-program-table").DataTable({
    searching: false,
    info: false,
    columns: [
        null, null, null, null, null, {className: "programStatus"}, null
    ],
    columnDefs: [{ targets: [2, 6], orderable: false }]
});

$(document).ready(function() {
    if (requestResult.status === "success") {
        showSuccessAlert();
    }

    if (requestResult.status === "error") {
        showErrorAlert();
    }
});

$(document).ready(function() {
    applyStatusStyles();

    $("#training-program-table").on("draw.dt", function() {
        applyStatusStyles();
    });
});

function applyStatusStyles() {
    $(".programStatus").each(function() {
        var status = $(this).text().trim();
        var styleToAdd = "";

        if (status === "ACTIVE") {
            styleToAdd = 'background-color: #2d3748;';
        } else if (status === "INACTIVE") {
            styleToAdd = 'background-color: #b9b9b9;';
        } else if (status === "DRAFT") {
            styleToAdd = 'background-color: #285d9a;';
        }

        $(this).attr("style", styleToAdd);
    });
}

function showSuccessAlert() {
    swal({
        title: "Request handled successfully",
        text: requestResult.message,
        icon: "success"
    }).then(function() {
        window.location.href = "/trainingprogram";
    });
    requestResult = "";
}

function showErrorAlert() {
    swal({
        title: "There has been an error for your request",
        text: requestResult.message,
        icon: "error"
    });
    requestResult = "";
}

//<!--    Show/Hide Dropdown-->
function myFunction(el) {
    if (el.nextElementSibling.classList.contains("show")) {
        el.nextElementSibling.classList.toggle("show");
    }
    else {
        let dropdown = document.querySelectorAll(".dropdown-content");
        dropdown.forEach(o => o.classList.remove("show"));
        el.nextElementSibling.classList.toggle("show");
    }
}

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

//<!--    Search Function-->
let allSearchResults = [];
let keysSearch = [];
var input = document.getElementById("search-input");

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && input.value.trim() !== "") {
        let search = document.getElementById("search-keyword");
        let item = document.createElement("div");
        item.className = "search-item";
        const key = input.value.trim().toLowerCase();
        item.innerHTML += `
            ${key}
            <span>&#10005;</span>
        `

        keysSearch.push(key);
        searchTrainingProgram(keysSearch);

        search.appendChild(item);
        input.value = "";

        let deleteButton = item.getElementsByTagName("span")[0];
        deleteButton.addEventListener("click", () => {
            const index = keysSearch.indexOf(key);
            if (index !== -1) {
                keysSearch.splice(index, 1);
                searchTrainingProgram(keysSearch);
            }

            item.remove();
        });
    }
});

document.querySelectorAll(".search-item").forEach(element => {
    let deleteButton = element.getElementsByTagName("span")[0];
    deleteButton.addEventListener("click", () => {
        const removedValue = element.textContent.trim();
        const index = keysSearch.indexOf(removedValue);

        if (index !== -1) {
            keysSearch.splice(index, 1);
            searchTrainingProgram(keysSearch);
        }

        element.remove();
    });
});

function searchTrainingProgram(searchValue) {
    let url = "";
    if (searchValue.length === 0) {
        url = "/trainingprogram/";
    }
    else {
        url = "/trainingprogram/search?nameList=" + searchValue;
    }
    console.log(searchValue);
    $.ajax({
        url: url,
        method: "GET",
        success: function (response) {
            allSearchResults = [];
            allSearchResults.push(response);
            console.log(allSearchResults);
            updateTableData(allSearchResults);
            getFilterValues();
            if (Object.keys(filterValues).length !== 0) {
                performFilterTable();
            } else {
                console.log("The filter values are empty");
            }
        },
        error: function (error) {
            alert(error);
        }
    });
}

function updateTableData(data) {
    $("#training-program-table").DataTable().clear().draw();

    let tableData = [];

    data.forEach(searchResult => {
        searchResult.forEach(element => {
            let elementArr = [];
            elementArr.push(element.trainingProgramCode);
            elementArr.push(element.name);
            elementArr.push(element.createDate);
            elementArr.push(element.createBy);
            elementArr.push(element.duration + ' days');
            elementArr.push(element.status);

            let programCode = element.trainingProgramCode;
            let status = element.status;

            if (status == "ACTIVE") {
                elementArr.push('<div class="dropdown">\n' +
                    '                <a class="dropbtn" onclick="myFunction(this)" ><img src="img/more_horizontal.svg" style="pointer-events: none;"></a>\n' +
                    '                <div class="dropdown-content">\n' +
                    '                   <h6>Manage</h6>\n' +
                    '                   <a href="/trainingprogram/detail?trainingProgramCode=' + programCode + '">\n' +
                    '                       <img src="img/folder.svg">\n' +
                    '                       Training material</a>\n' +
                    '                   <a href="/trainingprogram/update?code=' + programCode + '">\n' +
                    '                       <img src="img/create-1.svg">\n' +
                    '                       Update program</a>\n' +
                    '                   <a href="#" onclick="duplicateProgram(\'' + programCode + '\')">\n' +
                    '                       <img src="img/duplicate.svg">\n' +
                    '                       Duplicate program</a>\n' +
                    '                   <a href="#" onclick="deactivateProgram(\'' + programCode + '\', \'' + status + '\')">\n' +
                    '                       <img src="img/visibility-off-1.svg">\n' +
                    '                       De-activate Program</a>\n' +
                    '                </div>\n' +
                    '            </div>');
            } else if (status == "INACTIVE") {
                elementArr.push('<div class="dropdown">\n' +
                    '                <a class="dropbtn" onclick="myFunction(this)" ><img src="img/more_horizontal.svg" style="pointer-events: none;"></a>\n' +
                    '                <div class="dropdown-content">\n' +
                    '                   <h6>Manage</h6>\n' +
                    '                   <a href="/trainingprogram/detail?trainingProgramCode=' + programCode + '">\n' +
                    '                       <img src="img/folder.svg">\n' +
                    '                       Training material</a>\n' +
                    '                   <a href="/trainingprogram/update?code=' + programCode + '">\n' +
                    '                       <img src="img/create-1.svg">\n' +
                    '                       Update program</a>\n' +
                    '                   <a href="#" onclick="duplicateProgram(\'' + programCode + '\')">\n' +
                    '                       <img src="img/duplicate.svg">\n' +
                    '                       Duplicate program</a>\n' +
                    '                   <a href="#" onclick="deactivateProgram(\'' + programCode + '\', \'' + status + '\')">\n' +
                    '                       <img src="img/visibility.svg">\n' +
                    '                       Activate Program</a>\n' +
                    '                </div>\n' +
                    '            </div>');
            } else {
                elementArr.push('<div class="dropdown">\n' +
                '                <a class="dropbtn" onclick="myFunction(this)" ><img src="img/more_horizontal.svg" style="pointer-events: none;"></a>\n' +
                '                <div class="dropdown-content">\n' +
                '                   <h6>Manage</h6>\n' +
                '                   <a href="/trainingprogram/detail?trainingProgramCode=' + programCode + '">\n' +
                '                       <img src="img/folder.svg">\n' +
                '                       Training material</a>\n' +
                '                   <a href="/trainingprogram/update?code=' + programCode + '">\n' +
                '                       <img src="img/create-1.svg">\n' +
                '                       Update program</a>\n' +
                '                   <a href="#" onclick="deactivateProgram(\'' + programCode + '\', \'' + status + '\')">\n' +
                '                       <img src="img/visibility.svg">\n' +
                '                       Activate Program</a>\n' +
                '                </div>\n' +
                '            </div>');
            }
            tableData.push(elementArr);
        });
    });

    $("#training-program-table").DataTable().rows.add(tableData).draw();
    applyStatusStyles();
    originalData = table.rows().data();
}

var requestResult = {
    status: "",
    message: ""
};

function duplicateProgram(programCode) {
    $.ajax({
        url: "/trainingprogram/duplicate?trainingProgramCode=" + programCode,
        method: "POST",
        success: function(response) {
            requestResult.status = "success";
            requestResult.message = "Training program has been duplicated successfully"
            showSuccessAlert();
        },
        failure: function(error) {
            requestResult.status = "error";
            requestResult.message = "There has been an error duplicating"
            showErrorAlert();
            console.log(error);
        }
    });
}

function deactivateProgram(programCode, status) {
    $.ajax({
        url: "/trainingprogram/updatestatus?programCode=" + programCode + "&status=" + status,
        method: "POST",
        success: function(response) {
            searchTrainingProgram(keysSearch);
        },
        failure: function(error) {
            alert(error);
        }
    });
}

//<!--    Filter Function-->
$(document).ready(function() {
    $("#filter-created-by").val(null).trigger("change");
    $("#filter-form")[0].reset();
});

$("#open-filter-dialog-button").click(() => {
    $("#filter-option-dialog")[0].showModal();
});

$("#cancel-filter-option-dialog-button").click(function (event) {
    $("#filter-option-dialog")[0].close();
});

$("#reset-filter-option-dialog-button").click(function (event) {
    $("#filter-created-by").val(null).trigger("change");
    $("#filter-form")[0].reset();
});

$("#filter-created-by").select2({
    dropdownParent: $($("#filter-option-dialog")),
    closeOnSelect: false,
    width: "resolve"
});

$(document).ready(function() {
    $.ajax({
        url: "api/user",
        method: "GET",
        success: function(response) {
            var selectElement = $("#filter-created-by");

            selectElement.empty();

            response.forEach(element => {
                if (element.role.role.toLowerCase() == "super_admin" || element.role.role.toLowerCase() == "admin") {
                    var option = $("<option>").val(element.name).text(element.name);
                    selectElement.append(option);
                }
            });
        },
        error: function(error) {
            console.error("Error fetching user data:", error);
        }
    });
});

function validateDurationInput(input) {
    input.value = input.value.replace(/[^0-9]/g,'');
}

$("#filter-form").submit(function(event) {
    event.preventDefault();
    getFilterValues();

    if (Object.keys(filterValues).length === 0) {
        searchTrainingProgram(keysSearch);
    } else {
        performFilterTable();
    }
});

var filterValues = {};

function getFilterValues() {
    var arr1 = $("#filter-form").serializeArray();
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
    filterValues = keyValues;
    console.log(JSON.stringify(keyValues));

    $("#filter-option-dialog")[0].close();
}

var originalData = table.rows().data();

function performFilterTable() {
    var table = $("#training-program-table").DataTable();

    var allData = originalData;
    var filteredData = [];

    allData.each(function(rowData) {
        var match = true;

        var startDate = filterValues["startDate"];
        var endDate = filterValues["endDate"];

        if ((!startDate && endDate) || (startDate && !endDate)) {
            alert("Please enter both dates.");
            return false;
        }

        if (startDate && endDate && startDate > endDate) {
            filterValues["startDate"] = endDate;
            filterValues["endDate"] = startDate;
        }

        if (startDate && endDate) {
            var date = rowData[2];

            if (date < startDate || date > endDate) {
                match = false;
            }
        }

        var createdByList = filterValues["createdByList"];
        if (createdByList && createdByList.length > 0) {
            var createdBy = rowData[3];

            if (!createdByList.some(function(item) {
                return item.toLowerCase() === createdBy.toLowerCase();
            })) {
                match = false;
            }
        }

        var durationValue = filterValues["duration"];

        if (durationValue) {
            var duration = rowData[4].split(" ")[0];

            if (duration != durationValue) {
                match = false;
            }
        }

        var statusList = filterValues["statusList"];

        if (statusList && statusList.length > 0) {
            var status = rowData[5];

            if (!statusList.some(function(item) {
                return item.toLowerCase() === status.toLowerCase();
            })) {
                match = false;
            }
        }

        if (match) {
            filteredData.push(rowData);
        }
    });

    table.clear();

    table.rows.add(filteredData).draw();
    applyStatusStyles();
//    originalData = table.rows().data();
}

$(document).ready(function() {
    const programNameCheckBox = $("#program-name-checkbox");
    const allowRadio = $("#allowRadio");
    const replaceRadio = $("#replaceRadio");
    const skipRadio = $("#skipRadio");

    programNameCheckBox.change(function() {
        const checked = programNameCheckBox.prop("checked");
        allowRadio.prop("disabled", !checked);
        replaceRadio.prop("disabled", !checked);
        skipRadio.prop("disabled", !checked);
    });

    $("#importMessageModal").on("click", ".btn-primary", function() {
        $("#importMessageModal").modal("hide");
        window.location.href = "/trainingprogram";
    });
});

$(document).ready(function() {
    const programFileImport = $("#programFileImport");
    const importFile = $("#choose-file");
    const fileInfo = $("#file-info");
    const selectedFilename = $("#selected-filename");
    const changeFileButton = $("#change-file");

    importFile.click(function(e) {
        e.preventDefault();
        programFileImport.click();
    });

    programFileImport.change(function() {
        const file = event.target.files[0];

        if (file) {
            const acceptedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

            if (!acceptedTypes.includes(file.type)) {
                alert("Only accept CSV and XLSX file");
                programFileImport.val("");
            } else {
                importFile.hide();
                selectedFilename.text(file.name);
                fileInfo.show();
            }
        }
    });

    changeFileButton.click(function() {
        programFileImport.val("");
        fileInfo.hide();
        importFile.show();
    });
});

const importForm = document.getElementById("import-training-program-form");
importForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(importForm);
    const fileInput = document.getElementById("programFileImport");
    let errorMessage = "";

    let username = document.getElementById("groupName").textContent;
    let encoding = document.getElementById("encoding-select").value;
    let separator = document.getElementById("separator-select").value;
    let programNameCheckBox = document.getElementById("program-name-checkbox").checked;
    let radioValue = document.querySelector('input[name="choice"]:checked').value;

    formData.append("encoding", encoding);
    formData.append("separator", separator);
    formData.append("programNameCheckBox", programNameCheckBox);
    formData.append("radio", radioValue);
    formData.append("username", username);

    fileInput.addEventListener("change", handleFileSelect);

    function handleFileSelect(e) {
        formData.append("file", fileInput.files[0]);
    }

    $.ajax({
        url: "/trainingprogram/import",
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function(response) {
            $("#import-training-program-form")[0].reset();
            $("#import-training-program-dialog")[0].close();

            requestResult.status = "success";
            requestResult.message = "Training program import successfully";
            showSuccessAlert();
        },
        error: function(error) {
            $("#import-training-program-form")[0].reset();
            $("#import-training-program-dialog")[0].close();

            requestResult.status = "error";
            requestResult.message = "Training program import failed";
            showErrorAlert();
        }
    });
}

$("#open-import-training-program-dialog-button").click(() => {
    $("#import-training-program-dialog")[0].showModal();
});

$(".close-import-training-program-dialog-button").click(function() {
    event.preventDefault();
    $("#import-training-program-form")[0].reset();
    $("#import-training-program-dialog")[0].close();
});
