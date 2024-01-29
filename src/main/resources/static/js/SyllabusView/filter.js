
//đưa key word tìm kiếm trong conditionList lên web

$(document).ready(function(){
    if (currentSearchDetails.searchBy==null){
        currentSearchDetails.searchBy = []
    }

    $(".status-box").each(function(){
        if ($(this).text()=="Active"){
            $(this).css("background-color", "#2F903F");
        }else if($(this).text()=="Inactive"){
            $(this).css("background-color", "#2D3748");
        }
    });

    if ($("#table tr").length == 1){
          $("#table").append("<div class=\"text-decoration-1\">THERE IS NO MATCHING RECORD</div>");
    }

    addSort()

    let input = document.getElementById("search-input");
    input.addEventListener("keypress", function (event) {
            if (event.key === "Enter" && input.value.trim() !== "") {
                //thêm từ key word vô list data rồi gửi về và refresh web
                let key = input.value;

                currentSearchDetails.searchBy.push(input.value);
                if (currentSearchDetails.searchBy.length>4){
                    currentSearchDetails.searchBy.shift();
                }

                console.log(currentSearchDetails.searchBy);
                $.post("/syllabus/list",
                     currentSearchDetails,
                     function(){
                        reloadElement("#SyllabusDataList");
                        makeSearchTag(currentSearchDetails.searchBy);
                     }
                );
                //clear input box
                input.value = "";
            }
        });
});





function reloadElement(Selector){
    $(Selector).load(window.location.href+" "+Selector,
        function(){
                //pagination
                pageList = getPageList($("#total-page a").text());
                reloadPageList(pageList, currentSearchDetails.currentPage);
                addPageShortCut();
                addSort();
                //fix table row css
                $(".status-box").each(function(){
                    if ($(this).text()=="Active"){
                        $(this).css("background-color", "#2F903F");
                    }else if($(this).text()=="Inactive"){
                        $(this).css("background-color", "#2D3748");
                    }
                });

                //empty table message
                if ($("#table tr").length == 1){
                      $("#SyllabusDataList").append("<div class=\"text-decoration-1\">THERE IS NO MATCHING RECORD</div>");
                }

            });
    }


function makeSearchTag(conditionList){
    $("#search-keyword").empty();
    conditionList.forEach(key=>{
        let item = document.createElement("div");
        item.className = "search-item"
        item.innerHTML += `
            <a>${key}</a>
            <span>&#10005;</span>
        `

        $("#search-keyword").append(item);
        //nút xoá của key word
        let deleteButton = item.getElementsByTagName("span")[0];
        deleteButton.addEventListener("click", () => {
            //update currentSearchDetails sau đó gửi về server rồi refresh lại web
            currentSearchDetails.searchBy = currentSearchDetails.searchBy.filter((condition) => condition != key);
            $.post("/syllabus/list",
                   currentSearchDetails,
                   function(data){
                         item.remove();
                         reloadElement("#SyllabusDataList");
                   }
            );
        });
    });
}

function addSort(){
    $(".sort-btn").each(function(){
        $(this).on("click", function(){
            currentSearchDetails.sortColumn = $(this)[0].id
            $.post("/syllabus/list",
                 currentSearchDetails,
                 function(){
                    reloadElement("#SyllabusDataList");
                 }
            );
        });
    });
}