$(document).ready(function(){
    pageList = getPageList($("#total-page a").text());
    reloadPageList(pageList, currentSearchDetails.currentPage);
    addPageShortCut();

});

function addPageShortCut(){
    $("#nextPage").on("click", function(){
        if (currentSearchDetails.currentPage>=pageList[pageList.length-1]){
            return null;
        }else{
            toPage(currentSearchDetails.currentPage+1)
        }
    });

    $("#previousPage").on("click", function(){
        if (currentSearchDetails.currentPage<=1){
            return null;
        }else{
            toPage(currentSearchDetails.currentPage-1);
        }
    });

    $("#lastPage").on("click", function(){
        if (currentSearchDetails.currentPage==pageList[pageList.length-1]){
            return null;
        }
        toPage($("#total-page a").text());
    });
}



function reloadPageList(pageList, currentPage){

    let paginationData = getPaginateData(pageList, currentPage);
    numberList = document.querySelector("#pageNumbers");
    $("#pageNumbers").empty();
    content = document.createDocumentFragment();
    paginationData.forEach(item=>{
       listItem = document.createElement("li");
       listItem.classList.add("rounded-circle");
       listItem.classList.add("page-item");
       if (item==currentPage){
             listItem.classList.add("active");
       }
       listItem.innerHTML = `<a class="page-link">`+item+`</a>`;

       listItem.addEventListener("click", function(){
            toPage(item);
       });

       content.appendChild(listItem);
    });
    numberList.appendChild(content);
}



function getPageList(totalPage){
    let pageList = [];
    for (i=1; i<=totalPage; i++){
        pageList.push(i);
    }
    return pageList;
}

function toPage(page){
    if (page=="..."){
        return null;
    }else{
        currentSearchDetails.currentPage = Number(page);
        $.post("/syllabus/list",
               currentSearchDetails,
               function(){
                    reloadElement("#SyllabusDataList");
                    currentSearchDetails.currentPage = page;
//                    pageList = getPageList($("#total-page a").text());

               });
    }

}

function getPaginateData(pageList, currentPage){
//tạo một list các item dùng để chỉnh sửa thanh tìm theo trang của syllabus
    let paginationData;
    if (pageList.length<2) {
        paginationData = [1];
    }else{
        paginationData = makePaginateScript(currentPage, pageList);
    }
    return paginationData;
}



function makePaginateScript(currentPage, pageList) {
        let paginationData = [];
        totalPage = pageList.length;
        currentIdx = currentPage-1;
        lastPageIdx = totalPage-1;
        if (totalPage<6) {
            paginationData=pageList;
        }else {
            if (currentPage < 4) {
                paginationData.push(pageList[0]);
                paginationData.push(pageList[1]);
                paginationData.push(pageList[2]);
                paginationData.push(pageList[3]);
                paginationData.push("...");
                paginationData.push(pageList[lastPageIdx]);

            } else {
                if (currentPage <= totalPage - 3) {
                    paginationData.push(pageList[0]);
                    paginationData.push("...");
                    paginationData.push(pageList[currentIdx - 1]);
                    paginationData.push(pageList[currentIdx]);
                    paginationData.push(pageList[currentIdx + 1]);
                    paginationData.push("...");
                    paginationData.push(pageList[lastPageIdx]);

                }
                else if (currentPage > totalPage - 3 && currentPage <= totalPage) {
                    paginationData.push(pageList[0]);
                    paginationData.push("...");
                    paginationData.push(pageList[lastPageIdx - 3]);
                    paginationData.push(pageList[lastPageIdx - 2]);
                    paginationData.push(pageList[lastPageIdx - 1]);
                    paginationData.push(pageList[lastPageIdx]);
                }
            }
        }
        return paginationData;
    }