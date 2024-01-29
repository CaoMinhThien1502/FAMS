 /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function ShowDropDownTab(el) {
    if (el.nextElementSibling.classList.contains("show")) {
        el.nextElementSibling.classList.toggle("show");

    }
    else {
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


function deleteSyllabus(syllabusId){
    if (window.confirm("Do you really want to delete this syllabus?")) {
        $.ajax({
                type: "DELETE",
                url: "/syllabus/list",
                data: syllabusId,
                contentType: "application/json; charset=utf-8",
                dataType: "text",
                success: function(response){
                    console.log(response);
                    reloadElement("#SyllabusDataList");
                },
                error: function(error){
                    console.error("Error sending data:", response);
                }
            });
    }
}

