function postRequest(data, serverUrl, successFunction, errorFunction){
        $.ajax({
            type: "POST",
            url: serverUrl,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            success: function(response){
                if (successFunction==null){
                    console.log("Data sent successfully");
                }else{
                    successFunction(response);
                }

            },
            error: function(error){
                if (errorFunction==null){
                    console.error("Error sending data:", error);
                }else{
                    errorFunction(response);
                }
            }
        });
}


function deleteRequest(data, serverUrl, successFunction, errorFunction){
    $.ajax({
        type: "DELETE",
        url: serverUrl,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function(response){
            if (successFunction==null){
                console.log("Data sent successfully");
            }else{
                successFunction(response);
            }
        },
        error: function(error){
            if (errorFunction==null){
                console.error("Error sending data:", error);
            }else{
                errorFunction(error);
            }
        }
    });

}

function saveSyllabus(data, savedStatus, successFunction, errorFunction){
    // the value of savedStatus is "Active", "Inactive", "Draft"
    data.generalInfoFormDTODetails.status = savedStatus;
    data.publicStatus = "PUBLIC";
    console.log(data);
    jsonStringData = JSON.stringify(data);
    postRequest(jsonStringData, "/syllabus/save", successFunction, errorFunction);
}


function newDraft(data, successFunction, errorFunction){

        data.publicStatus = "PUBLIC";
        data.generalInfoFormDTODetails.status = "Draft";
        console.log(data);
        jsonString = JSON.stringify(data);
        postRequest(jsonString, "/syllabus/save")

}