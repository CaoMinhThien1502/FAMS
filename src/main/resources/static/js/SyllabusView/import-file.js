$(document).ready(function(){

    $("#import-btn").on("click", function(){
        $("#import-syllabus-dialog")[0].showModal();
    });

    $("#import-cancel-btn").click(function() {
        event.preventDefault();
        $("#import-syllabus-form")[0].reset();
        $("#import-syllabus-dialog")[0].close();
    });

    const programNameCheckBox = $("#program-name-checkbox");
    const allowRadio = $("#allowRadio");
    const replaceRadio = $("#replaceRadio");
    const skipRadio = $("#skipRadio");

    programNameCheckBox.change(function() {
        const checked = programNameCheckBox.prop("checked");
        console.log(!checked);
        allowRadio.prop("disabled", !checked);
        replaceRadio.prop("disabled", !checked);
        skipRadio.prop("disabled", !checked);
    });

    $("#importMessageModal").on("click", ".btn-primary", function() {
        $("#importMessageModal")[0].close();
        window.location.href = "/syllabus/list";
    });

    const programFileImport = $("#syllabusFileInput");
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

    const importForm = document.getElementById("import-syllabus-form");
    importForm.addEventListener("submit", handleSubmit);

    var requestResult = {
        status: "",
        message: ""
    };


    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(importForm);
        const fileInput = document.getElementById("syllabusFileInput");
        let errorMessage = "";

        let encoding = document.getElementById("encoding-select").value;
        let separator = document.getElementById("separator-select").value;
        let ScanOptionCheckBox = [document.getElementById("code-checkbox").checked,
                                  document.getElementById("name-checkbox").checked];
        let radioValue = document.querySelector('input[name="choice"]:checked').value;

        formData.append("encoding", encoding);
        formData.append("separator", separator);
        formData.append("ScanOptionCheckBox", ScanOptionCheckBox);
        formData.append("radio", radioValue);

        fileInput.addEventListener("change", function(e){
             formData.append("file", fileInput.files[0]);
        });

//        function handleFileSelect(e) {
//            formData.append("file", fileInput.files[0]);
//        }

        $.ajax({
            url: "/syllabus/import",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function(response) {
               $("#import-syllabus-form")[0].reset();
               $("#import-syllabus-dialog")[0].close();

               requestResult.status = "success";
               requestResult.message = "Training program import successfully";
               showSuccessAlert();
            },
            error: function(error) {
                $("#import-syllabus-form")[0].reset();
                $("#import-syllabus-dialog")[0].close();

                requestResult.status = "error";
                requestResult.message = "Training program import failed";
                showErrorAlert();
            }
        });
    }


    function showSuccessAlert() {
        swal({
            title: "Request handled successfully",
            text: requestResult.message,
            icon: "success"
        }).then(function() {
            window.location.href = "/syllabus/list";
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

});

