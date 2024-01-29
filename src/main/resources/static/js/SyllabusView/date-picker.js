let dateText = null;

$("document").ready(function(){

        $("#datepicker").datepicker({
            format: "mm/dd/yyyy",
            multidate: 2,
            inline: true,
            forceParse: false,
            clearBtn: true,
            todayHighlight: true,
        });

        $("#datepicker").on("change",function(){
            dateItems = $("#datepicker input").val();
            if (dateItems==""){
                currentSearchDetails.searchDate = [];
                dateText=dateItems;
            }else{
                dateItems = dateItems.split(",");
                fixDateRange(dateItems);
                if (dateItems[0]==undefined){
                    currentSearchDetails.searchDate = [dateItems[1], dateItems[1]];
                    dateText = changeDateFormat(dateItems[1]);
                }else{
                    currentSearchDetails.searchDate = dateItems;
                    dateText = dateItems.map(date => changeDateFormat(date)).join("-");
                }
                $("#datepicker input").val(dateText);
            }
        });

        $("#datepicker").on("hide", function(){
                    console.log("datepicker close");
                    $.post("/syllabus/list",
                         currentSearchDetails,
                         function(){
                            reloadElement("#SyllabusDataList");
                            $("#datepicker input").val(dateText);
                         }
                    );
                });
    });


function fixDateRange(dateItems){
    timeStamp1 = getDateTimeStamp(dateItems[0]);
    timeStamp2 = getDateTimeStamp(dateItems[1]);

    if (timeStamp1>timeStamp2){
        swapArrayItem(dateItems, 1, 0);
    }
}

function changeDateFormat(rawDate){
    //change format to dd/mm/yyyy
//    if (rawDate == null){
//        return date
//    }
    dateSplit = rawDate.split("/");
    swapArrayItem(dateSplit, 1, 0);
    date = dateSplit.join("/");

    return date;
}

function getDateTimeStamp(rawDate){
    if (rawDate==null){
        return 0
    }
    return Date.parse(rawDate);
}

function swapArrayItem(array, idx1, idx2){
     let temp = array[idx1];
     array[idx1] = array[idx2];
     array[idx2] = temp;
}

