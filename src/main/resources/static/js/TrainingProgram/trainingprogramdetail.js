document.addEventListener('DOMContentLoaded', function () {
    var durationElements = document.getElementsByClassName('duration-minutes');
    for (var i = 0; i < durationElements.length; i++) {
        var durationInMinutes = parseInt(durationElements[i].innerText);
        var hours = Math.floor(durationInMinutes / 60);
        var minutes = durationInMinutes % 60;
        durationElements[i].innerText = hours + ' hrs ' + minutes + ' min';
    }
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction(el) {
    if (el.nextElementSibling.classList.contains("show")) {
        el.nextElementSibling.classList.toggle("show");
    } else {
        let dropdown = document.querySelectorAll(".dropdown-content");
        dropdown.forEach((o) => o.classList.remove("show"));
        el.nextElementSibling.classList.toggle("show");
    }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", function () {
    var frame1205Elements = document.querySelectorAll(".frame-1205");
    var contentContainers = document.querySelectorAll(".content-container");

    frame1205Elements.forEach(function (frame, index) {
        frame.addEventListener("click", function () {
            toggleContentContainer(index);
        });
    });

    function toggleContentContainer(index) {
        contentContainers[index].classList.toggle("active");

        // Ẩn/hiện nội dung dựa trên trạng thái của lớp "active"
        var contentTcElement = contentContainers[index].querySelector('.content-tc');
        contentTcElement.classList.toggle("visible");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Lấy tất cả các phần tử có class "frame-53"
    var frame53Elements = document.querySelectorAll('.frame-53');

    // Lặp qua từng phần tử và thêm sự kiện click
    frame53Elements.forEach(function (frame53Element) {
        frame53Element.addEventListener('click', function () {
            // Tìm phần tử chứa class "content-tc" trong phạm vi cha của phần tử đang được nhấn
            var contentTcElement = frame53Element.closest('.detail-items').querySelector('.content-tc');

            // Ẩn/hiện nội dung dựa trên trạng thái của lớp "visible"
            contentTcElement.classList.toggle("visible2");
        });
    });
});
// content òf day
// Lấy danh sách tất cả các thẻ frame-1

$(document).ready(function () {
    const frame1Elements = document.querySelectorAll('.frame-1');

// Lặp qua từng thẻ frame-1 và gán sự kiện click cho chúng
    frame1Elements.forEach((frame1, index) => {
        frame1.addEventListener('click', () => {
            // Lấy thẻ detal-items-header tương ứng với thẻ frame-1
            const detailItemsHeader = frame1.parentElement.querySelector('.detail-items-header');

            // Kiểm tra nếu detalItemsHeader đang ẩn thì hiển thị, ngược lại ẩn đi
            if (detailItemsHeader.style.display === 'none' || !detailItemsHeader.style.display) {
                detailItemsHeader.style.display = 'block';
            } else {
                detailItemsHeader.style.display = 'none';
            }
        });
    });
});

function toggleContent() {
    var dotcontent = document.querySelector(".dotcontent");
    if (window.getComputedStyle(dotcontent).display === "none") {
        dotcontent.style.display = "block";
    } else {
        dotcontent.style.display = "none";
    }
}

// Hàm chuyển đổi phút thành giờ và phút
function convertMinutesToHoursAndMinutes(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;
    return hours + " hrs " + remainingMinutes + " min";
}

document.addEventListener('DOMContentLoaded', function () {
    // Mã JavaScript ở đây
    // Lấy tất cả các phần tử có class "tc-time"
    var tcTimeElements = document.querySelectorAll('.tc-time');

// Khởi tạo biến để lưu trữ tổng giá trị
    var totalDuration = 0;

// Duyệt qua mỗi phần tử và cộng dồn giá trị vào biến totalDuration
    tcTimeElements.forEach(function (element) {
        // Lấy giá trị duration từ thuộc tính th:text của mỗi phần tử
        var duration = parseInt(element.textContent);

        // Kiểm tra nếu giá trị duration là một số hợp lệ
        if (!isNaN(duration)) {
            // Cộng vào tổng
            totalDuration += duration;
        }
    });

    // Tính toán số ngày, giờ và phút
    var days = Math.floor(totalDuration / (24 * 60));
    var hours = Math.floor((totalDuration % (24 * 60)) / 60);
    var minutes = totalDuration % 60;

    // Tạo một phần tử div mới để hiển thị tổng giá trị dưới dạng ngày-giờ-phút
    var totalDurationElement = document.createElement('div');
    totalDurationElement.textContent = days + ' days ' + hours + ' hrs ' + minutes + ' min';

    // Thêm phần tử div vào nơi bạn muốn hiển thị trên trang
    // Ở đây, tôi giả sử bạn có một phần tử có id là "totalDurationContainer"
    var containerElement = document.getElementById('totalDurationContainer');
    containerElement.appendChild(totalDurationElement);
});